# Connecting the website to Google Forms

The website shows its own application form, but every submission is posted into
a Google Form. That means:

- responses land in a Google Sheet you can sort, filter and print;
- you get an e-mail the moment somebody applies;
- there is no server to pay for, maintain or secure;
- students see the Academy's own page rather than a Google-branded one.

This is a one-time setup. Do it once and you never have to touch it again.

---

## Before you begin

Everything below is done signed in to the Academy's own Google account,
**`tacse.chitharal@gmail.com`**. Whichever account creates the forms owns them,
owns the spreadsheet of applications, and receives the e-mail alerts — so do not
use a personal account. If you use several Google accounts in the same browser,
check the round picture in the top-right corner shows the TACSE account before
you start.

---

## The fast way — let a script build both forms (about 5 minutes)

`docs/create-google-forms.gs` creates both forms with exactly the right
questions and options, links each to its own spreadsheet, and prints the block
to paste into the website. It avoids typing errors in the checkbox options,
which are the most common reason answers go missing.

1. Signed in as `tacse.chitharal@gmail.com`, go to
   <https://script.google.com> and click **New project**.
2. Delete what is in the editor. Open `docs/create-google-forms.gs` from this
   project in Notepad, copy all of it, and paste it in.
3. Click the **Save** icon. In the function list at the top, choose
   **createTacseForms**, then click **Run**.
4. The first time, Google asks for permission:
   **Review permissions** → choose **tacse.chitharal@gmail.com** →
   **Advanced** → **Go to Untitled project (unsafe)** → **Allow**.
   ("Unsafe" only means Google has not reviewed this script. It is your own
   script, running only in your own account.)
5. When it finishes, open the **Execution log** at the bottom. Copy everything
   between `===== COPY FROM THE NEXT LINE =====` and
   `===== COPY UP TO THE LINE ABOVE =====`.
6. In the website, open `src/config/google-forms.ts` and replace the two blocks
   `export const admissionForm …` and `export const enquiryForm …` with what you
   copied.
7. Last step, by hand: open each of the two new forms in
   <https://forms.google.com>, go to **Responses**, click the three dots **⋮**
   and tick **Get email notifications for new responses**.

Then go straight to **Part 5 — Test it** below.

**Run the script only once.** Running it again creates a second, separate pair
of forms. If that happens, delete the extra forms and spreadsheets from Google
Drive and keep the set whose ids are in `src/config/google-forms.ts`.

---

## The manual way

If you would rather build the forms by hand, or the script cannot run, follow
Parts 1 to 4. The result is the same.

---

## Part 1 — Create the admission form

1. Go to <https://forms.google.com> and click **Blank form**.
2. Title it: **Thiruvalluvar Academy – Online Application for Admission**
3. Add the questions below, in this order. The **type** matters; the exact
   wording of the title does not, except for the checkbox options in question 9,
   which must match the website character for character.

| # | Question title | Type | Required | Notes |
|---|---|---|---|---|
| 1 | Full Name of the Candidate | Short answer | Yes | |
| 2 | Address for Communication | Paragraph | Yes | |
| 3 | Mobile Number | Short answer | Yes | |
| 4 | Aadhar Number | Short answer | Yes | |
| 5 | Educational Qualification | Dropdown | Yes | Options below |
| 6 | Father / Mother / Guardian Name | Short answer | Yes | |
| 7 | Parent / Guardian Mobile Number | Short answer | No | |
| 8 | Employment Status of Parent / Guardian | Short answer | Yes | |
| 9 | Coaching Required For | Checkboxes | Yes | Options below |
| 10 | Fee Concession Requested? | Multiple choice | Yes | `No`, `Yes` |
| 11 | Reason for the fee concession request | Paragraph | No | |

**Question 5 options** — type these exactly:

```
Higher Secondary (+2)
Under Graduate Degree
Post Graduate Degree
Other
```

**Question 9 options** — type these exactly. They must match `formValue` in
`src/data/courses.ts`, or Google silently discards the answer:

```
UPSC (Civil Services)
SSC (Staff Selection Central Services)
Banking Services
TNPSC Group 1
TNPSC Group 2
TNPSC Group 4
TNPSC Group VAO
TNUSRB Sub-Inspector of Police
Police Constable
NDA (Army / Navy / Airforce)
```

> **Do not make any question "required" in Google itself.** The website already
> checks required fields before sending, with friendlier messages in context.
> If Google also enforces them, a submission that our page accepted could be
> rejected on Google's side, and because of how the connection works we would
> never find out. Let the website do the checking.

### Turn on the spreadsheet and the e-mail alert

4. Open the **Responses** tab.
5. Click the green **Sheets** icon and create a spreadsheet named
   **TACSE Student Admissions**.
6. Click the three dots **⋮** and tick
   **Get email notifications for new responses**.

---

## Part 2 — Collect the identifiers

You need two things: the form's id, and one `entry.NNNNNNNNN` number per
question.

### The form id

Click **Send**, choose the link icon 🔗, and copy the link. It looks like:

```
https://docs.google.com/forms/d/e/1FAIpQLSdXXXXXXXXXXXXXXXXXXXXXXXXXXX/viewform
                                  └──────────── this part ────────────┘
```

That middle portion is the form id.

### The entry numbers — the quick way

1. Open the form for editing.
2. Click the three dots **⋮** at the top right → **Get pre-filled link**.
3. Fill in every box with a word you will recognise: type `one` in the first
   question, `two` in the second, and so on. Tick one checkbox, choose one
   dropdown option.
4. Click **Get link**, then **Copy link**.
5. Paste it into a text editor. You will see something like:

```
...viewform?usp=pp_url&entry.1234567890=one&entry.9876543210=two&entry.5555555555=three
             ^^^^^^^^^^^^^^^^^           ^^^^^^^^^^^^^^^^^
```

Each `entry.NNNNNNNNN` sits immediately before the word you typed, so you can
match every number to its question.

### The entry numbers — the slower way

Open the live form, right-click the page, choose **View page source**, press
Ctrl+F and search for a question's wording. The `entry.NNNNNNNNN` appears just
before it.

---

## Part 3 — Put them into the website

Open `src/config/google-forms.ts` and fill in `admissionForm`:

```ts
export const admissionForm: GoogleFormConfig = {
  formId: '1FAIpQLSdXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  entries: {
    fullName: 'entry.1234567890',
    address: 'entry.9876543210',
    mobile: 'entry.5555555555',
    aadhaar: 'entry.4444444444',
    qualification: 'entry.3333333333',
    guardianName: 'entry.2222222222',
    guardianEmployment: 'entry.1111111111',
    guardianMobile: 'entry.6666666666',
    coachingFor: 'entry.7777777777',
    financialAid: 'entry.8888888888',
    financialAidReason: 'entry.9999999999',
  },
};
```

Save the file. The orange "Setup step remaining" notice on the Apply page
disappears as soon as a form id and at least one entry number are present.

---

## Part 4 — The enquiry form (optional but recommended)

Repeat the same process for the Contact page's message box. Create a second
form titled **TACSE – Enquiry**, with four questions:

| Question title | Type |
|---|---|
| Your Name | Short answer |
| Mobile Number | Short answer |
| Subject | Dropdown |
| Your Message | Paragraph |

**Subject options** — exactly these:

```
Admission enquiry
Fee concession / financial aid
Career counselling appointment
Library and study material
Something else
```

Then fill in the `enquiryForm` block in the same config file.

If you skip this, the Contact page still works perfectly — it simply shows the
telephone number and e-mail address instead of a message box.

---

## Part 5 — Test it

1. Run the site locally:

   ```bash
   npm run dev
   ```

2. Open <http://localhost:4321/apply/> and submit an application using your own
   name and mobile number.
3. Open the **TACSE Student Admissions** spreadsheet. Your test row should be
   there within a few seconds.
4. Check that the e-mail notification arrived.
5. Delete the test row from the spreadsheet.

**Test again after you publish the site**, from the real address and ideally
from a phone. Submitting once in earnest is the only way to be certain.

---

## Things worth knowing

**Why this does not use an iframe.** Google's own embedded form works, but it
cannot be styled, it sits awkwardly on small screens, and it takes students to
a Google-branded confirmation page. Posting the answers ourselves keeps the
student inside the Academy's site from start to finish.

**Why we cannot read Google's reply.** Google does not allow another website to
read the response to this request. The browser confirms the request was *sent*,
but not what Google *did* with it. This is why:

- the website validates thoroughly before sending;
- the confirmation screen always shows the Academy's phone number;
- you should do the live test in Part 5 after publishing.

**If you change a question in the Google Form.** Editing a question's *wording*
is safe. Deleting a question and adding a new one gives it a **new entry
number** — you must update `src/config/google-forms.ts` to match, or that
answer will stop arriving. Adding or removing a checkbox option means updating
`formValue` in `src/data/courses.ts` too.

**Keep the responses private.** Do not share the spreadsheet link publicly. It
contains Aadhaar numbers, addresses and family circumstances. Share it only
with the trustees who need it, through Google Sheets' own sharing, and never by
making it "anyone with the link".

**Aadhaar numbers.** Collect them only because admission verification needs
them, keep the spreadsheet restricted, and do not copy the numbers into any
other document, spreadsheet or message.
