#!/usr/bin/env python3
"""
server.py - Interactive Web Dashboard & API Server
Serves the visual n8n-style dashboard and provides REST endpoints for running searches,
monitoring live pipeline stages, and exporting leads to CSV/JSON/n8n.
Zero third-party pip dependencies (uses Python standard library ThreadingHTTPServer).
"""

import os
import sys
import json
import threading
import urllib.parse
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from maps_pipeline import MapsPipeline, OUTPUT_DIR, BASE_DIR

PORT = 8787

# Global thread-safe pipeline state
RUN_STATE = {
    "status": "idle", # idle, running, completed, error
    "stage": 0,
    "stageName": "Ready",
    "message": "Enter search query to begin.",
    "percent": 0,
    "lastResult": None,
    "error": None
}
STATE_LOCK = threading.Lock()

# Auto-preload latest results if available
def try_preload_latest():
    try:
        import glob
        json_files = glob.glob(os.path.join(OUTPUT_DIR, "*.json"))
        if json_files:
            json_files.sort(key=os.path.getmtime)
            latest = json_files[-1]
            with open(latest, "r", encoding="utf-8") as f:
                data = json.load(f)
            RUN_STATE["lastResult"] = data
            RUN_STATE["status"] = "completed"
            RUN_STATE["stage"] = 5
            RUN_STATE["stageName"] = "Completed"
            RUN_STATE["percent"] = 100
            RUN_STATE["message"] = f"Loaded previous run: {data.get('totalLeads', 0)} leads for '{data.get('query')}'."
    except Exception as e:
        pass

try_preload_latest()

def execute_pipeline_async(query, limit, sender, ai_key=None, use_ai=False):
    global RUN_STATE
    try:
        with STATE_LOCK:
            RUN_STATE["status"] = "running"
            RUN_STATE["stage"] = 1
            RUN_STATE["stageName"] = "Initializing"
            RUN_STATE["message"] = f"Starting pipeline for '{query}'..."
            RUN_STATE["percent"] = 5
            RUN_STATE["error"] = None

        def on_progress(p_data):
            with STATE_LOCK:
                RUN_STATE["stage"] = p_data.get("stage", 1)
                RUN_STATE["stageName"] = p_data.get("stageName", "")
                RUN_STATE["message"] = p_data.get("message", "")
                RUN_STATE["percent"] = p_data.get("percent", 0)

        pipeline = MapsPipeline(headless=True)
        res = pipeline.execute(
            query=query, 
            max_results=limit, 
            sender_name=sender, 
            ai_key=ai_key, 
            use_ai=use_ai, 
            progress_callback=on_progress
        )

        with STATE_LOCK:
            RUN_STATE["status"] = "completed"
            RUN_STATE["stage"] = 5
            RUN_STATE["stageName"] = "Completed"
            RUN_STATE["message"] = f"Processed {res['totalLeads']} leads successfully."
            RUN_STATE["percent"] = 100
            RUN_STATE["lastResult"] = res

    except Exception as e:
        with STATE_LOCK:
            RUN_STATE["status"] = "error"
            RUN_STATE["error"] = str(e)
            RUN_STATE["message"] = f"Pipeline execution failed: {e}"

class LeadGenHandler(BaseHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/" or path == "/index.html":
            html_path = os.path.join(BASE_DIR, "web_dashboard.html")
            if os.path.exists(html_path):
                with open(html_path, "rb") as f:
                    content = f.read()
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(content)))
                self.end_headers()
                self.wfile.write(content)
            else:
                self.send_error(404, "web_dashboard.html not found")

        elif path == "/api/status":
            with STATE_LOCK:
                data = json.dumps(RUN_STATE).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)

        elif path == "/api/leads":
            with STATE_LOCK:
                res = RUN_STATE.get("lastResult")
                data = json.dumps(res or {}).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)

        elif path == "/api/export/csv":
            import glob
            with STATE_LOCK:
                res = RUN_STATE.get("lastResult")
            csv_target = None
            if res and res.get("csvFile") and os.path.exists(res["csvFile"]):
                csv_target = res["csvFile"]
            elif res and res.get("jsonFile"):
                cand = res["jsonFile"].replace(".json", ".csv")
                if os.path.exists(cand):
                    csv_target = cand
            if not csv_target:
                csv_files = glob.glob(os.path.join(OUTPUT_DIR, "*.csv"))
                if csv_files:
                    csv_files.sort(key=os.path.getmtime)
                    csv_target = csv_files[-1]

            if not csv_target or not os.path.exists(csv_target):
                self.send_error(404, "No recent CSV export found. Run a search first.")
                return

            filename = os.path.basename(csv_target)
            with open(csv_target, "rb") as f:
                content = f.read()
            self.send_response(200)
            self.send_header("Content-Type", "text/csv")
            self.send_header("Content-Disposition", f"attachment; filename=\"{filename}\"")
            self.send_header("Content-Length", str(len(content)))
            self.end_headers()
            self.wfile.write(content)

        elif path == "/api/export/json":
            import glob
            with STATE_LOCK:
                res = RUN_STATE.get("lastResult")
            json_target = None
            if res and res.get("jsonFile") and os.path.exists(res["jsonFile"]):
                json_target = res["jsonFile"]
            if not json_target:
                json_files = glob.glob(os.path.join(OUTPUT_DIR, "*.json"))
                if json_files:
                    json_files.sort(key=os.path.getmtime)
                    json_target = json_files[-1]

            if not json_target or not os.path.exists(json_target):
                self.send_error(404, "No recent JSON export found. Run a search first.")
                return

            filename = os.path.basename(json_target)
            with open(json_target, "rb") as f:
                content = f.read()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Disposition", f"attachment; filename=\"{filename}\"")
            self.send_header("Content-Length", str(len(content)))
            self.end_headers()
            self.wfile.write(content)

        elif path == "/api/n8n-workflow":
            wf_path = os.path.join(BASE_DIR, "maps_leadgen_workflow.n8n.json")
            if not os.path.exists(wf_path):
                self.send_error(404, "Workflow JSON file not found")
                return
            with open(wf_path, "rb") as f:
                content = f.read()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Disposition", "attachment; filename=\"maps_leadgen_workflow.n8n.json\"")
            self.send_header("Content-Length", str(len(content)))
            self.end_headers()
            self.wfile.write(content)

        else:
            self.send_error(404, "Not Found")

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/api/search":
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            try:
                params = json.loads(body.decode('utf-8'))
            except Exception:
                params = {}

            query = params.get("query", "emergency dentists in Austin").strip()
            limit = int(params.get("limit", 10))
            sender = params.get("sender", "Anuj").strip()
            ai_key = params.get("ai_key", "").strip()
            use_ai = bool(params.get("use_ai", False))

            with STATE_LOCK:
                if RUN_STATE["status"] == "running":
                    self.send_response(409)
                    self.send_header("Content-Type", "application/json")
                    self.end_headers()
                    self.wfile.write(json.dumps({"error": "A pipeline task is already in progress."}).encode('utf-8'))
                    return

            thread = threading.Thread(target=execute_pipeline_async, args=(query, limit, sender, ai_key, use_ai), daemon=True)
            thread.start()

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({
                "status": "started",
                "query": query,
                "limit": limit,
                "sender": sender
            }).encode('utf-8'))
        else:
            self.send_error(404, "Not Found")

    def log_message(self, format, *args):
        # Clean logging
        pass

def run_server(port=PORT):
    server_address = ('127.0.0.1', port)
    httpd = ThreadingHTTPServer(server_address, LeadGenHandler)
    print(f"\n========================================================")
    print(f"🚀 Google Maps LeadGen & Cold Outreach Server Running!")
    print(f"👉 Local Web Dashboard: http://127.0.0.1:{port}")
    print(f"👉 n8n Workflow JSON:  http://127.0.0.1:{port}/api/n8n-workflow")
    print(f"========================================================\n")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
        httpd.server_close()

if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else PORT
    run_server(port)
