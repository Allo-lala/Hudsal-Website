const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hadsul.co.uk';
const LOGO_URL = `${BASE_URL}/images/logo.png`;

const socialIcons = `
  <table cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="padding: 0 6px;">
        <a href="https://www.facebook.com/hadsulltd" target="_blank" style="text-decoration:none;">
          <img src="https://cdn-icons-png.flaticon.com/32/733/733547.png" width="28" height="28" alt="Facebook" style="display:block;border-radius:50%;" />
        </a>
      </td>
      <td style="padding: 0 6px;">
        <a href="https://x.com/hadsulltd" target="_blank" style="text-decoration:none;">
          <img src="https://cdn-icons-png.flaticon.com/32/5968/5968958.png" width="28" height="28" alt="X" style="display:block;border-radius:50%;" />
        </a>
      </td>
      <td style="padding: 0 6px;">
        <a href="https://www.instagram.com/hadsulltd" target="_blank" style="text-decoration:none;">
          <img src="https://cdn-icons-png.flaticon.com/32/2111/2111463.png" width="28" height="28" alt="Instagram" style="display:block;border-radius:50%;" />
        </a>
      </td>
      <td style="padding: 0 6px;">
        <a href="https://www.linkedin.com/company/hadsul" target="_blank" style="text-decoration:none;">
          <img src="https://cdn-icons-png.flaticon.com/32/733/733561.png" width="28" height="28" alt="LinkedIn" style="display:block;border-radius:50%;" />
        </a>
      </td>
    </tr>
  </table>
`;

export function emailHeader(bannerUrl?: string) {
  return `
    <!-- Header -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;">
      <tr>
        <td style="padding: 20px 32px; border-bottom: 1px solid #e5e7eb;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
                <a href="${BASE_URL}" style="text-decoration:none;">
                  <img src="${LOGO_URL}" alt="Hadsul" height="40" style="display:block;" />
                </a>
              </td>
              <td align="right">
                ${socialIcons}
              </td>
            </tr>
          </table>
        </td>
      </tr>
      ${bannerUrl ? `
      <tr>
        <td style="padding: 0;">
          <img src="${bannerUrl}" alt="Hadsul" width="100%" style="display:block; max-height:220px; object-fit:cover;" />
        </td>
      </tr>` : ''}
    </table>
  `;
}

export function emailFooter() {
  return `
    <!-- Footer -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f9fafb; border-top: 1px solid #e5e7eb;">
      <tr>
        <td style="padding: 28px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="width:80px; vertical-align:top; padding-right:16px;">
                <a href="${BASE_URL}">
                  <img src="${LOGO_URL}" alt="Hadsul" width="64" style="display:block; border-radius:8px;" />
                </a>
              </td>
              <td style="vertical-align:top;">
                <p style="margin:0 0 6px 0; color:#374151; font-size:13px; line-height:1.6;">
                  Hadsul Limited is a UK-based healthcare and business services company providing staffing, consultancy, CRM, and governance support to organisations across the UK.
                </p>
                <p style="margin:0; color:#9ca3af; font-size:12px;">
                  &copy; ${new Date().getFullYear()} Hadsul Limited. All rights reserved.
                </p>
              </td>
            </tr>
          </table>

          <!-- Social Icons -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;">
            <tr>
              <td align="center">
                ${socialIcons}
              </td>
            </tr>
          </table>

          <p style="text-align:center; color:#9ca3af; font-size:11px; margin:16px 0 0 0;">
            Hadsul Limited &bull; United Kingdom &bull;
            <a href="${BASE_URL}/privacy" style="color:#059669; text-decoration:none;">Privacy Policy</a> &bull;
            <a href="${BASE_URL}/terms" style="color:#059669; text-decoration:none;">Terms</a>
          </p>
        </td>
      </tr>
    </table>
  `;
}

export function emailWrapper(content: string, bannerUrl?: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Hadsul</title>
    </head>
    <body style="margin:0; padding:0; background:#f3f4f6; font-family: Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f3f4f6; padding: 32px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
              <tr><td>${emailHeader(bannerUrl)}</td></tr>
              <tr><td style="padding: 32px;">${content}</td></tr>
              <tr><td>${emailFooter()}</td></tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

// Reusable row for data tables
export function dataRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding: 8px 0; font-weight:bold; color:#374151; width:180px; vertical-align:top; font-size:14px;">${label}</td>
      <td style="padding: 8px 0; color:#1f2937; font-size:14px;">${value}</td>
    </tr>
  `;
}
