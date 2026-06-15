# Your CA Partner MVP

Static Vercel-ready site for the Your CA Partner ITR filing MVP.

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

## Client intake - Tally version

Pricing buttons now open the published Tally intake form directly with the selected plan passed in the URL:

- Basic: `https://tally.so/r/VLxDEN?plan=basic`
- Expert: `https://tally.so/r/VLxDEN?plan=expert`
- Full CA Support: `https://tally.so/r/VLxDEN?plan=ca`

Tally is connected to Google Sheets from the Tally dashboard, so the website no longer needs Resend, Vercel environment variables, Google Apps Script, or a custom form backend.

Files updated:

- `index.html` - pricing buttons now point to Tally.
- `client-intake.html` - kept only as a redirect fallback for any old links.

Clean-up from older versions:

- Delete `google-apps-script-leads-backend.js` from GitHub if it is still present.
- Delete `api/submit-intake.js` / `api` folder if it is still present.
- Remove Vercel environment variables `RESEND_API_KEY`, `INTAKE_TO_EMAIL`, and `INTAKE_FROM_EMAIL` if they were added only for Resend.

Current lead flow: Website pricing button → Tally form → Google Sheet → manual callback.
