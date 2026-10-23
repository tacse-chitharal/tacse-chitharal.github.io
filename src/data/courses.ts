/**
 * The ten coaching programmes offered by the Academy.
 *
 * The order here is the order shown on the Courses page, on the home page
 * and in the "Coaching required for" checkboxes on the application form,
 * so add or remove a programme in one place and the whole site follows.
 *
 * `formValue` MUST match the checkbox option text in the Google Form exactly,
 * character for character, or Google silently drops the answer.
 */

export type Course = {
  id: string;
  name: string;
  line1: string;
  line2: string;
  target: string;
  duration: string;
  icon: 'emblem' | 'pillar' | 'people' | 'document' | 'ledger' | 'bank' | 'shield' | 'badge' | 'star' | 'wings';
  accent: 'navy' | 'green' | 'violet' | 'gold' | 'teal' | 'rose';
  summary: string;
  highlights: string[];
  formValue: string;
};

export const courses: Course[] = [
  {
    id: 'upsc',
    name: 'UPSC Civil Services',
    line1: 'UPSC',
    line2: 'Civil Services',
    target: 'IAS / IPS / IFS / Civil Services',
    duration: '6 months (Prelims)',
    icon: 'emblem',
    accent: 'navy',
    summary:
      'Structured preparation for the Civil Services Preliminary Examination, built for first-generation aspirants who are starting from the NCERT foundation.',
    highlights: [
      'General Studies Paper I & CSAT coverage from the ground up',
      'NCERT foundation classes before standard reference books',
      'Current affairs discussion every class, drawn from the daily newspaper',
      'Fortnightly full-length prelims mock tests with answer-key discussion',
    ],
    formValue: 'UPSC (Civil Services)',
  },
  {
    id: 'ssc',
    name: 'SSC – Staff Selection Commission',
    line1: 'SSC',
    line2: 'Central Services',
    target: 'Staff Selection Commission Central Services',
    duration: '3 to 6 months',
    icon: 'document',
    accent: 'teal',
    summary:
      'Coaching for SSC CGL, CHSL and allied central government posts, with the quantitative aptitude and reasoning drilling these papers reward.',
    highlights: [
      'Quantitative aptitude and reasoning practice in every session',
      'English comprehension and grammar for candidates from Tamil-medium schools',
      'General awareness capsules revised fortnightly',
      'Speed and accuracy drills under exam time limits',
    ],
    formValue: 'SSC (Staff Selection Central Services)',
  },
  {
    id: 'banking',
    name: 'Banking Services',
    line1: 'Banking',
    line2: 'Services',
    target: 'IBPS / SBI PO & Clerk, RRB',
    duration: '3 to 6 months',
    icon: 'bank',
    accent: 'green',
    summary:
      'Preparation for IBPS and SBI Probationary Officer and Clerk recruitment, along with Regional Rural Bank examinations.',
    highlights: [
      'Banking and financial awareness updated with every policy change',
      'Data interpretation and puzzle-solving practice sets',
      'Sectional timing strategy for prelims and mains',
      'Descriptive paper and interview preparation for PO aspirants',
    ],
    formValue: 'Banking Services',
  },
  {
    id: 'tnpsc-group-1',
    name: 'TNPSC Group 1',
    line1: 'TNPSC',
    line2: 'Group 1',
    target: 'Deputy Collector, DSP, Commercial Tax Officer, etc.',
    duration: '6 months',
    icon: 'pillar',
    accent: 'green',
    summary:
      'The Academy’s most intensive programme, aimed at the Deputy Collector, Deputy Superintendent of Police and Commercial Tax Officer cadres.',
    highlights: [
      'Complete Tamil Nadu State Board syllabus coverage, Standards 6 to 12',
      'Tamil Nadu history, polity, geography and economy in depth',
      'Mains answer-writing practice with individual written feedback',
      'Interview and personality test guidance for candidates who clear mains',
    ],
    formValue: 'TNPSC Group 1',
  },
  {
    id: 'tnpsc-group-2',
    name: 'TNPSC Group 2 & 2A',
    line1: 'TNPSC',
    line2: 'Group 2 & 2A',
    target: 'Sub-Registrar, Municipal Commissioner, Assistants',
    duration: '3 months',
    icon: 'people',
    accent: 'violet',
    summary:
      'Preparation for the Group 2 and Group 2A interposts and non-interposts, covering both the preliminary and main written examinations.',
    highlights: [
      'General studies and aptitude as per the current TNPSC syllabus',
      'Tamil eligibility test preparation',
      'Descriptive paper practice for the Group 2 mains',
      'Previous-year question paper analysis, year by year',
    ],
    formValue: 'TNPSC Group 2',
  },
  {
    id: 'tnpsc-group-4',
    name: 'TNPSC Group 4',
    line1: 'TNPSC',
    line2: 'Group 4',
    target: 'Junior Assistant, Typist, Bill Collector',
    duration: '3 months, starting 21 October 2026',
    icon: 'ledger',
    accent: 'gold',
    summary:
      'The most accessible entry point into state government service, open to candidates who have completed higher secondary education.',
    highlights: [
      'General studies from Samacheer Kalvi textbooks',
      'Aptitude and mental ability shortcuts for the objective paper',
      'General Tamil / General English paper preparation',
      'Weekly revision tests on the chapters covered',
    ],
    formValue: 'TNPSC Group 4',
  },
  {
    id: 'tnpsc-vao',
    name: 'TNPSC VAO',
    line1: 'TNPSC',
    line2: 'Village Administrative Officer',
    target: 'Village Administrative Officer',
    duration: '3 months',
    icon: 'document',
    accent: 'gold',
    summary:
      'Focused coaching for the Village Administrative Officer post, including the rural administration component unique to this examination.',
    highlights: [
      'Village administration, land records and revenue basics',
      'General studies shared with the Group 4 syllabus',
      'Tamil language paper preparation',
      'Fortnightly mock tests in the VAO question pattern',
    ],
    formValue: 'TNPSC Group VAO',
  },
  {
    id: 'tnusrb-si',
    name: 'TNUSRB Sub-Inspector of Police',
    line1: 'TNUSRB',
    line2: 'Sub-Inspector of Police',
    target: 'Sub-Inspector of Police (SI)',
    duration: '3 months',
    icon: 'shield',
    accent: 'navy',
    summary:
      'Written examination coaching for the Tamil Nadu Uniformed Services Recruitment Board Sub-Inspector posts, with guidance on the physical and endurance stages.',
    highlights: [
      'General knowledge, psychology and aptitude papers',
      'Tamil Nadu police administration and current affairs',
      'Guidance on physical efficiency test standards and preparation',
      'Viva voce and certificate verification briefing',
    ],
    formValue: 'TNUSRB Sub-Inspector of Police',
  },
  {
    id: 'police-constable',
    name: 'Police Constable',
    line1: 'Police',
    line2: 'Constable (Grade II)',
    target: 'Tamil Nadu Uniformed Services Grade II Constable',
    duration: '3 months',
    icon: 'badge',
    accent: 'teal',
    summary:
      'Preparation for Grade II Police Constable, Jail Warder and Firemen recruitment conducted by TNUSRB.',
    highlights: [
      'General knowledge and psychology paper coaching',
      'Simple arithmetic and reasoning practice',
      'Physical measurement and endurance test guidance',
      'Previous-year papers solved in class',
    ],
    formValue: 'Police Constable',
  },
  {
    id: 'nda',
    name: 'National Defence Academy (NDA)',
    line1: 'NDA',
    line2: 'Army / Navy / Air Force',
    target: 'Army / Navy / Air Force Wings',
    duration: '3 months',
    icon: 'wings',
    accent: 'rose',
    summary:
      'For higher secondary students aiming at a commission through the National Defence Academy, covering the written examination and the SSB interview.',
    highlights: [
      'Mathematics paper coverage at the Standard 11 and 12 level',
      'General Ability Test: English, physics, chemistry and general awareness',
      'Introduction to the SSB five-day selection process',
      'Officer Like Qualities and personal interview preparation',
    ],
    formValue: 'NDA (Army / Navy / Airforce)',
  },
];

/** The four programmes featured on the home page. */
export const featuredCourseIds = ['upsc', 'tnpsc-group-1', 'tnpsc-group-2', 'tnpsc-group-4'];

export const featuredCourses = featuredCourseIds
  .map((id) => courses.find((course) => course.id === id))
  .filter((course): course is Course => Boolean(course));
