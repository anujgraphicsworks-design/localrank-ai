import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';

export const metadata: Metadata = {
  title: 'LocalRank AI — Google Maps + Local SEO Lead Intelligence Platform',
  description:
    'Autonomous lead discovery, local ranking grids, GBP and website technical audits, SEO gap analysis, contact enrichment, and personalized cold email synthesizer for agencies.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#09090b] text-[#f4f4f5] antialiased flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-zinc-950/40">
          {children}
        </main>
      </body>
    </html>
  );
}
