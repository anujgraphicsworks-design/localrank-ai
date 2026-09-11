'use client';

import React from 'react';
import Link from 'next/link';
import { Play, Plus, Download, Sparkles, AlertCircle } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  actionButton?: {
    label: string;
    href?: string;
    onClick?: () => void;
    iconType?: 'play' | 'plus';
  };
}

export function Header({ title, subtitle, actionButton }: HeaderProps) {
  const ActionIcon = actionButton?.iconType === 'plus' ? Plus : Play;

  return (
    <header className="h-16 border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md px-6 flex items-center justify-between shrink-0 z-20">
      <div>
        <h1 className="text-base font-semibold text-zinc-100 tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-zinc-400">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Demo Mode Badge */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs">
          <AlertCircle className="w-3.5 h-3.5" />
          <span className="font-medium text-[11px]">DEMO MODE: Austin Dentists</span>
        </div>

        {/* Quick CSV Export */}
        <a
          href="/api/export?format=csv"
          download
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-zinc-400" />
          <span>Export CSV</span>
        </a>

        {/* Action Button */}
        {actionButton && (
          actionButton.href ? (
            <Link
              href={actionButton.href}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
            >
              <ActionIcon className="w-3.5 h-3.5 fill-white" />
              <span>{actionButton.label}</span>
            </Link>
          ) : (
            <button
              onClick={actionButton.onClick}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
            >
              <ActionIcon className="w-3.5 h-3.5 fill-white" />
              <span>{actionButton.label}</span>
            </button>
          )
        )}
      </div>
    </header>
  );
}
