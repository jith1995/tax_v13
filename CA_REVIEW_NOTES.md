# CA Review Notes

This is a review/demo MVP. Please validate all tax logic before public use.

## Areas needing detailed review

- ITR form eligibility edge cases
- Old vs new regime deductions and exceptions
- 87A rebate treatment by income type and special-rate income
- Capital gains: equity, equity MF, debt MF, property, gold, ESOP/RSU, VDA, loss set-off, grandfathering/indexation/exemptions
- NRI day-count, DTAA, NRE/NRO treatment and TDS
- House property self-occupied vs let-out, co-ownership and home-loan interest restrictions

## Latest CA feedback update - Income-head-wise deductions

Updated the Tax Path Check MVP to separate income-head computation before common deductions:

- Salary now captures gross salary and professional tax separately.
- House property / rental now captures gross annual rent, municipal taxes actually paid, and home-loan interest on rented property.
- House property preview computes: gross rent minus municipal taxes = net annual value; less 30% standard deduction; less interest on borrowed capital = taxable house property income.
- FD / bank interest is now under Income from Other Sources, not Capital Gains.
- Common deductions are kept separate in Step 4 after income-head computation.
- Review now shows an income-head-wise breakdown before old/new regime tax calculation.

CA review pending items:
- Final treatment of house property loss set-off and carry forward.
- New regime treatment for house property interest and loss set-off.
- HRA and 80GG eligibility logic.
- Professional tax treatment across regimes and state-wise limits.
- Capital gains detailed set-off rules and Schedule CG validation.


## Latest UX structure

The detailed Tax Path Check is now on `tax-tool.html`, separate from the homepage. The homepage remains a preview and content/SEO landing page.


## NRI module added

Separate `nri-tax-tool.html` page added. It estimates residency status based on day-count inputs, captures Indian income, foreign income, NRE/NRO interest, TDS in India, foreign tax paid, and flags DTAA / foreign tax credit cases for CA review. Internal logic remains preview-only and should be validated before public filing use.

## View calculation UX update

Added expandable `View calculation` panels in the main Tax Path Check and NRI tool. These are explanatory UI panels only; the underlying tax computations remain preview logic and require CA validation before production use.

## Foreign tax credit preview fix

NRI tool now includes a preview-only foreign tax credit adjustment:

- Indian tax before FTC is computed on total taxable income.
- Indian tax without included foreign income is computed separately.
- Indian tax attributable to foreign income = Indian tax before FTC minus Indian tax without foreign income.
- FTC preview = lower of foreign tax paid entered and Indian tax attributable to included foreign income.
- Final payable preview = Indian tax after FTC minus Indian TDS / tax paid in India.

CA review still required for DTAA article-level treatment, Form 67 / FTC documentation, country-specific limits, source rules and proof validation.


## Final touch update

User-facing site copy now uses NRI across the site. Calculator inputs now format large values with Indian comma grouping. Both the main calculator and NRI calculator show an estimate-only note prompting detailed CA consultation through the pricing plans.


## Client intake trial added - Google Sheet version

A new `client-intake.html` page collects customer details after plan selection. It intentionally does not collect document uploads. It captures contact details, residential status, income types, estimated income, tax paid/TDS, urgency, callback preference and free-form case notes.

The Resend email route has been removed for the MVP. Leads should now be stored through a Google Apps Script Web App connected to a Google Sheet. Optional internal email notification can be enabled in the Apps Script backend, but the primary lead record is the Sheet row.

Before go-live, test that every plan button creates a row in the Google Sheet and that consent wording is acceptable for team follow-up.
