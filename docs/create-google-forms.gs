/**
 * ============================================================================
 *  TACSE — builds both Google Forms for the website in one go
 * ============================================================================
 *
 *  Run this ONCE, signed in as tacse.chitharal@gmail.com.
 *  The forms and the spreadsheet will then belong to that account.
 *
 *  1. Go to https://script.google.com and click "New project".
 *  2. Delete everything in the editor and paste this whole file in.
 *  3. Click the Save icon, then choose `createTacseForms` in the function list
 *     at the top and click "Run".
 *  4. Google asks for permission the first time. Click "Review permissions",
 *     choose tacse.chitharal@gmail.com, then "Advanced" →
 *     "Go to project (unsafe)" → "Allow". ("Unsafe" only means Google has not
 *     reviewed this script; it is your own script, running in your own account.)
 *  5. When the run finishes, open "Execution log" at the bottom. Copy
 *     everything between the two ===== COPY ===== lines and paste it into
 *     src/config/google-forms.ts in the website, replacing the two blocks
 *     there.
 *
 *  What it creates, in the Academy's Google Drive:
 *    - Form "Thiruvalluvar Academy – Online Application for Admission"
 *    - Form "TACSE – Enquiry"
 *    - Spreadsheet "TACSE Student Admissions" receiving admission responses
 *    - Spreadsheet "TACSE Enquiries" receiving enquiry responses
 *
 *  Run it only once. Running it again makes a second, separate set of forms.
 *
 *  The answer options below MUST match the website exactly — they are copied
 *  from src/data/courses.ts (formValue) and src/config/google-forms.ts. If you
 *  change an option on the website, change it in the Google Form too.
 */

var COURSE_OPTIONS = [
  'UPSC (Civil Services)',
  'SSC (Staff Selection Central Services)',
  'Banking Services',
  'TNPSC Group 1',
  'TNPSC Group 2',
  'TNPSC Group 4',
  'TNPSC Group VAO',
  'TNUSRB Sub-Inspector of Police',
  'Police Constable',
  'NDA (Army / Navy / Airforce)',
];

var QUALIFICATION_OPTIONS = [
  'Higher Secondary (+2)',
  'Under Graduate Degree',
  'Post Graduate Degree',
  'Other',
];

var FINANCIAL_AID_OPTIONS = ['No', 'Yes'];

var ENQUIRY_SUBJECTS = [
  'Admission enquiry',
  'Fee concession / financial aid',
  'Career counselling appointment',
  'Library and study material',
  'Something else',
];

function createTacseForms() {
  var admission = buildAdmissionForm_();
  var enquiry = buildEnquiryForm_();

  var lines = [];
  lines.push('');
  lines.push('===== COPY FROM THE NEXT LINE =====');
  lines.push(configBlock_('admissionForm', 'Online Application for Admission.', admission));
  lines.push('');
  lines.push(configBlock_('enquiryForm', 'General enquiry form shown on the Contact page.', enquiry));
  lines.push('===== COPY UP TO THE LINE ABOVE =====');
  lines.push('');
  lines.push('Admission form (to check it):  ' + admission.form.getPublishedUrl());
  lines.push('Admission responses sheet:     ' + admission.sheet.getUrl());
  lines.push('Enquiry form (to check it):    ' + enquiry.form.getPublishedUrl());
  lines.push('Enquiry responses sheet:       ' + enquiry.sheet.getUrl());
  lines.push('');
  lines.push('LAST STEP, by hand: open each form, go to Responses, click the three dots,');
  lines.push('and tick "Get email notifications for new responses".');

  Logger.log(lines.join('\n'));
}

/* ------------------------------------------------------------------------- */

function buildAdmissionForm_() {
  var form = FormApp.create('Thiruvalluvar Academy – Online Application for Admission');
  form.setDescription(
    'Thiruvalluvar Academy for Civil Service Exam (TACSE), Chitharal. ' +
      'Open to higher secondary (+2) and degree holders aspiring for public service.'
  );
  form.setConfirmationMessage(
    'Thank you. Your application has reached the Academy. A coordinator will telephone you, ' +
      'usually within three working days.'
  );

  // No question is marked "required" here on purpose. The website checks
  // required fields before sending; if Google also enforced them, a submission
  // the website accepted could be silently rejected by Google.
  var items = {
    fullName: form.addTextItem().setTitle('Full Name of the Candidate'),
    address: form.addParagraphTextItem().setTitle('Address for Communication'),
    mobile: form.addTextItem().setTitle('Mobile Number'),
    aadhaar: form.addTextItem().setTitle('Aadhar Number'),
    qualification: form
      .addListItem()
      .setTitle('Educational Qualification')
      .setChoiceValues(QUALIFICATION_OPTIONS),
    guardianName: form.addTextItem().setTitle('Father / Mother / Guardian Name'),
    guardianMobile: form.addTextItem().setTitle('Parent / Guardian Mobile Number'),
    guardianEmployment: form.addTextItem().setTitle('Employment Status of Parent / Guardian'),
    coachingFor: form
      .addCheckboxItem()
      .setTitle('Coaching Required For')
      .setChoiceValues(COURSE_OPTIONS),
    financialAid: form
      .addMultipleChoiceItem()
      .setTitle('Fee Concession Requested?')
      .setChoiceValues(FINANCIAL_AID_OPTIONS),
    financialAidReason: form
      .addParagraphTextItem()
      .setTitle('Reason for the fee concession request'),
  };

  var sheet = SpreadsheetApp.create('TACSE Student Admissions');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());
  publish_(form);

  return { form: form, sheet: sheet, entries: entryIds_(form, items) };
}

function buildEnquiryForm_() {
  var form = FormApp.create('TACSE – Enquiry');
  form.setDescription('Questions sent from the Contact page of the TACSE website.');
  form.setConfirmationMessage('Thank you. Your message has reached the Academy.');

  var items = {
    name: form.addTextItem().setTitle('Your Name'),
    mobile: form.addTextItem().setTitle('Mobile Number'),
    subject: form.addListItem().setTitle('Subject').setChoiceValues(ENQUIRY_SUBJECTS),
    message: form.addParagraphTextItem().setTitle('Your Message'),
  };

  var sheet = SpreadsheetApp.create('TACSE Enquiries');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());
  publish_(form);

  return { form: form, sheet: sheet, entries: entryIds_(form, items) };
}

/* ------------------------------------------------------------------------- */

/** Makes sure the form is live and accepting answers. */
function publish_(form) {
  form.setAcceptingResponses(true);
  // Newer Google Forms start as unpublished drafts. setPublished() only exists
  // on accounts that have that feature; where it does not, forms are live
  // already, so there is nothing to do.
  if (typeof form.setPublished === 'function') {
    form.setPublished(true);
  }
}

/**
 * Finds the `entry.NNNN` name of every question.
 *
 * Google does not expose these directly, but a pre-filled link contains them.
 * We build a pre-filled link with one question answered at a time, so each
 * link holds exactly one entry number and the match is unambiguous.
 */
function entryIds_(form, items) {
  var result = {};
  Object.keys(items).forEach(function (key) {
    // These are already typed questions (TextItem, ListItem, …) because they
    // came straight from addTextItem() etc., so createResponse() is called on
    // them directly. The asTextItem()-style converters exist only on the
    // generic Item that form.getItems() returns.
    var item = items[key];
    var answer;
    switch (item.getType()) {
      case FormApp.ItemType.TEXT:
      case FormApp.ItemType.PARAGRAPH_TEXT:
        answer = item.createResponse('x');
        break;
      case FormApp.ItemType.LIST:
      case FormApp.ItemType.MULTIPLE_CHOICE:
        answer = item.createResponse(item.getChoices()[0].getValue());
        break;
      case FormApp.ItemType.CHECKBOX:
        answer = item.createResponse([item.getChoices()[0].getValue()]);
        break;
      default:
        throw new Error('Unexpected question type for ' + key);
    }

    var url = form.createResponse().withItemResponse(answer).toPrefilledUrl();
    var match = url.match(/entry\.(\d+)=/);
    if (!match) throw new Error('Could not find the entry number for ' + key);
    result[key] = 'entry.' + match[1];
  });
  return result;
}

/** The long id in https://docs.google.com/forms/d/e/<ID>/viewform */
function publishedId_(form) {
  var match = form.getPublishedUrl().match(/\/d\/e\/([^/]+)\//);
  if (!match) throw new Error('Could not read the form id from ' + form.getPublishedUrl());
  return match[1];
}

/** Formats one block exactly as it appears in src/config/google-forms.ts. */
function configBlock_(name, comment, built) {
  var out = [];
  out.push('/** ' + comment + ' */');
  out.push('export const ' + name + ': GoogleFormConfig = {');
  out.push("  formId: '" + publishedId_(built.form) + "',");
  out.push('  entries: {');
  Object.keys(built.entries).forEach(function (key) {
    out.push('    ' + key + ": '" + built.entries[key] + "',");
  });
  out.push('  },');
  out.push('};');
  return out.join('\n');
}
