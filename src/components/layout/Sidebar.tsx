'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  GitFork,
  Users2,
  Compass,
  FileCheck2,
  Swords,
  Contact,
  Mail,
  FileText,
  Sparkles,
  Settings,
  ChevronRight,
  Radar
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Workflows', href: '/workflows', icon: GitFork, badge: 'Canvas' },
  { label: 'Leads Database', href: '/leads', icon: Users2 },
  { label: 'Rankings Grid', href: '/rankings', icon: Compass },
  { label: 'Audits', href: '/audits', icon: FileCheck2 },
  { label: 'Competitors', href: '/competitors', icon: Swords },
  { label: 'Contacts', href: '/contacts', icon: Contact },
  { label: 'Cold Emails', href: '/emails', icon: Mail, badge: '<100w' },
  { label: 'Client Reports', href: '/reports', icon: FileText },
  { label: 'Templates', href: '/templates', icon: Sparkles },
  { label: 'Settings', href: '/settings', icon: Settings }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-zinc-950/90 border-r border-zinc-800/80 flex flex-col h-screen shrink-0 select-none z-30">
      {/* Brand Header */}
      <div className="p-5 border-b border-zinc-800/70 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Radar className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-white">LocalRank</span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                AI
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-medium">Agency Intelligence</p>
          </div>
        </Link>
      </div>

      {/* Workspace Switcher */}
      <div className="px-3.5 py-3 border-b border-zinc-900">
        <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800/60 text-xs">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-zinc-300 truncate">Agency Workspace</span>
          </div>
          <span className="text-[10px] text-zinc-300 font-mono">v1.0</span>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-zinc-400 group-hover:text-zinc-200'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge ? (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-zinc-800 text-zinc-400 group-hover:text-zinc-300'
                  }`}
                >
                  {item.badge}
                </span>
              ) : (
                <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity ${isActive ? 'opacity-70 text-emerald-400' : ''}`} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-3.5 border-t border-zinc-900 bg-zinc-950/60">
        <div className="p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/60 flex items-center justify-between text-[11px]">
          <div>
            <div className="font-medium text-zinc-300">Austin Dental Demo</div>
            <div className="text-[10px] text-zinc-300">Real Benchmark Data</div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
        </div>
      </div>
    </aside>
  );
}
