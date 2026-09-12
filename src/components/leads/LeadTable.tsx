'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  ExternalLink,
  Mail,
  Compass,
  FileText,
  Download,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ChevronRight,
  Eye,
  Trash2
} from 'lucide-react';
import { BusinessLead, LeadStatus } from '@/lib/types';
import { LeadDetailModal } from './LeadDetailModal';
import { deleteLead, getLeads } from '@/lib/firebase/db';

interface LeadTableProps {
  leads: BusinessLead[];
}

export function LeadTable({ leads }: LeadTableProps) {
  const [leadList, setLeadList] = useState<BusinessLead[]>(leads);
  const [searchTerm, setSearchTerm] = useState('');
  const [rankFilter, setRankFilter] = useState<'all' | 'top3' | 'outsideTop3'>('all');
  const [websiteFilter, setWebsiteFilter] = useState<'all' | 'hasWebsite' | 'noWebsite'>('all');
  const [emailFilter, setEmailFilter] = useState<'all' | 'hasEmail' | 'noEmail'>('all');
  const [selectedLead, setSelectedLead] = useState<BusinessLead | null>(null);
  const [selectedLeadIds, setSelectedLeadIds] = useState<Set<string>>(new Set());
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);

  useEffect(() => {
    setLeadList(leads);
  }, [leads]);

  // Filter logic
  const filteredLeads = leadList.filter((lead) => {
    const matchesSearch =
      lead.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.contact?.primaryEmail && lead.contact.primaryEmail.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (rankFilter === 'top3' && lead.currentRank > 3) return false;
    if (rankFilter === 'outsideTop3' && lead.currentRank <= 3) return false;

    if (websiteFilter === 'hasWebsite' && !lead.hasWebsite) return false;
    if (websiteFilter === 'noWebsite' && lead.hasWebsite) return false;

    if (emailFilter === 'hasEmail' && !lead.contact?.emailFound) return false;
    if (emailFilter === 'noEmail' && lead.contact?.emailFound) return false;

    return true;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLeadIds(new Set(filteredLeads.map((l) => l.id)));
    } else {
      setSelectedLeadIds(new Set());
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedLeadIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleDeleteLead = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete lead "${name}"?`)) return;

    try {
      await deleteLead(id);
      await fetch(`/api/leads?id=${id}`, { method: 'DELETE' });
      setLeadList((prev) => prev.filter((l) => l.id !== id));
      setSelectedLeadIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      if (selectedLead?.id === id) {
        setSelectedLead(null);
      }
    } catch (err) {
      console.error('Error deleting lead:', err);
      alert('Error deleting lead. Please try again.');
    }
  };

  const handleBulkDelete = async () => {
    const count = selectedLeadIds.size;
    if (count === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${count} selected lead(s)? This action cannot be undone.`)) {
      return;
    }

    setIsBulkDeleting(true);
    try {
      const idsToDelete = Array.from(selectedLeadIds);
      for (const id of idsToDelete) {
        await deleteLead(id);
        await fetch(`/api/leads?id=${id}`, { method: 'DELETE' });
      }
      setLeadList((prev) => prev.filter((l) => !selectedLeadIds.has(l.id)));
      setSelectedLeadIds(new Set());
      if (selectedLead && selectedLeadIds.has(selectedLead.id)) {
        setSelectedLead(null);
      }
    } catch (err) {
      console.error('Error bulk deleting leads:', err);
      alert('Error deleting leads. Please try again.');
    } finally {
      setIsBulkDeleting(false);
    }
  };

  const handleDeleteFromModal = async (id: string) => {
    await deleteLead(id);
    await fetch(`/api/leads?id=${id}`, { method: 'DELETE' });
    setLeadList((prev) => prev.filter((l) => l.id !== id));
    setSelectedLeadIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setSelectedLead(null);
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Toolbar */}
      <div className="glass-panel p-4 rounded-xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search business name, city, service, or email..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Rank Filter */}
          <select
            value={rankFilter}
            onChange={(e) => setRankFilter(e.target.value as any)}
            className="px-3 py-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Rankings</option>
            <option value="outsideTop3">Outside Top 3 (#4+)</option>
            <option value="top3">In Top 3 (#1-#3)</option>
          </select>

          {/* Website Filter */}
          <select
            value={websiteFilter}
            onChange={(e) => setWebsiteFilter(e.target.value as any)}
            className="px-3 py-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Website Statuses</option>
            <option value="hasWebsite">Has Website</option>
            <option value="noWebsite">NO Website (High Opp)</option>
          </select>

          {/* Email Filter */}
          <select
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value as any)}
            className="px-3 py-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Email Statuses</option>
            <option value="hasEmail">Email Found</option>
            <option value="noEmail">Social / DM Only</option>
          </select>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {selectedLeadIds.size > 0 && (
            <>
              <span className="text-xs text-emerald-400 font-mono font-medium mr-1">
                {selectedLeadIds.size} selected
              </span>
              <button
                onClick={handleBulkDelete}
                disabled={isBulkDeleting}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-xs font-semibold text-rose-300 hover:text-rose-200 transition-colors disabled:opacity-50"
                title="Delete selected leads"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                <span>{isBulkDeleting ? 'Deleting...' : `Delete Selected (${selectedLeadIds.size})`}</span>
              </button>
            </>
          )}
          <a
            href="/api/export?format=csv"
            download
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-zinc-400" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* Leads Table */}
      <div className="glass-panel rounded-xl overflow-hidden border border-zinc-800/80">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/60 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                <th className="p-3.5 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={filteredLeads.length > 0 && selectedLeadIds.size === filteredLeads.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-zinc-700 text-emerald-500 focus:ring-emerald-500"
                  />
                </th>
                <th className="p-3.5">Business Name & Category</th>
                <th className="p-3.5">Google Maps Rank</th>
                <th className="p-3.5">Website Status</th>
                <th className="p-3.5">Audit Scores</th>
                <th className="p-3.5">Opportunity</th>
                <th className="p-3.5">Contact / Email</th>
                <th className="p-3.5">Cold Email</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-zinc-500 text-xs">
                    No leads found matching your search filter.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const isSelected = selectedLeadIds.has(lead.id);
                  const isTop3 = lead.currentRank <= 3;

                  return (
                    <tr
                      key={lead.id}
                      className={`hover:bg-zinc-900/50 transition-colors group cursor-pointer ${
                        isSelected ? 'bg-emerald-500/5' : ''
                      }`}
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="p-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(lead.id)}
                          className="rounded border-zinc-700 text-emerald-500 focus:ring-emerald-500"
                        />
                      </td>

                      {/* Business Name */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                            {lead.businessName}
                          </span>
                          {lead.isUnclaimed && (
                            <span className="px-1.5 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 text-[9px] font-bold text-rose-300">
                              UNCLAIMED
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-zinc-300 flex items-center gap-1.5 mt-0.5">
                          <span>{lead.category}</span>
                          <span>•</span>
                          <span>{lead.city}, {lead.state}</span>
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <a
                            href={lead.googleMapsUrl || (lead.placeCid ? `https://www.google.com/maps?cid=${lead.placeCid}` : undefined)}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-[10px] text-emerald-400 hover:text-emerald-300 font-medium hover:underline bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20"
                            title={`Open Canonical Google Business Profile (CID: ${lead.placeCid || 'Direct'})`}
                          >
                            <span>📍 Open GBP</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                          {lead.phone && (
                            <span className="text-[10px] text-zinc-400 font-mono">{lead.phone}</span>
                          )}
                        </div>
                      </td>

                      {/* Rank */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                              isTop3
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                            }`}
                          >
                            #{lead.currentRank}
                          </span>
                          <span className="text-[11px] text-zinc-300">
                            Avg: #{lead.rankingGrid?.averageRank ?? lead.currentRank}
                          </span>
                        </div>
                        <div className="text-[10px] text-zinc-300 mt-1">
                          {lead.reviewsCount} reviews ({lead.rating}★)
                        </div>
                      </td>

                      {/* Website */}
                      <td className="p-3.5">
                        {lead.hasWebsite ? (
                          <div className="flex items-center gap-1.5 text-zinc-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                            <span className="truncate max-w-[130px] font-mono text-[11px]">
                              {lead.website?.replace(/^https?:\/\//, '')}
                            </span>
                          </div>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30 text-[10px] font-bold uppercase">
                            NO WEBSITE
                          </span>
                        )}
                      </td>

                      {/* Scores */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <div className="text-[11px]">
                            <span className="text-zinc-300">Web: </span>
                            <span className="font-mono font-semibold text-zinc-200">
                              {lead.websiteAudit?.scores.overall ?? 0}
                            </span>
                          </div>
                          <span className="text-zinc-700">•</span>
                          <div className="text-[11px]">
                            <span className="text-zinc-300">GBP: </span>
                            <span className="font-mono font-semibold text-zinc-200">
                              {lead.gbpAudit?.score ?? 0}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Opportunity */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-xs text-emerald-400">
                            {lead.opportunityScore?.score ?? 75}/100
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 uppercase">
                            {lead.opportunityScore?.difficulty ?? 'Med'}
                          </span>
                        </div>
                        <div className="text-[10px] text-zinc-300 mt-0.5 truncate max-w-[120px]">
                          {lead.actionPlan?.timelineLabel.split('(')[0] ?? '45-60 Days'}
                        </div>
                      </td>

                      {/* Contact & Email */}
                      <td className="p-3.5">
                        {lead.contact?.emailFound ? (
                          <div>
                            <div className="font-medium text-zinc-200 truncate max-w-[140px]">
                              {lead.contact.primaryEmail}
                            </div>
                            <div className="text-[10px] text-zinc-300 flex items-center gap-1">
                              <span>{lead.contact.firstName !== 'there' ? lead.contact.firstName : 'Front Desk'}</span>
                              <span>•</span>
                              <span className="text-emerald-400 font-mono">Verified</span>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <span className="text-[11px] text-amber-400/90 font-medium">
                              {lead.contact?.outreachChannel || 'Social / Form'}
                            </span>
                            <div className="text-[10px] text-zinc-300">No public email</div>
                          </div>
                        )}
                      </td>

                      {/* Cold Email Status */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[10px] font-mono">
                            {lead.coldEmail?.wordCount || 88}w &lt;100w
                          </span>
                        </div>
                        <div className="text-[10px] text-zinc-300 mt-0.5 truncate max-w-[130px]">
                          {lead.coldEmail?.subjectRecommended}
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td className="p-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
                            title="Open Deep Dive Lead Modal"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteLead(lead.id, lead.businessName)}
                            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-rose-500/20 border border-zinc-800 hover:border-rose-500/30 text-zinc-400 hover:text-rose-400 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal / Drawer */}
      <LeadDetailModal
        lead={selectedLead}
        isOpen={Boolean(selectedLead)}
        onClose={() => setSelectedLead(null)}
        onDeleteLead={handleDeleteFromModal}
      />
    </div>
  );
}
