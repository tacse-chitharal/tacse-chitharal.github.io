/**
 * Academy details used across every page.
 * Edit this file to change the address, phone number or timings site-wide.
 */

export const site = {
  shortName: 'TACSE',
  name: 'Thiruvalluvar Academy for Civil Service Exam',
  location: 'Chitharal',
  district: 'Kanniyakumari District, Tamil Nadu',
  tagline: 'Affordable, community-driven coaching for rural youth and aspiring civil servants in Chitharal.',
  description:
    'A non-profit academy in Chitharal preparing rural students for UPSC, TNPSC, SSC, Banking, Police and NDA examinations. Library, classes and fortnightly mock tests for ₹500 a month.',

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

export const schedule = {
  days: '6 days a week',
  library: { label: 'Library & Self-Study', time: '10:00 AM – 1:00 PM' },
  classes: { label: 'Coaching Classes', time: '2:00 PM – 5:00 PM' },
  tests: { label: 'Fortnightly Mock Tests', time: 'Performance review after every test' },
  fee: '₹500',
  feePeriod: '/ month',
} as const;

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
