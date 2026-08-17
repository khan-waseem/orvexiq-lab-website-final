/**
 * Formats an ISO date as Figma renders post dates, e.g. "28 Jun 2026"
 * (64:61 / 64:32). Uses en-GB explicitly so the output does not shift with the
 * server or browser locale.
 */
export function formatPostDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(d);
}
