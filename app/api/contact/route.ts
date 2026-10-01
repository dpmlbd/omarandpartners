import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email";

export const runtime = "nodejs";

const ALLOWED_COMPANIES = [
  "Omar & Partners",
  "Kolpoporishor",
  "Kolpoporisor",
  "Kolpokowsol",
  "INEX",
] as const;

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email address cannot exceed 255 characters"),
  company: z.enum(ALLOWED_COMPANIES, {
    message: "Please select a valid inquiry destination",
  }),
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject cannot exceed 200 characters"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message cannot exceed 5000 characters"),
});

export const PRIMARY_CONTACT_EMAIL = "info@onp-bd.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (typeof path === "string") {
          fieldErrors[path] = issue.message;
        }
      });
      return NextResponse.json(
        { success: false, errors: fieldErrors, message: "Validation failed" },
        { status: 400 }
      );
    }

    const { name, email, company, subject, message } = result.data;
    const recipientEmail = PRIMARY_CONTACT_EMAIL;

    const formattedSubject = `[Inquiry - ${company}] ${subject}`;

    const textContent = `
NEW INQUIRY RECEIVED VIA WEBSITE
------------------------------------------------
Inquiry Destination: ${company} (Routed to: ${recipientEmail})
From: ${name} <${email}>
Subject: ${subject}
Date: ${new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })} (BST)

MESSAGE:
${message}

------------------------------------------------
Omar & Partners Holding Ecosystem
13/A SS Khaled Road, Kazir Dewri, Chattogram
`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f7f7; color: #1c1917; margin: 0; padding: 24px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e7e5e4; border-radius: 4px; overflow: hidden; }
    .header { background: #0c0a09; color: #ffffff; padding: 28px 32px; border-bottom: 2px solid #b45309; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }
    .badge { display: inline-block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #d97706; margin-top: 6px; font-weight: 600; }
    .content { padding: 32px; }
    .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .meta-table td { padding: 8px 0; border-bottom: 1px solid #f5f5f4; font-size: 14px; }
    .meta-table td.label { width: 130px; color: #78716c; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; font-weight: 600; }
    .meta-table td.value { color: #1c1917; font-weight: 500; }
    .message-box { background: #fafaf9; border-left: 3px solid #b45309; padding: 18px 20px; font-size: 14px; line-height: 1.6; color: #292524; white-space: pre-wrap; margin-top: 12px; }
    .footer { padding: 20px 32px; background: #f5f5f4; font-size: 12px; color: #78716c; text-align: center; border-top: 1px solid #e7e5e4; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>New Website Inquiry</h1>
      <div class="badge">Ecosystem Division: ${company}</div>
    </div>
    <div class="content">
      <table class="meta-table">
        <tr>
          <td class="label">From</td>
          <td class="value"><strong>${name}</strong> &lt;<a href="mailto:${email}" style="color:#b45309;text-decoration:none;">${email}</a>&gt;</td>
        </tr>
        <tr>
          <td class="label">Division</td>
          <td class="value"><strong>${company}</strong></td>
        </tr>
        <tr>
          <td class="label">Destination</td>
          <td class="value">${recipientEmail}</td>
        </tr>
        <tr>
          <td class="label">Subject</td>
          <td class="value">${subject}</td>
        </tr>
      </table>

      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #78716c; font-weight: 600; margin-top: 18px;">
        Message Content:
      </div>
      <div class="message-box">${message}</div>
    </div>
    <div class="footer">
      Sent via Omar &amp; Partners Contact Portal &bull; You can reply directly to this email to contact ${name}.
    </div>
  </div>
</body>
</html>
`;

    // Dispatch via Email service (EmailJS or SMTP)
    const emailResult = await sendEmail({
      to: recipientEmail,
      replyTo: email,
      subject: formattedSubject,
      text: textContent,
      html: htmlContent,
      templateParams: {
        to_email: recipientEmail,
        from_name: name,
        name,
        from_email: email,
        email,
        reply_to: email,
        company,
        subject,
        message,
        date: new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }),
      },
    });

    if (emailResult.notConfigured) {
      console.warn(
        `[Email Notice] Form submitted for ${company} (${recipientEmail}). Email not dispatched because email credentials (EMAILJS_SERVICE_ID or SMTP_USER) are not configured yet.`
      );
      return NextResponse.json({
        success: true,
        delivered: false,
        message: `Inquiry recorded. (Notice: Configure EmailJS or SMTP in environment variables for live delivery).`,
        recipient: recipientEmail,
      });
    }

    if (!emailResult.success) {
      console.error("[Email Dispatch Error]", emailResult.error);
      return NextResponse.json(
        {
          success: false,
          message: emailResult.error || "Failed to dispatch email. Please try again later.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      delivered: true,
      message: `Your inquiry has been successfully sent to ${recipientEmail}.`,
      recipient: recipientEmail,
    });
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      { success: false, message: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
