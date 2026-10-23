/**
 * Small formatting helpers shared by the data modules and the pages.
 * Dates in the dashboard's data files are always stored as YYYY-MM-DD.
 */

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** True for a real calendar date written as YYYY-MM-DD. */
export function isIsoDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y, m, d] = value.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

/** "2026-10-21" -> "21 October 2026". Read from the string, so no time-zone shift. */
export function formatDateLong(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS.at(m - 1)} ${y}`;
}

/** "2026-10-21" -> "21 Oct 2026", for the narrow news strip. */
export function formatDateShort(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS.at(m - 1)?.slice(0, 3)} ${y}`;
}

/** 1500 -> "₹1500", the way the Academy writes its fee. */
export function formatRupees(amount: number): string {
  return `₹${amount}`;
}

/** Today's date as YYYY-MM-DD in India, where the Academy and its readers are. */
export function todayInIndia(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());
}

const NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];

/** 6 -> "six" (up to twelve, then digits), for running text. */
export function numberWord(n: number): string {
  return NUMBER_WORDS.at(n) ?? String(n);
}

/** "six" -> "Six", for headings. */
export function capitalise(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** Turns a name into a web address part: "TNPSC Group 4" -> "tnpsc-group-4". */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
