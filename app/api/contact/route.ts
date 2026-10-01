import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Full name must be at least 2 characters"),
  email: z.string().trim().email("Please enter a valid email address"),
  company: z.string().min(1, "Please select an inquiry destination"),
  subject: z.string().trim().min(3, "Subject must be at least 3 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

export const COMPANY_EMAILS: Record<string, string> = {
  "Omar & Partners": "info@onp-bd.com",
  "Kolpoporishor": "kolpoporishor@gmail.com",
  "Kolpoporisor": "kolpoporishor@gmail.com",
  "Kolpokowsol": "kolpokowsol@gmail.com",
  "INEX": "inexmgt.bd@gmail.com",
};

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
    const recipientEmail = COMPANY_EMAILS[company] || "info@onp-bd.com";

    const formattedSubject = `[Inquiry - ${company}] ${subject}`;

    const textContent = `
NEW INQUIRY RECEIVED VIA WEBSITE
------------------------------------------------
Inquiry Destination: ${company} (${recipientEmail})
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
      <div class="badge">Destination: ${company}</div>
    </div>
    <div class="content">
      <table class="meta-table">
        <tr>
          <td class="label">From</td>
          <td class="value"><strong>${name}</strong> &lt;<a href="mailto:${email}" style="color:#b45309;text-decoration:none;">${email}</a>&gt;</td>
        </tr>
        <tr>
          <td class="label">Routing To</td>
          <td class="value"><strong>${company}</strong> (${recipientEmail})</td>
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

    // Dispatch via SMTP
    const emailResult = await sendEmail({
      to: recipientEmail,
      replyTo: email,
      subject: formattedSubject,
      text: textContent,
      html: htmlContent,
    });

    if (emailResult.notConfigured) {
      console.warn(
        `[SMTP Notice] Form submitted for ${company} (${recipientEmail}). Email not dispatched because SMTP_USER / SMTP_PASS are not configured yet.`
      );
      return NextResponse.json({
        success: true,
        smtpConfigured: false,
        message: `Inquiry recorded. (Note: To deliver actual emails, set SMTP_USER and SMTP_PASS in .env.local).`,
        recipient: recipientEmail,
      });
    }

    if (!emailResult.success) {
      console.error("[SMTP Error]", emailResult.error);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send email through SMTP service. Please try again later.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      smtpConfigured: true,
      message: `Your inquiry has been successfully sent to ${company} (${recipientEmail}).`,
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
