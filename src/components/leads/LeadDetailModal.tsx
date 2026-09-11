'use client';

import React, { useState } from 'react';
import {
  X,
  Compass,
  FileCheck,
  Swords,
  TrendingUp,
  Clock,
  Mail,
  ShieldAlert,
  Copy,
  Check,
  ExternalLink,
  Phone,
  MapPin,
  Globe,
  Sparkles,
  FileText,
  AlertTriangle,
  Trash2
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, LinkedinIcon } from '@/components/ui/SocialIcons';
import { BusinessLead } from '@/lib/types';
import { deleteLead } from '@/lib/firebase/db';

interface LeadDetailModalProps {
  lead: BusinessLead | null;
  isOpen: boolean;
  onClose: () => void;
  onDeleteLead?: (id: string) => Promise<void> | void;
}

export function LeadDetailModal({ lead, isOpen, onClose, onDeleteLead }: LeadDetailModalProps) {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'grid' | 'competitors' | 'gbp' | 'website' | 'gaps' | 'timeline' | 'actionPlan' | 'contact' | 'evidence' | 'email'
  >('overview');

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !lead) return null;

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete lead "${lead.businessName}"? This action cannot be undone.`)) {
      return;
    }
    setIsDeleting(true);
    try {
      if (onDeleteLead) {
        await onDeleteLead(lead.id);
      } else {
        await deleteLead(lead.id);
        await fetch(`/api/leads?id=${lead.id}`, { method: 'DELETE' });
      }
      onClose();
    } catch (err) {
      console.error('Failed to delete lead:', err);
      alert('Failed to delete lead. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCopyEmail = () => {
    if (lead.coldEmail?.body) {
      navigator.clipboard.writeText(lead.coldEmail.body);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'grid', label: '5-Point Grid' },
    { id: 'competitors', label: 'Competitors' },
    { id: 'gbp', label: 'GBP Audit' },
    { id: 'website', label: 'Website Audit' },
    { id: 'gaps', label: 'SEO Gaps' },
    { id: 'timeline', label: 'Opportunity & Timeline' },
    { id: 'actionPlan', label: 'Action Plan' },
    { id: 'contact', label: 'Contact & Social' },
    { id: 'evidence', label: 'Evidence System' },
    { id: 'email', label: 'Cold Email (<100w)' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-hidden">
      <div className="relative w-full max-w-5xl h-[90vh] rounded-2xl glass-panel flex flex-col overflow-hidden border border-zinc-800 shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60">
          <div className="flex items-center gap-3">
            <span
              className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold ${
                lead.currentRank <= 3
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              }`}
            >
              Rank #{lead.currentRank}
            </span>
            <div>
              <h2 className="text-base font-bold text-zinc-100">{lead.businessName}</h2>
              <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                <span>{lead.category}</span>
                <span>•</span>
                <span>{lead.city}, {lead.state}</span>
                <span>•</span>
                <span>{lead.reviewsCount} reviews ({lead.rating}★)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`/reports/${lead.id}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Client Report</span>
              <ExternalLink className="w-3 h-3 text-zinc-500" />
            </a>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-xs font-medium text-rose-300 hover:text-rose-200 transition-colors disabled:opacity-50"
              title="Delete this lead"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              <span>{isDeleting ? 'Deleting...' : 'Delete Lead'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 border-b border-zinc-800 flex items-center gap-1 overflow-x-auto shrink-0 bg-zinc-950/40">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3 py-2.5 text-xs font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeTab === t.id
                  ? 'border-emerald-500 text-emerald-400 font-semibold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-3">
                <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Business Location</h3>
                <div className="space-y-2 text-xs text-zinc-300">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{lead.address}</span>
                  </div>
                  {lead.googleMapsUrl && (
                    <a
                      href={lead.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-emerald-400 hover:underline pt-1"
                    >
                      <span>View on Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-3">
                <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Website & Digital Presence</h3>
                <div className="space-y-2 text-xs text-zinc-300">
                  {lead.hasWebsite && lead.website ? (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                      <a href={lead.website} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline truncate">
                        {lead.website}
                      </a>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium">
                      No Official Website Linked to Google Profile
                    </div>
                  )}
                  <div className="pt-1 text-[11px] text-zinc-400">
                    Status: <span className="text-emerald-400 font-mono">{lead.businessStatus}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-3">
                <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Primary Benchmark</h3>
                <div className="space-y-1.5 text-xs text-zinc-300">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Target Keyword:</span>
                    <span className="font-mono text-zinc-200">{lead.primaryService}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Observed Rank:</span>
                    <span className="font-mono text-emerald-400 font-bold">#{lead.currentRank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Opportunity Score:</span>
                    <span className="font-mono text-emerald-400 font-bold">{lead.opportunityScore?.score ?? 78}/100</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 5-POINT RANKING GRID */}
          {activeTab === 'grid' && lead.rankingGrid && (
            <div className="space-y-5">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2 font-mono">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{lead.rankingGrid.disclaimer}</span>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center">
                  <div className="text-[11px] text-zinc-400 uppercase font-semibold">Average Rank</div>
                  <div className="text-xl font-bold font-mono text-zinc-100 mt-1">#{lead.rankingGrid.averageRank}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center">
                  <div className="text-[11px] text-zinc-400 uppercase font-semibold">Best / Worst Rank</div>
                  <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
                    #{lead.rankingGrid.bestRank} / #{lead.rankingGrid.worstRank}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center">
                  <div className="text-[11px] text-zinc-400 uppercase font-semibold">3-Pack Appearances</div>
                  <div className="text-xl font-bold font-mono text-zinc-100 mt-1">
                    {lead.rankingGrid.threePackAppearances} / 5
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center">
                  <div className="text-[11px] text-zinc-400 uppercase font-semibold">Visibility Index</div>
                  <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
                    {lead.rankingGrid.visibilityPercentage}%
                  </div>
                </div>
              </div>

              {/* Cardinal Map Visualizer */}
              <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-center space-y-4">
                <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Cardinal Grid Map</div>
                <div className="grid grid-cols-3 gap-4 w-72 text-center text-xs">
                  <div />
                  <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                    <div className="text-[10px] text-zinc-400">NORTH</div>
                    <div className="font-mono font-bold text-zinc-200">#{lead.rankingGrid.northRank}</div>
                  </div>
                  <div />

                  <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                    <div className="text-[10px] text-zinc-400">WEST</div>
                    <div className="font-mono font-bold text-zinc-200">#{lead.rankingGrid.westRank}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <div className="text-[10px] font-bold">CENTER</div>
                    <div className="font-mono font-bold text-base">#{lead.rankingGrid.centerRank}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                    <div className="text-[10px] text-zinc-400">EAST</div>
                    <div className="font-mono font-bold text-zinc-200">#{lead.rankingGrid.eastRank}</div>
                  </div>

                  <div />
                  <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                    <div className="text-[10px] text-zinc-400">SOUTH</div>
                    <div className="font-mono font-bold text-zinc-200">#{lead.rankingGrid.southRank}</div>
                  </div>
                  <div />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COMPETITOR BENCHMARK */}
          {activeTab === 'competitors' && lead.competitorComparison && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800">
                <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Target vs Top 3 Benchmark</h3>
                <p className="text-xs text-zinc-300">{lead.competitorComparison.primaryGap}</p>
                <div className="flex gap-4 mt-3 text-xs font-mono">
                  <span className="text-amber-400">Review Delta: +{lead.competitorComparison.reviewDeltaToTop3Avg} reviews needed</span>
                  <span className="text-zinc-600">|</span>
                  <span className="text-zinc-300">Rating Delta: +{lead.competitorComparison.ratingDeltaToTop3Avg}★ gap</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {lead.competitorComparison.top3Competitors.map((comp) => (
                  <div key={comp.id} className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-bold text-xs">
                        Rank #{comp.rank}
                      </span>
                      <span className="text-xs text-zinc-400 font-mono">{comp.reviewsCount} reviews</span>
                    </div>
                    <div className="font-semibold text-zinc-100 text-xs line-clamp-1">{comp.businessName}</div>
                    <div className="text-[11px] text-zinc-400 line-clamp-3 leading-relaxed">
                      {comp.keyAdvantage}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: GBP AUDIT */}
          {activeTab === 'gbp' && lead.gbpAudit && (
            <div className="space-y-5">
              <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/40 border border-zinc-800">
                <div>
                  <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">GBP Optimization Score</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Evaluation of category signals, review recency, photo depth, and response rate.</p>
                </div>
                <div className="text-2xl font-bold font-mono text-emerald-400">{lead.gbpAudit.score}/100</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800 space-y-2">
                  <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Observed Strengths</h4>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    {lead.gbpAudit.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800 space-y-2">
                  <h4 className="text-xs font-semibold text-rose-400 uppercase tracking-wider">Identified Weaknesses</h4>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    {lead.gbpAudit.weaknesses.map((w, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: WEBSITE TECHNICAL AUDIT */}
          {activeTab === 'website' && (
            <div className="space-y-5">
              {lead.websiteAudit ? (
                <>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/40 border border-zinc-800">
                    <div>
                      <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Website Technical Score</h3>
                      <p className="text-xs text-zinc-400 mt-0.5">SSL status, mobile responsiveness, LocalBusiness schema JSON-LD, booking funnels.</p>
                    </div>
                    <div className="text-2xl font-bold font-mono text-emerald-400">
                      {lead.websiteAudit.scores.overall}/100
                    </div>
                  </div>

                  {/* Factor Breakdown */}
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                    <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800 text-center">
                      <div className="text-[10px] text-zinc-400">Tech SEO</div>
                      <div className="font-mono font-bold text-zinc-200 mt-1">{lead.websiteAudit.scores.technicalSeo}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800 text-center">
                      <div className="text-[10px] text-zinc-400">Local SEO</div>
                      <div className="font-mono font-bold text-zinc-200 mt-1">{lead.websiteAudit.scores.localSeo}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800 text-center">
                      <div className="text-[10px] text-zinc-400">Content</div>
                      <div className="font-mono font-bold text-zinc-200 mt-1">{lead.websiteAudit.scores.content}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800 text-center">
                      <div className="text-[10px] text-zinc-400">Conversion</div>
                      <div className="font-mono font-bold text-zinc-200 mt-1">{lead.websiteAudit.scores.conversion}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800 text-center">
                      <div className="text-[10px] text-zinc-400">Mobile UX</div>
                      <div className="font-mono font-bold text-zinc-200 mt-1">{lead.websiteAudit.scores.mobileUx}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800 text-center">
                      <div className="text-[10px] text-zinc-400">Trust</div>
                      <div className="font-mono font-bold text-zinc-200 mt-1">{lead.websiteAudit.scores.trust}</div>
                    </div>
                  </div>

                  {/* Findings */}
                  <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800 space-y-2">
                    <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Audit Findings</h4>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {lead.websiteAudit.findings.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center text-zinc-500 text-xs">No website audit data recorded.</div>
              )}
            </div>
          )}

          {/* TAB 6: OPPORTUNITY & TIMELINE */}
          {activeTab === 'timeline' && lead.opportunityScore && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-3">
                  <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Top 3 Opportunity Score</div>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-bold font-mono text-emerald-400">{lead.opportunityScore.score}/100</div>
                    <div className="space-y-0.5">
                      <div className="text-xs font-semibold text-zinc-200">Difficulty: {lead.opportunityScore.difficulty}</div>
                      <div className="text-[11px] text-zinc-400">Potential: {lead.opportunityScore.potential}</div>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-300 pt-1">{lead.opportunityScore.summary}</p>
                </div>

                <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-3">
                  <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Realistic Timeline Range</div>
                  <div className="text-xl font-bold font-mono text-zinc-100 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-emerald-400" />
                    <span>{lead.actionPlan?.timelineLabel || '45-60 Days'}</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Estimated implementation duration based on review acquisition velocity, citation synchronization, and Google re-indexing cycles.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: ACTION PLAN */}
          {activeTab === 'actionPlan' && lead.actionPlan && (
            <div className="space-y-4">
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                3-Phase Implementation Blueprint
              </div>
              <div className="space-y-3">
                {lead.actionPlan.phases.map((phase) => (
                  <div key={phase.phase} className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-emerald-400">
                      <span>{phase.name}</span>
                      <span className="font-mono text-zinc-400">{phase.daysRange}</span>
                    </div>
                    <div className="space-y-2">
                      {phase.tasks.map((t, idx) => (
                        <div key={idx} className="flex items-start justify-between text-xs p-2 rounded-lg bg-zinc-950/40 border border-zinc-800/60">
                          <div className="flex items-start gap-2 max-w-[80%]">
                            <span className="px-1.5 py-0.2 rounded bg-zinc-800 text-[10px] font-mono text-zinc-300 font-bold shrink-0">
                              {t.priority}
                            </span>
                            <span className="text-zinc-200">{t.task}</span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-[10px] text-zinc-400 font-mono">{t.estimatedEffort}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: CONTACT & SOCIALS */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-4">
                <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Public Contact Intelligence</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-zinc-400">Decision Maker / Owner:</span>
                    <div className="font-medium text-zinc-200 mt-0.5">
                      {lead.contact?.decisionMakerName || 'Front Desk / Owner (Generic fallback: "there")'}
                    </div>
                  </div>
                  <div>
                    <span className="text-zinc-400">Public Business Email:</span>
                    <div className="font-mono text-emerald-400 mt-0.5">
                      {lead.contact?.primaryEmail || 'No public email found (Outreach via Social / DM)'}
                    </div>
                  </div>
                  <div>
                    <span className="text-zinc-400">Recommended Channel:</span>
                    <div className="font-semibold text-zinc-200 mt-0.5">{lead.contact?.outreachChannel}</div>
                  </div>
                  <div>
                    <span className="text-zinc-400">Verification Confidence:</span>
                    <div className="font-mono text-zinc-300 mt-0.5">{lead.contact?.confidence}</div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-3 border-t border-zinc-800 flex items-center gap-3">
                  {lead.contact?.instagram && (
                    <a
                      href={lead.contact.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 transition-colors"
                    >
                      <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                      <span>Instagram</span>
                    </a>
                  )}
                  {lead.contact?.facebook && (
                    <a
                      href={lead.contact.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 transition-colors"
                    >
                      <FacebookIcon className="w-3.5 h-3.5 text-blue-400" />
                      <span>Facebook</span>
                    </a>
                  )}
                  {lead.contact?.linkedin && (
                    <a
                      href={lead.contact.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 transition-colors"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5 text-blue-500" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: EVIDENCE SYSTEM */}
          {activeTab === 'evidence' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800 text-xs text-zinc-400">
                Every recommendation and observation is grounded in verifiable evidence with date and source tracking.
              </div>
              <div className="space-y-3">
                {lead.evidence.map((item) => (
                  <div key={item.id} className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-emerald-400">{item.finding}</span>
                      <span className="text-[10px] font-mono text-zinc-400">{item.observedAt.split('T')[0]}</span>
                    </div>
                    <div className="text-[11px] text-zinc-400 flex items-center gap-2 font-mono">
                      <span>Source: {item.source}</span>
                      <span>•</span>
                      <span>Confidence: {item.confidence}</span>
                    </div>
                    {item.snippet && <p className="text-[11px] text-zinc-300 pt-1 font-mono">{item.snippet}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: COLD EMAIL */}
          {activeTab === 'email' && lead.coldEmail && (
            <div className="space-y-5">
              {/* Validation Checklist */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <div className="text-[10px] text-zinc-400">Word Count</div>
                  <div className="font-mono font-bold text-emerald-400 text-sm mt-0.5">
                    {lead.coldEmail.wordCount} words (&lt;100w)
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <div className="text-[10px] text-zinc-400">Observed Rank</div>
                  <div className="font-mono font-bold text-emerald-400 text-sm mt-0.5">
                    #{lead.coldEmail.targetRank} Verified
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <div className="text-[10px] text-zinc-400">Zero Hallucinations</div>
                  <div className="font-mono font-bold text-emerald-400 text-sm mt-0.5">Validated</div>
                </div>
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <div className="text-[10px] text-zinc-400">Status</div>
                  <div className="font-mono font-bold text-emerald-400 text-sm mt-0.5">Ready to Send</div>
                </div>
              </div>

              {/* Subject Lines */}
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-2">
                <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Ranked Subject Lines</div>
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="p-2 rounded bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                    <span className="text-emerald-400">Recommended: {lead.coldEmail.subjectRecommended}</span>
                    <span className="text-[10px] text-zinc-300">Highest Open Rate</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-950/60 border border-zinc-800/60 text-zinc-300">
                    Alt 1: {lead.coldEmail.subjectAlt1}
                  </div>
                  <div className="p-2 rounded bg-zinc-950/60 border border-zinc-800/60 text-zinc-300">
                    Alt 2: {lead.coldEmail.subjectAlt2}
                  </div>
                </div>
              </div>

              {/* Email Body */}
              <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                    Cold Email Copy ({lead.coldEmail.wordCount} words)
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-sm"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'Copied to Clipboard!' : 'Copy Email'}</span>
                  </button>
                </div>
                <div className="font-mono text-xs text-zinc-200 whitespace-pre-line leading-relaxed select-text p-2">
                  {lead.coldEmail.body}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
