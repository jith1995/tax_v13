# Clarity Tax MVP

Static Vercel-ready site for the Clarity ITR filing MVP.

## Structure

- `index.html` - homepage and interactive tax path tool
- `articles/` - SEO guide pages
- `assets/article.css` - shared article page styling
- `vercel.json` - static deployment config

Upload all files to the root of your GitHub repo and connect to Vercel.

## Update: Income-head-wise computation

The live tax tool now separates income-head calculations before applying common deductions. This is to reflect CA feedback that salary, house property, capital gains and other sources have different deduction mechanics.

Key addition: rental income is calculated under House Property using gross rent, municipal taxes, 30% standard deduction and home-loan interest inputs.


## Split page update

The homepage (`index.html`) is now a clean landing page with preview cards and SEO content. The full working wizard has moved to `tax-tool.html`. Keep both files in the repo root for Vercel.


## NRI tax tool

A separate `nri-tax-tool.html` page has been added for cross-border cases: residency day-count, Indian income, foreign income, NRE/NRO interest, DTAA and foreign tax paid review flags.

## View calculation UX update

The review screens now include `View calculation` buttons beside major tax numbers. Users can expand them to see the exact mini-breakdown behind the value, including house-property computation, foreign income inclusion, slab tax, rebate, cess and refund/payable logic.

## Foreign tax credit preview fix

The NRI tool now uses the entered foreign tax paid as a preview credit when foreign income is included in Indian taxable income. The preview credit is capped at the lower of foreign tax paid and the Indian tax attributable to the included foreign income.


## Final touch update

- User-facing wording updated to NRI across the site.
- Added comma formatting inside calculator inputs, for example 10000 displays as 10,000.
- Added estimate-only consultation CTA below the calculators.
- Added `nri-tax-tool.html`; the old `global-indians-tax-tool.html` is kept as a redirect so old links do not break.


## Client intake trial - Google Sheet version

Pricing buttons open `client-intake.html` with the selected plan in the URL:

- Basic: `client-intake.html?plan=basic`
- Expert: `client-intake.html?plan=expert`
- Full CA Support: `client-intake.html?plan=ca`

This version removes the Resend email dependency. The form submits to a Google Apps Script Web App, which stores each lead in a Google Sheet. Optional internal email notification can be enabled inside the Apps Script file using `MailApp`.

Files added/updated:

- `client-intake.html` - branded intake form
- `google-apps-script-leads-backend.js` - copy/paste backend for Google Sheets

Setup:

1. Create a Google Sheet named something like `Clarity Tax Leads`.
2. Open Extensions → Apps Script.
3. Paste the contents of `google-apps-script-leads-backend.js`.
4. Deploy as Web App: Execute as `Me`; access `Anyone`.
5. Copy the Web App URL ending in `/exec`.
6. Paste it into `client-intake.html` as `GOOGLE_SCRIPT_URL`.
7. Redeploy the website.

Remove from the older Resend version:

- Delete `api/submit-intake.js` / `api` folder.
- Remove Vercel environment variables `RESEND_API_KEY`, `INTAKE_TO_EMAIL`, and `INTAKE_FROM_EMAIL` if they were added only for Resend.

The form remains platform-neutral. If the site later moves away from Vercel, only the form endpoint needs to change.
