/**
 * Clarity Tax intake backend for Google Sheets.
 *
 * SETUP:
 * 1) Create a Google Sheet.
 * 2) Extensions → Apps Script.
 * 3) Paste this full file.
 * 4) Change TEAM_EMAIL if you want an internal notification email.
 * 5) Deploy → New deployment → Web app.
 *    Execute as: Me
 *    Who has access: Anyone
 * 6) Copy the Web App URL ending in /exec.
 * 7) Paste that URL into client-intake.html as GOOGLE_SCRIPT_URL.
 */

const SHEET_NAME = 'Leads';
const TEAM_EMAIL = ''; // Optional. Example: 'yourteam@gmail.com'. Leave blank to store only in Sheet.

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

    const headers = [
      'Received At', 'Reference ID', 'Plan', 'Plan Price', 'Name', 'WhatsApp', 'Email',
      'Location', 'Residential Status', 'Filing Year', 'Estimated Income', 'TDS / Tax Paid',
      'Income Types', 'Urgency', 'Callback Time', 'Case Notes', 'Consent', 'Page URL'
    ];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
    }

    const referenceId = data.referenceId || ('CLARITY-' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd-HHmmss'));

    sheet.appendRow([
      new Date(),
      referenceId,
      data.planName || data.plan || '',
      data.planPrice || '',
      data.name || '',
      data.phone || '',
      data.email || '',
      data.location || '',
      data.residency || '',
      data.filingYear || '',
      data.estimatedIncome || '',
      data.taxPaid || '',
      Array.isArray(data.incomeTypes) ? data.incomeTypes.join(', ') : (data.incomeTypes || ''),
      data.urgency || '',
      data.callbackTime || '',
      data.caseNotes || '',
      data.consent ? 'Yes' : 'No',
      data.pageUrl || ''
    ]);

    if (TEAM_EMAIL) {
      const subject = `New Clarity Tax Lead - ${data.planName || data.plan || 'Plan'} - ${referenceId}`;
      const body = `
        <h2>New Clarity Tax Lead</h2>
        <p><b>Reference ID:</b> ${referenceId}</p>
        <p><b>Plan:</b> ${data.planName || data.plan || ''} ${data.planPrice || ''}</p>
        <p><b>Name:</b> ${data.name || ''}</p>
        <p><b>WhatsApp:</b> ${data.phone || ''}</p>
        <p><b>Email:</b> ${data.email || ''}</p>
        <p><b>Location:</b> ${data.location || ''}</p>
        <p><b>Residential Status:</b> ${data.residency || ''}</p>
        <p><b>Filing Year:</b> ${data.filingYear || ''}</p>
        <p><b>Estimated Income:</b> ${data.estimatedIncome || ''}</p>
        <p><b>TDS / Tax Paid:</b> ${data.taxPaid || ''}</p>
        <p><b>Income Types:</b> ${Array.isArray(data.incomeTypes) ? data.incomeTypes.join(', ') : (data.incomeTypes || '')}</p>
        <p><b>Urgency:</b> ${data.urgency || ''}</p>
        <p><b>Callback Time:</b> ${data.callbackTime || ''}</p>
        <p><b>Case Notes:</b><br>${String(data.caseNotes || '').replace(/\n/g, '<br>')}</p>
      `;
      MailApp.sendEmail({ to: TEAM_EMAIL, subject, htmlBody: body });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, referenceId }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err && err.message ? err.message : err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('Clarity Tax intake endpoint is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}
