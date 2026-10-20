/**
 * Posts our own styled forms into a Google Form.
 *
 * A Google Form accepts a plain POST of `entry.NNNN` values on its
 * `/formResponse` endpoint — the same request the Google-hosted page makes.
 * Google does not send CORS headers back, so we submit with `mode: 'no-cors'`
 * and get an opaque response: the browser tells us the request went out, but
 * never what Google replied.
 *
 * That shapes two deliberate decisions:
 *
 *  1. Everything that can be checked, we check *before* sending — required
 *     fields, mobile-number length, at least one programme selected — because
 *     after sending there is no answer to read.
 *
 *  2. The confirmation screen always shows the applicant their reference
 *     details and the Academy's phone number, so a submission that somehow
 *     failed on Google's side still has a human path to recovery.
 */

type Status = 'idle' | 'sending' | 'sent' | 'error';

const TIMEOUT_MS = 20000;

function setStatus(form: HTMLFormElement, status: Status) {
  const root = form.closest('[data-google-form-root]') ?? form.parentElement;
  root?.setAttribute('data-status', status);
}

function showPanel(form: HTMLFormElement, name: 'success' | 'error', message?: string) {
  const root = form.closest('[data-google-form-root]');
  const panel = root?.querySelector<HTMLElement>(`[data-panel="${name}"]`);
  if (!panel) return;

  if (message) {
    const slot = panel.querySelector<HTMLElement>('[data-message]');
    if (slot) slot.textContent = message;
  }

  panel.hidden = false;
  panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  panel.querySelector<HTMLElement>('[tabindex="-1"]')?.focus();
}

function hidePanels(form: HTMLFormElement) {
  const root = form.closest('[data-google-form-root]');
  root?.querySelectorAll<HTMLElement>('[data-panel]').forEach((panel) => {
    panel.hidden = true;
  });
}

/** Clears the message under a field, or writes a new one. */
function setFieldError(field: HTMLElement, message: string | null) {
  const wrapper = field.closest('[data-field]');
  const slot = wrapper?.querySelector<HTMLElement>('[data-field-error]');
  if (!slot) return;

  slot.textContent = message ?? '';
  slot.hidden = !message;
  wrapper?.toggleAttribute('data-invalid', Boolean(message));
}

/**
 * Validates the parts the browser cannot: a checkbox group that needs at
 * least one tick, and the digit counts for Aadhaar and mobile numbers.
 */
function validateGroups(form: HTMLFormElement): boolean {
  const invalid: HTMLElement[] = [];

  for (const group of form.querySelectorAll<HTMLElement>('[data-required-group]')) {
    const ok = group.querySelectorAll<HTMLInputElement>('input:checked').length > 0;
    setFieldError(group, ok ? null : 'Please choose at least one option.');
    if (!ok) invalid.push(group);
  }

  for (const input of form.querySelectorAll<HTMLInputElement>('[data-digits]')) {
    const expected = Number(input.dataset.digits);
    const digits = input.value.replace(/\D/g, '');

    // An empty optional field is fine; `required` is the browser's job.
    if (!input.value.trim()) {
      setFieldError(input, null);
      continue;
    }

    const ok = digits.length === expected;
    setFieldError(input, ok ? null : `Please enter all ${expected} digits.`);
    if (!ok) invalid.push(input);
  }

  const first = invalid[0];
  if (!first) return true;

  // Take the student straight to the first problem, and put the cursor in it.
  first.scrollIntoView({ behavior: 'smooth', block: 'center' });
  const focusTarget =
    first instanceof HTMLInputElement ? first : first.querySelector<HTMLInputElement>('input');
  focusTarget?.focus({ preventScroll: true });

  return false;
}

/** Drops empty values and the honeypot, so Google only sees real answers. */
function buildPayload(form: HTMLFormElement): URLSearchParams {
  const params = new URLSearchParams();

  for (const [key, value] of new FormData(form).entries()) {
    if (typeof value !== 'string') continue;
    if (!key.startsWith('entry.')) continue; // skips the honeypot and any UI-only field
    if (!value.trim()) continue;
    params.append(key, value);
  }

  return params;
}

function wire(form: HTMLFormElement) {
  // Two form components on one page would each call initGoogleForms(), which
  // would otherwise attach a second submit handler and post twice.
  if (form.dataset.wired === 'true') return;
  form.dataset.wired = 'true';

  const submitButton = form.querySelector<HTMLButtonElement>('[data-submit]');
  const submitLabel = submitButton?.querySelector<HTMLElement>('[data-submit-label]');
  const originalLabel = submitLabel?.textContent ?? 'Submit';

  // Clear a field's error as soon as the student starts fixing it.
  form.addEventListener('input', (event) => {
    const target = event.target as HTMLElement;
    if (target.closest('[data-field]')) setFieldError(target, null);
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    hidePanels(form);

    if (!form.reportValidity() || !validateGroups(form)) return;

    // The honeypot is invisible to people and irresistible to bots.
    const honeypot = form.querySelector<HTMLInputElement>('input[name="website"]');
    if (honeypot?.value) {
      showPanel(form, 'success');
      form.hidden = true;
      return;
    }

    // Read these at submit time rather than at wire time, so the values always
    // reflect the current markup.
    const endpoint = form.dataset.endpoint ?? '';
    const configured = form.dataset.configured === 'true';

    if (!configured) {
      showPanel(
        form,
        'error',
        'This form has not been connected to the Academy’s Google Form yet. Please telephone the Academy, or try again later.',
      );
      return;
    }

    setStatus(form, 'sending');
    if (submitButton) submitButton.disabled = true;
    if (submitLabel) submitLabel.textContent = 'Sending…';

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: buildPayload(form).toString(),
        signal: controller.signal,
      });

      setStatus(form, 'sent');
      form.hidden = true;
      showPanel(form, 'success');
      form.reset();
    } catch {
      setStatus(form, 'error');
      showPanel(
        form,
        'error',
        'We could not reach Google just now. Please check your internet connection and try again, or use the direct form link below.',
      );
    } finally {
      window.clearTimeout(timer);
      if (submitButton) submitButton.disabled = false;
      if (submitLabel) submitLabel.textContent = originalLabel;
    }
  });
}

export function initGoogleForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-google-form]').forEach(wire);
}
