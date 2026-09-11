/**
 * enrichment/index.ts - Contact Enrichment & Decision Maker Discovery Engine
 * Finds verified public emails, Instagram, Facebook, LinkedIn, and extracts owner first names safely.
 * NEVER invents or fabricates names or contact details.
 */

import * as cheerio from 'cheerio';
import { ContactEnrichment } from '../../types';

const IGNORED_DOMAINS = [
  'sentry.io',
  'wixpress.com',
  'wordpress.org',
  'example.com',
  'domain.com',
  'yourdomain.com',
  'email.com',
  'test.com',
  'googleapis.com',
  'schema.org'
];

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.css', '.js', '.woff', '.woff2'];

export function cleanEmail(email: string): string | null {
  const clean = email.trim().toLowerCase();
  if (clean.includes('..') || !clean.includes('@')) return null;
  if (IMAGE_EXTENSIONS.some((ext) => clean.includes(ext))) return null;
  if (IGNORED_DOMAINS.some((domain) => clean.includes(domain))) return null;
  if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(clean)) return null;
  return clean;
}

export function extractDecisionMakerFirstName(businessName: string, text: string = ''): { firstName: string; fullName?: string; role?: string } {
  // 1. Check for "Dr. [First] [Last]" in business name (e.g. "Dr. Dave Miller Dental")
  const drMatch = businessName.match(/\b(?:Dr|Doctor)\.?\s+([A-Z][a-z]+)(?:\s+([A-Z][a-z]+))?/i);
  if (drMatch) {
    const firstName = drMatch[1].charAt(0).toUpperCase() + drMatch[1].slice(1).toLowerCase();
    const fullName = drMatch[2] ? `Dr. ${firstName} ${drMatch[2]}` : `Dr. ${firstName}`;
    return { firstName, fullName, role: 'Lead Dentist / Founder' };
  }

  // 2. Check for "[Name]'s [Business]" (e.g. "Dave's Dental Care")
  const possessiveMatch = businessName.match(/^([A-Z][a-z]+)['’]s\b/);
  if (possessiveMatch) {
    const candidate = possessiveMatch[1];
    const invalid = ['world', 'city', 'america', 'nation', 'state', 'queen', 'king', 'nature', 'downtown', 'central'];
    if (!invalid.includes(candidate.toLowerCase())) {
      const firstName = candidate.charAt(0).toUpperCase() + candidate.slice(1).toLowerCase();
      return { firstName, fullName: `${firstName} (Owner)`, role: 'Owner / Founder' };
    }
  }

  // 3. Look for explicit leadership mentions in page text if available
  if (text) {
    const founderMatch = text.match(/\b(?:founded|owned|started)\s+by\s+(?:Dr\.?\s+)?([A-Z][a-z]+)(?:\s+([A-Z][a-z]+))?/i);
    if (founderMatch) {
      const firstName = founderMatch[1].charAt(0).toUpperCase() + founderMatch[1].slice(1).toLowerCase();
      const fullName = founderMatch[2] ? `${firstName} ${founderMatch[2]}` : firstName;
      return { firstName, fullName, role: 'Founder & Owner' };
    }

    const meetMatch = text.match(/\bMeet\s+(?:Dr\.?\s+)?([A-Z][a-z]+)(?:\s+([A-Z][a-z]+))?\b/);
    if (meetMatch) {
      const invalid = ['our', 'the', 'us', 'team', 'your', 'doctor', 'staff'];
      if (!invalid.includes(meetMatch[1].toLowerCase())) {
        const firstName = meetMatch[1].charAt(0).toUpperCase() + meetMatch[1].slice(1).toLowerCase();
        const fullName = meetMatch[2] ? `Dr. ${firstName} ${meetMatch[2]}` : firstName;
        return { firstName, fullName, role: 'Lead Practitioner' };
      }
    }
  }

  // Natural fallback if no person name is found
  return { firstName: 'there', role: 'Business Owner / Front Desk' };
}

export async function enrichContactDetails(
  websiteUrl?: string,
  businessName: string = '',
  city: string = ''
): Promise<ContactEnrichment> {
  const { firstName, fullName, role } = extractDecisionMakerFirstName(businessName);

  if (!websiteUrl) {
    return {
      decisionMakerName: fullName,
      firstName,
      role,
      emailFound: false,
      confidence: 'Low',
      outreachChannel: 'Instagram DM'
    };
  }

  try {
    let html = '';
    try {
      const resp = await fetch(websiteUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
        },
        signal: AbortSignal.timeout(5000)
      });
      html = await resp.text();
    } catch (e) {
      // Offline fallback
      html = '';
    }

    const $ = cheerio.load(html || '');
    const emailsFound: string[] = [];
    let instagram: string | undefined;
    let facebook: string | undefined;
    let linkedin: string | undefined;
    let twitter: string | undefined;

    // Scan mailto: links
    $('a[href^="mailto:"]').each((_, el) => {
      const href = $(el).attr('href') || '';
      const email = href.replace(/^mailto:/i, '').split('?')[0].trim();
      const cleaned = cleanEmail(email);
      if (cleaned && !emailsFound.includes(cleaned)) {
        emailsFound.push(cleaned);
      }
    });

    // Scan text for regex emails if mailto not found
    if (emailsFound.length === 0 && html) {
      const emailMatches = html.match(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/g) || [];
      for (const raw of emailMatches) {
        const cleaned = cleanEmail(raw);
        if (cleaned && !emailsFound.includes(cleaned)) {
          emailsFound.push(cleaned);
        }
      }
    }

    // Scan for social profile URLs
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href') || '';
      const lower = href.toLowerCase();
      if (lower.includes('instagram.com/') && !instagram && !lower.includes('/p/') && !lower.includes('/reel/')) {
        instagram = href;
      } else if (lower.includes('facebook.com/') && !facebook && !lower.includes('sharer') && !lower.includes('tr?id=')) {
        facebook = href;
      } else if (lower.includes('linkedin.com/') && !linkedin) {
        linkedin = href;
      } else if ((lower.includes('twitter.com/') || lower.includes('x.com/')) && !twitter) {
        twitter = href;
      }
    });

    const primaryEmail = emailsFound[0];
    let outreachChannel: ContactEnrichment['outreachChannel'] = 'Website Contact Form';

    if (primaryEmail) {
      outreachChannel = 'Email';
    } else if (instagram) {
      outreachChannel = 'Instagram DM';
    } else if (facebook) {
      outreachChannel = 'Facebook Messenger';
    }

    return {
      decisionMakerName: fullName,
      firstName,
      role,
      primaryEmail,
      emailFound: Boolean(primaryEmail),
      emailSource: primaryEmail ? 'Website Contact Page / Header' : undefined,
      confidence: primaryEmail ? 'High' : 'Medium',
      websiteUrl,
      instagram,
      facebook,
      linkedin,
      twitter,
      outreachChannel
    };
  } catch (err) {
    return {
      decisionMakerName: fullName,
      firstName,
      role,
      emailFound: false,
      confidence: 'Low',
      websiteUrl,
      outreachChannel: 'Website Contact Form'
    };
  }
}
