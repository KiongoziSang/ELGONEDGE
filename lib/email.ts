import "server-only";

import nodemailer from "nodemailer";

type ContactNotificationInput = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceInterest: string;
  message: string;
};

type ChatLeadNotificationInput = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  interestArea: string;
  message: string;
  source?: string;
  sourcePage?: string;
  timestamp: string;
};

function getSmtpPort() {
  const value = Number(process.env.SMTP_PORT || 587);
  return Number.isFinite(value) ? value : 587;
}

function isEmailConfigured() {
  return (
    process.env.CONTACT_EMAIL_NOTIFICATIONS !== "false" &&
    Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD)
  );
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendContactNotification(input: ContactNotificationInput) {
  if (!isEmailConfigured()) {
    console.warn("Contact notification email skipped: SMTP settings are not configured.");
    return;
  }

  const to = process.env.CONTACT_NOTIFICATION_TO || "elgonedge@gmail.com";
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: getSmtpPort(),
    secure: getSmtpPort() === 465,
    connectionTimeout: 3500,
    greetingTimeout: 3500,
    socketTimeout: 5000,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });

  const rows = [
    ["Name", input.name],
    ["Email", input.email],
    ["Phone", input.phone || "Not provided"],
    ["Company", input.company || "Not provided"],
    ["Service interest", input.serviceInterest],
    ["Message", input.message]
  ];

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;color:#475569;font-weight:700;width:160px;">${escapeHtml(label)}</td>
          <td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;color:#0f172a;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n\n");

  await transporter.sendMail({
    from,
    to,
    replyTo: input.email,
    subject: `New Elgon Edge enquiry: ${input.serviceInterest}`,
    text,
    html: `
      <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px;">
        <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:18px;overflow:hidden;">
          <div style="background:#07172f;color:#ffffff;padding:22px 24px;">
            <p style="margin:0;color:#7dd3fc;font-size:12px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;">Website enquiry</p>
            <h1 style="margin:8px 0 0;font-size:24px;line-height:1.25;">New contact form submission</h1>
          </div>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tbody>${htmlRows}</tbody>
          </table>
        </div>
      </div>`
  });
}

export async function sendChatLeadNotification(input: ChatLeadNotificationInput) {
  if (!isEmailConfigured()) {
    console.warn("Chat lead notification email skipped: SMTP settings are not configured.");
    return;
  }

  const to = process.env.CHAT_LEAD_NOTIFICATION_TO || process.env.CONTACT_NOTIFICATION_TO || "elgonedge@gmail.com";
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: getSmtpPort(),
    secure: getSmtpPort() === 465,
    connectionTimeout: 3500,
    greetingTimeout: 3500,
    socketTimeout: 5000,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });

  const rows = [
    ["Name", input.name],
    ["Email", input.email],
    ["Phone", input.phone || "Not provided"],
    ["Company / property", input.company || "Not provided"],
    ["Interest", input.interestArea],
    ["Source", input.source || "Website chat"],
    ["Page", input.sourcePage || "Not provided"],
    ["Timestamp", input.timestamp],
    ["Message", input.message]
  ];

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;color:#475569;font-weight:700;width:170px;">${escapeHtml(label)}</td>
          <td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;color:#0f172a;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n\n");

  await transporter.sendMail({
    from,
    to,
    replyTo: input.email,
    subject: `New chat lead: ${input.interestArea}`,
    text,
    html: `
      <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px;">
        <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:18px;overflow:hidden;">
          <div style="background:#07172f;color:#ffffff;padding:22px 24px;">
            <p style="margin:0;color:#7dd3fc;font-size:12px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;">Website chat lead</p>
            <h1 style="margin:8px 0 0;font-size:24px;line-height:1.25;">New live agent request</h1>
          </div>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tbody>${htmlRows}</tbody>
          </table>
        </div>
      </div>`
  });
}
