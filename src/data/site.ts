/**
 * Academy details used across every page.
 *
 * Name, contact details and the Thirukkural couplets are edited here, in code.
 * The fee, opening days and hours come from src/content/settings.json, which
 * the admin dashboard (Pages CMS) edits; this file only reads and checks them.
 */
import settings from '../content/settings.json';
import { capitalise, formatRupees, numberWord } from '../lib/format';

export const site = {
  shortName: 'TACSE',
  name: 'Thiruvalluvar Academy for Civil Service Exam',
  location: 'Chitharal',
  district: 'Kanniyakumari District, Tamil Nadu',
  tagline: 'Affordable, community-driven coaching for rural youth and aspiring civil servants in Chitharal.',
  description:
    `A non-profit academy in Chitharal preparing rural students for UPSC, TNPSC, SSC, Banking, Police and NDA examinations. Library, classes and fortnightly mock tests for ${formatRupees(Number(settings.feePerMonth))} a month.`,

  // ---------------------------------------------------------------------
  // CONTACT DETAILS
  // ---------------------------------------------------------------------
  // The Academy's own Gmail account. The Google Forms and the admissions
  // spreadsheet belong to this account too.
  email: 'tacse.chitharal@gmail.com',
  // `phone` is what visitors read; `phoneHref` is the same number, digits
  // only, so tapping it on a phone starts a call. Change both together.
  phone: '+91 9443047400',
  phoneHref: 'tel:+919443047400',
  address: {
    line1: 'Thiruvalluvar Academy For Civil Service Examinations',
    line2: 'Harmony Nagar, Chitharal Junction',
    line3: 'Kanniyakumari District - 629151',
    // Used by search engines; not shown on the page.
    street: 'Harmony Nagar, Chitharal Junction',
    postalCode: '629151',
  },
  // Paste a Google Maps "embed" link here to show a map on the Contact page.
  // Leave it empty and the map section is skipped automatically.
  mapEmbedUrl: '',
} as const;

const WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
type Weekday = (typeof WEEK)[number];

/**
 * Reads the dashboard's settings and refuses obviously broken values, so a
 * slip in the dashboard stops the deploy instead of publishing nonsense.
 */
function loadSchedule() {
  const problems: string[] = [];

  const fee = Number(settings.feePerMonth);
  if (!Number.isFinite(fee) || fee < 0) problems.push('The monthly fee must be a number, 0 or more.');

  // Keep the days in week order whatever order they were ticked in.
  const ticked = Array.isArray(settings.openDays) ? settings.openDays : [];
  const openDays = WEEK.filter((day) => ticked.includes(day));
  if (openDays.length === 0) problems.push('Tick at least one day the Academy is open.');

  const libraryHours = String(settings.libraryHours ?? '').trim();
  const classHours = String(settings.classHours ?? '').trim();
  if (!libraryHours) problems.push('Library hours are empty.');
  if (!classHours) problems.push('Class hours are empty.');

  if (problems.length) {
    throw new Error(
      `The fees and timetable in the admin dashboard need fixing before the website can update:\n  - ${problems.join('\n  - ')}`,
    );
  }

  const closedDays = WEEK.filter((day) => !openDays.includes(day));
  const count = openDays.length;

  return {
    openDays: openDays as Weekday[],
    closedDays: closedDays as Weekday[],
    /** "six" — for running text. */
    daysWord: numberWord(count),
    /** "6 days a week" */
    days: count === 7 ? 'Every day of the week' : `${count} day${count === 1 ? '' : 's'} a week`,
    /** "Six days a week" — to start a sentence. */
    daysHeading: count === 7 ? 'Every day of the week' : `${capitalise(numberWord(count))} days a week`,
    /** "Six Days a Week" — for title-case headings. */
    daysTitle: count === 7 ? 'Every Day of the Week' : `${capitalise(numberWord(count))} Day${count === 1 ? '' : 's'} a Week`,
    /** "Monday to Saturday", or a list when the days are not in one run. */
    dayRange: describeDays(openDays as Weekday[]),
    library: { label: 'Library & Self-Study', time: libraryHours },
    classes: { label: 'Coaching Classes', time: classHours },
    tests: { label: 'Fortnightly Mock Tests', time: 'Performance review after every test' },
    feeAmount: fee,
    fee: formatRupees(fee),
    feePeriod: '/ month',
  };
}

/** ["Monday" … "Saturday"] -> "Monday to Saturday"; gaps -> "Monday, Wednesday and Friday". */
function describeDays(days: Weekday[]): string {
  if (days.length === 7) return 'every day';
  if (days.length === 1) return days[0];
  const positions = days.map((day) => WEEK.indexOf(day));
  const consecutive = positions.every((p, i) => i === 0 || p === positions[i - 1] + 1);
  if (consecutive && days.length > 2) return `${days[0]} to ${days.at(-1)}`;
  return `${days.slice(0, -1).join(', ')} and ${days.at(-1)}`;
}

export const schedule = loadSchedule();

export const kurals = [
  {
    tamil: 'எண்ணித் துணிக கருமம் துணிந்தபின்\nஎண்ணுவம் என்பது இழுக்கு',
    number: 'குறள் 467',
    english:
      'Think carefully before embarking on any action; to deliberate after having begun is a flaw.',
  },
  {
    tamil: 'தெய்வத்தான் ஆகா தெனினும் முயற்சிதன்\nமெய்வருத்தக் கூலி தரும்',
    number: 'குறள் 619',
    english:
      'Even if divine providence denies success, the hard physical labour of perseverance pays its own reward.',
  },
] as const;

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about/' },
  { label: 'Courses', href: '/courses/' },
  { label: 'Timetable', href: '/timetable/' },
  { label: 'Student Support', href: '/student-support/' },
  { label: 'Contact', href: '/contact/' },
] as const;
