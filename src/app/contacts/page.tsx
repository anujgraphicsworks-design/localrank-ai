import React from 'react';
import { Header } from '@/components/layout/Header';
import { getLeads } from '@/lib/server/storage';
import { Mail, ExternalLink, CheckCircle } from 'lucide-react';
import { InstagramIcon, FacebookIcon, LinkedinIcon } from '@/components/ui/SocialIcons';

export default async function ContactsPage() {
  const leads = await getLeads();

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header
        title="Public Contact Intelligence & Decision Makers"
        subtitle="Verified public business emails, identified decision-maker first names, and active social profiles"
      />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {leads.map((lead) => {
            const contact = lead.contact;
            if (!contact) return null;

            return (
              <div key={lead.id} className="p-5 rounded-xl glass-panel space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-100">{lead.businessName}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        contact.emailFound
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {contact.outreachChannel}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">{lead.city}, {lead.state}</div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80 space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase font-semibold">Decision Maker</span>
                    <div className="font-semibold text-zinc-200 mt-0.5">
                      {contact.decisionMakerName || 'Owner / Front Desk ("there")'}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase font-semibold">Public Email</span>
                    <div className="font-mono text-emerald-400 mt-0.5 truncate">
                      {contact.primaryEmail || 'No public email found'}
                    </div>
                  </div>
                </div>

                {/* Social Profiles */}
                <div className="flex items-center gap-2 pt-1">
                  {contact.instagram && (
                    <a
                      href={contact.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-pink-400 transition-colors"
                      title="Instagram Profile"
                    >
                      <InstagramIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {contact.facebook && (
                    <a
                      href={contact.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-blue-400 transition-colors"
                      title="Facebook Page"
                    >
                      <FacebookIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {contact.linkedin && (
                    <a
                      href={contact.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-blue-500 transition-colors"
                      title="LinkedIn Page"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
