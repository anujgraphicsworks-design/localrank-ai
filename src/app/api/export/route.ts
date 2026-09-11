import { NextRequest, NextResponse } from 'next/server';
import { getLeads } from '@/lib/server/storage';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get('format') || 'csv';
    const leads = await getLeads();

    if (format === 'json') {
      return new NextResponse(JSON.stringify(leads, null, 2), {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="localrank_leads_${Date.now()}.json"`
        }
      });
    }

    // Generate CSV
    const headers = [
      'ID',
      'Business Name',
      'Category',
      'City',
      'State',
      'Rank',
      'Avg Rank',
      'Reviews',
      'Rating',
      'Website',
      'Has Website',
      'Website Score',
      'GBP Score',
      'Opportunity Score',
      'Timeline',
      'First Name',
      'Role',
      'Email',
      'Email Found',
      'Instagram',
      'Facebook',
      'LinkedIn',
      'Recommended Subject',
      'Cold Email Body',
      'Lead Status'
    ];

    const escapeCsv = (val: any) => {
      if (val === undefined || val === null) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = leads.map((l) => [
      l.id,
      l.businessName,
      l.category,
      l.city,
      l.state,
      l.currentRank,
      l.rankingGrid?.averageRank || l.currentRank,
      l.reviewsCount,
      l.rating,
      l.website || '',
      l.hasWebsite ? 'YES' : 'NO',
      l.websiteAudit?.scores.overall ?? 'N/A',
      l.gbpAudit?.score ?? 'N/A',
      l.opportunityScore?.score ?? 'N/A',
      l.actionPlan?.timelineLabel ?? '',
      l.contact?.firstName || 'there',
      l.contact?.role || '',
      l.contact?.primaryEmail || '',
      l.contact?.emailFound ? 'YES' : 'NO',
      l.contact?.instagram || '',
      l.contact?.facebook || '',
      l.contact?.linkedin || '',
      l.coldEmail?.subjectRecommended || '',
      l.coldEmail?.body || '',
      l.leadStatus
    ]);

    const csvContent = [
      headers.map(escapeCsv).join(','),
      ...rows.map((r) => r.map(escapeCsv).join(','))
    ].join('\r\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="localrank_leads_${Date.now()}.csv"`
      }
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
