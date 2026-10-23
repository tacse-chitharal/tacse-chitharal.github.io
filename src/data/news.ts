/**
 * Messages for the scrolling news strip on the home page.
 *
 * Edited in the admin dashboard (Pages CMS), stored in src/content/news.json.
 * Each message disappears by itself after its "show until" date: expired
 * messages are dropped when the site is built, and the visitor's browser also
 * hides any that expire between builds, so nobody has to remember to delete
 * last month's notice.
 */
import data from '../content/news.json';
import { formatDateShort, formatRupees, isIsoDate, todayInIndia } from '../lib/format';

export type NewsItem = {
  message: string;
  /** "Starts 21 Oct 2026", or empty. */
  starts: string;
  /** "₹1500 / month", or empty. */
  fee: string;
  /** Site path the item links to, or empty for no link. */
  href: string;
  /** YYYY-MM-DD, last day the message is shown (inclusive). */
  showUntil: string;
};

const LINKS: Record<string, string> = {
  apply: '/apply/',
  courses: '/courses/',
  contact: '/contact/',
  none: '',
};

type RawItem = {
  message?: unknown;
  startDate?: unknown;
  fee?: unknown;
  link?: unknown;
  showUntil?: unknown;
};

function loadNews(): NewsItem[] {
  const raw = (data as { items?: RawItem[] }).items;
  if (raw === undefined || raw === null) return [];
  if (!Array.isArray(raw)) throw new Error('src/content/news.json must contain an "items" list.');

  const problems: string[] = [];
  const today = todayInIndia();
  const items: NewsItem[] = [];

  raw.forEach((item, index) => {
    const message = typeof item.message === 'string' ? item.message.trim() : '';
    const where = message ? `News "${message.slice(0, 40)}"` : `News message number ${index + 1}`;

    if (!message) {
      problems.push(`${where} has no text.`);
      return;
    }

    const showUntil = typeof item.showUntil === 'string' ? item.showUntil.trim() : '';
    if (!isIsoDate(showUntil)) {
      problems.push(`${where} needs a "Show until" date.`);
      return;
    }

    const startDate = typeof item.startDate === 'string' ? item.startDate.trim() : '';
    if (startDate && !isIsoDate(startDate)) {
      problems.push(`${where} has a start date that is not a real date: "${startDate}".`);
      return;
    }

    // Past its date: leave it out of the page entirely.
    if (showUntil < today) return;

    const fee = typeof item.fee === 'number' && item.fee > 0 ? `${formatRupees(item.fee)} / month` : '';
    const href = LINKS[String(item.link ?? 'apply')] ?? '/apply/';

    items.push({
      message,
      starts: startDate ? `Starts ${formatDateShort(startDate)}` : '',
      fee,
      href,
      showUntil,
    });
  });

  if (problems.length) {
    throw new Error(
      `The news messages in the admin dashboard need fixing before the website can update:\n  - ${problems.join('\n  - ')}`,
    );
  }

  return items;
}

export const news: NewsItem[] = loadNews();
