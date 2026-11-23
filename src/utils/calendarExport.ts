/**
 * GDG on Campus RV College of Engineering (GDG RVCE)
 * Client-Side .ics (iCalendar) Generator Utility
 * 
 * Complies with RFC 5545 iCalendar specification.
 * Zero external dependencies.
 */

import { GDGEvent } from '@/data/gdgData';

/**
 * Format an ISO 8601 date string into UTC iCalendar format: YYYYMMDDTHHMMSSZ
 */
export function formatToIcsUtc(isoString: string): string {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    const fallback = new Date();
    return fallback.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  }
  const pad = (num: number) => num.toString().padStart(2, '0');
  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1);
  const day = pad(date.getUTCDate());
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

/**
 * Escapes characters for iCalendar text fields according to RFC 5545.
 * Semicolons, commas, backslashes and newlines must be properly escaped.
 */
function escapeIcsText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/**
 * Generates and triggers a browser download of an .ics calendar file for a GDG RVCE session.
 * 
 * @param event - The GDGEvent object containing session metadata
 */
export function downloadEventIcs(event: GDGEvent): void {
  if (typeof window === 'undefined') return;

  const dtStart = formatToIcsUtc(event.isoStart);
  // If isoEnd is missing or invalid, default to 2 hours after isoStart
  let dtEnd: string;
  if (event.isoEnd) {
    dtEnd = formatToIcsUtc(event.isoEnd);
  } else {
    const startDate = new Date(event.isoStart);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    dtEnd = formatToIcsUtc(endDate.toISOString());
  }

  const dtStamp = formatToIcsUtc(new Date().toISOString());
  const uid = `${event.slug || event.id}-${Date.now()}@gdgrvce.app`;

  // Build structured description with highlights, speaker, and agenda
  const descriptionSections: string[] = [];

  // Summary / Description
  if (event.summary) {
    descriptionSections.push(event.summary);
  } else if (event.description) {
    descriptionSections.push(event.description);
  }

  // Speaker Information
  if (event.speaker && event.speaker.name) {
    const company = event.speaker.company ? ` (${event.speaker.company})` : '';
    descriptionSections.push(`Session Lead: ${event.speaker.name} - ${event.speaker.role}${company}`);
  }

  // Agenda Highlights
  if (event.agenda && event.agenda.length > 0) {
    const agendaLines = event.agenda.map((item) => {
      const topic = item.topic || item.title || 'Session';
      const detail = item.detail || item.description ? ` - ${item.detail || item.description}` : '';
      return `• ${item.time}: ${topic}${detail}`;
    });
    descriptionSections.push(`Agenda:\n${agendaLines.join('\n')}`);
  }

  // Prerequisites if available
  if (event.prerequisites && event.prerequisites.length > 0) {
    const prereqLines = event.prerequisites.map((p) => `• ${p}`);
    descriptionSections.push(`Technical Readiness:\n${prereqLines.join('\n')}`);
  }

  // Official Chapter Sign-off
  descriptionSections.push(
    `Delivery Mode: ${event.mode} | Track: ${event.category}\nOrganized by GDG on Campus RV College of Engineering (GDG RVCE).\nOfficial Chapter: https://gdg.community.dev/rvce`
  );

  const fullDescription = descriptionSections.join('\n\n');

  // RFC 5545 iCalendar content
  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//GDG on Campus RVCE//Interface Unlocked//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:[GDG RVCE] ${escapeIcsText(event.title)}`,
    `LOCATION:${escapeIcsText(`${event.venue}, RV College of Engineering, Bengaluru`)}`,
    `DESCRIPTION:${escapeIcsText(fullDescription)}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  const icsContent = icsLines.join('\r\n');
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const downloadUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', `${event.slug}-gdg-rvce.ics`);
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}
