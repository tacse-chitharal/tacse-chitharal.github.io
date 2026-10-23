/**
 * The coaching programmes, as the rest of the site uses them.
 *
 * The content itself lives in src/content/courses.json, which the admin
 * dashboard (Pages CMS) edits. This module reads that file, checks it, and
 * fills in anything derived — the web address, the start-date wording — so a
 * page never has to.
 *
 * If the file has a problem, the build stops here with a message naming the
 * course and the field. On GitHub that means the deploy fails and the live
 * site stays exactly as it was, rather than going up broken.
 */
import data from '../content/courses.json';
import { formatDateLong, isIsoDate, slugify } from '../lib/format';

export const courseIcons = [
  'emblem', 'pillar', 'people', 'document', 'ledger', 'bank', 'shield', 'badge', 'star', 'wings',
] as const;
export const courseColours = ['navy', 'green', 'violet', 'gold', 'teal', 'rose'] as const;

export type Course = {
  /** The web address part: /courses/<id>/ */
  id: string;
  name: string;
  target: string;
  /** What visitors read, e.g. "3 months, starting 21 October 2026". */
  duration: string;
  /** The duration on its own, e.g. "3 months". */
  length: string;
  /** YYYY-MM-DD, or empty. */
  startDate: string;
  featured: boolean;
  icon: (typeof courseIcons)[number];
  accent: (typeof courseColours)[number];
  summary: string;
  highlights: string[];
};

type RawCourse = {
  name?: unknown;
  slug?: unknown;
  target?: unknown;
  duration?: unknown;
  startDate?: unknown;
  showOnWebsite?: unknown;
  showOnHomePage?: unknown;
  icon?: unknown;
  colour?: unknown;
  summary?: unknown;
  highlights?: unknown;
};

const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

function loadCourses(): Course[] {
  const raw = (data as { courses?: RawCourse[] }).courses;
  const problems: string[] = [];

  if (!Array.isArray(raw)) {
    throw new Error('src/content/courses.json must contain a "courses" list.');
  }

  const seen = new Map<string, string>();
  const courses: Course[] = [];

  raw.forEach((item, index) => {
    const name = text(item.name);
    const where = name ? `Course "${name}"` : `Course number ${index + 1}`;

    // A course switched off in the dashboard is skipped entirely: no page,
    // no card, no checkbox on the application form.
    if (item.showOnWebsite === false) return;

    if (!name) problems.push(`${where} has no name.`);

    const id = slugify(text(item.slug) || name);
    if (!id) problems.push(`${where} needs a name made of letters or numbers.`);
    else if (seen.has(id)) {
      problems.push(`${where} and "${seen.get(id)}" would share the web address /courses/${id}/. Give one of them a different name or web address.`);
    } else seen.set(id, name);

    const target = text(item.target);
    if (!target) problems.push(`${where} is missing "Leads to (posts)".`);

    const length = text(item.duration);
    if (!length) problems.push(`${where} is missing its duration.`);

    const startDate = text(item.startDate);
    if (startDate && !isIsoDate(startDate)) problems.push(`${where} has a start date that is not a real date: "${startDate}".`);

    const summary = text(item.summary);
    if (!summary) problems.push(`${where} is missing its summary.`);

    const highlights = Array.isArray(item.highlights)
      ? item.highlights.map(text).filter(Boolean)
      : [];

    // Unknown or blank icon / colour falls back quietly: a cosmetic choice
    // should never take the website down.
    const icon = courseIcons.find((i) => i === item.icon) ?? 'document';
    const accent = courseColours.find((c) => c === item.colour) ?? 'navy';

    courses.push({
      id,
      name,
      target,
      length,
      startDate,
      duration: startDate && isIsoDate(startDate) ? `${length}, starting ${formatDateLong(startDate)}` : length,
      featured: item.showOnHomePage === true,
      icon,
      accent,
      summary,
      highlights,
    });
  });

  if (courses.length === 0 && problems.length === 0) {
    problems.push('Every course is switched off. At least one course must show on the website.');
  }

  if (problems.length) {
    throw new Error(
      `The courses in the admin dashboard need fixing before the website can update:\n  - ${problems.join('\n  - ')}`,
    );
  }

  return courses;
}

export const courses: Course[] = loadCourses();

/**
 * The programmes on the home page: those ticked "Show on home page", or the
 * first four if none are, so the section is never empty.
 */
export const featuredCourses: Course[] = (() => {
  const picked = courses.filter((course) => course.featured);
  return picked.length ? picked : courses.slice(0, 4);
})();
