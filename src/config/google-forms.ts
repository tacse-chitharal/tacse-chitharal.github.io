/**
 * ===========================================================================
 *  GOOGLE FORMS CONNECTION
 * ===========================================================================
 *
 *  The website shows its own styled forms, but every submission is posted
 *  straight into a Google Form, so the answers land in the linked Google
 *  Sheet and trigger the e-mail notification exactly as they would if the
 *  student had filled the Google Form directly.
 *
 *  Nothing here is secret. These identifiers are public by design — a Google
 *  Form accepts responses from anyone who has the link.
 *
 *  ---------------------------------------------------------------------
 *  HOW TO FILL THIS IN  (about ten minutes, once)
 *  ---------------------------------------------------------------------
 *
 *  1. Build the Google Form first, with the questions listed in
 *     `docs/GOOGLE-FORMS-SETUP.md`. Question order does not matter.
 *     "Coaching Required For" must be a Paragraph (text) question: the
 *     website sends the chosen courses as one line of text, so courses can be
 *     added or renamed in the admin dashboard without touching the form.
 *
 *  2. Open the form, click "Send", choose the link icon, and copy the link.
 *     It looks like:
 *
 *         https://docs.google.com/forms/d/e/1FAIpQLSd.....xyz/viewform
 *                                          ^^^^^^^^^^^^^^^^^^
 *     Copy that middle portion into `formId` below.
 *
 *  3. Now collect one `entry.NNNNNNNNN` number per question:
 *
 *       a. Open the live form (the /viewform link) in your browser.
 *       b. Right-click anywhere on the page and choose "View page source".
 *       c. Press Ctrl+F and search for the question's exact wording,
 *          e.g. "Full Name of the Candidate".
 *       d. Just before it you will see something like
 *          "entry.1234567890". That whole string is the field name.
 *       e. Paste it against the matching key below.
 *
 *     A faster alternative: open the form, click the three dots and choose
 *     "Get pre-filled link", type a recognisable word into every box
 *     (test1, test2, test3...), click "Get link" and copy it. The resulting
 *     URL lists every entry number next to the word you typed.
 *
 *  4. Save this file. Run `npm run dev`, submit a test application, and
 *     check that the row appears in the Google Sheet.
 *
 *  Until `formId` is filled in, the forms on the site stay fully visible but
 *  refuse to submit and show a clear notice instead, so a half-finished
 *  setup can never swallow a real student's application silently.
 */

export type GoogleFormConfig = {
  /** The long id from the form's /d/e/<ID>/viewform link. */
  formId: string;
  /** Maps a field on our website to its `entry.NNNN` name in the Google Form. */
  entries: Record<string, string>;
};

/** Online Application for Admission. */
export const admissionForm: GoogleFormConfig = {
  formId: '1FAIpQLScC8owY2y7PW9lSMvP3qJrNMTebeciipFeYLkleLiQ6vG59aA',
  entries: {
    fullName: 'entry.663879250',
    address: 'entry.2127977761',
    mobile: 'entry.1741623282',
    aadhaar: 'entry.817669528',
    qualification: 'entry.883169915',
    guardianName: 'entry.1296889842',
    guardianMobile: 'entry.1450749784',
    guardianEmployment: 'entry.1054063434',
    coachingFor: 'entry.377931305',
    financialAid: 'entry.919502098',
    financialAidReason: 'entry.96250775',
  },
};

/** General enquiry form shown on the Contact page. */
export const enquiryForm: GoogleFormConfig = {
  formId: '1FAIpQLSf1XcMsm6m9ZnhlOFl87ZtUUCKIuDdmNWCj9_5hlLQ5UZG4eg',
  entries: {
    name: 'entry.1719733077',
    mobile: 'entry.1073600230',
    subject: 'entry.1404832735',
    message: 'entry.1950891973',
  },
};

/** The endpoint a Google Form accepts POSTed answers on. */
export function formActionUrl(form: GoogleFormConfig): string {
  return `https://docs.google.com/forms/d/e/${form.formId}/formResponse`;
}

/** The public link a student can open to fill the Google Form directly. */
export function formViewUrl(form: GoogleFormConfig): string {
  return `https://docs.google.com/forms/d/e/${form.formId}/viewform`;
}

/** True once the form has an id and at least one mapped field. */
export function isConfigured(form: GoogleFormConfig): boolean {
  return (
    form.formId.trim().length > 0 &&
    Object.values(form.entries).some((entry) => entry.trim().length > 0)
  );
}

/** Educational qualification options — must match the Google Form dropdown. */
export const qualificationOptions = [
  'Higher Secondary (+2)',
  'Under Graduate Degree',
  'Post Graduate Degree',
  'Other',
];

/** Fee concession options — must match the Google Form choices. */
export const financialAidOptions = ['No', 'Yes'];

/** Enquiry subjects — must match the Google Form dropdown. */
export const enquirySubjects = [
  'Admission enquiry',
  'Fee concession / financial aid',
  'Career counselling appointment',
  'Library and study material',
  'Something else',
];
