import nodemailer from "nodemailer";

export interface SendEmailOptions {
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html?: string;
  templateParams?: {
    name?: string;
    email?: string;
    company?: string;
    subject?: string;
    message?: string;
    [key: string]: unknown;
  };
}

export async function sendEmail({
  to,
  replyTo,
  subject,
  text,
  html,
  templateParams,
}: SendEmailOptions) {
  // ── 1. Check for EmailJS configuration ────────────────────────────────
  const emailjsServiceId = process.env.EMAILJS_SERVICE_ID;
  const emailjsTemplateId = process.env.EMAILJS_TEMPLATE_ID;
  const emailjsPublicKey = process.env.EMAILJS_PUBLIC_KEY;
  const emailjsPrivateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (emailjsServiceId && emailjsTemplateId && emailjsPublicKey) {
    try {
      const payload: Record<string, unknown> = {
        service_id: emailjsServiceId,
        template_id: emailjsTemplateId,
        user_id: emailjsPublicKey,
        template_params: {
          to_email: to,
          reply_to: replyTo,
          subject,
          ...(templateParams || {}),
        },
      };

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (emailjsPrivateKey) {
        payload.accessToken = emailjsPrivateKey;
        headers["Authorization"] = `Bearer ${emailjsPrivateKey}`;
      }

      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("[EmailJS Dispatch Error]", res.status, errorText);
        return {
          success: false,
          error: `EmailJS error (${res.status}): ${errorText}`,
        };
      }

      return {
        success: true,
        provider: "emailjs",
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to dispatch email via EmailJS.";
      console.error("[EmailJS Exception]", err);
      return { success: false, error: msg };
    }
  }

  // ── 2. Fall back to standard SMTP (Nodemailer) ─────────────────────────
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from =
    process.env.SMTP_FROM ||
    (user ? `"Omar & Partners" <${user}>` : `"Omar & Partners" <${to}>`);

  if (!user || !pass) {
    console.warn(
      "[Email Notice] Neither EmailJS (EMAILJS_SERVICE_ID) nor SMTP (SMTP_USER/SMTP_PASS) is configured in environment variables. Email was recorded but not delivered."
    );
    return {
      success: false,
      notConfigured: true,
      error:
        "Email delivery service is not configured on the server. Please set EmailJS or SMTP credentials in .env.local.",
    };
  }

  try {
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
      provider: "smtp",
      messageId: result.messageId,
    };
  } catch (smtpErr: unknown) {
    const msg = smtpErr instanceof Error ? smtpErr.message : "Failed to send email via SMTP.";
    console.error("[SMTP Exception]", smtpErr);
    return { success: false, error: msg };
  }
}
