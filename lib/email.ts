import nodemailer from "nodemailer";

export interface SendEmailOptions {
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail({
  to,
  replyTo,
  subject,
  text,
  html,
}: SendEmailOptions) {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from =
    process.env.SMTP_FROM ||
    (user ? `"Omar & Partners" <${user}>` : `"Omar & Partners" <info@onp-bd.com>`);

  if (!user || !pass) {
    console.warn(
      "[SMTP Warning] SMTP_USER or SMTP_PASS is missing in .env.local. Email dispatch was skipped."
    );
    return {
      success: false,
      notConfigured: true,
      error:
        "SMTP credentials are not configured on the server. Please set SMTP_USER and SMTP_PASS in .env.local.",
    };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  const result = await transporter.sendMail({
    from,
    to,
    replyTo,
    subject,
    text,
    html: html || text.replace(/\n/g, "<br/>"),
  });

  return {
    success: true,
    messageId: result.messageId,
  };
}
