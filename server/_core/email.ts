import nodemailer from "nodemailer";
import { ENV } from "./env";

export type LeadSubmissionEmailPayload = {
  fullName: string;
  company?: string | null;
  email: string;
  phone: string;
  truckType: string;
  truckCount?: number | null;
  location?: string | null;
  message?: string | null;
};

export async function sendLeadSubmissionEmail(payload: LeadSubmissionEmailPayload): Promise<boolean> {
  const gmailUser = ENV.gmailUser.trim();
  const gmailPassword = ENV.gmailAppPassword.trim();
  const ownerEmail = ENV.ownerEmail.trim() || gmailUser;

  if (!gmailUser || !gmailPassword) {
    console.warn("[Email] Gmail SMTP is not configured; skipping lead submission email.");
    return false;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailPassword,
    },
  });

  const lines = [
    "New lead submission from Haulage",
    "",
    `Full name: ${payload.fullName}`,
    `Company: ${payload.company || "N/A"}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Truck type: ${payload.truckType}`,
    `Truck count: ${payload.truckCount ?? "N/A"}`,
    `Location: ${payload.location || "N/A"}`,
    `Message: ${payload.message || "N/A"}`,
  ];

  try {
    await transporter.sendMail({
      from: `Haulage Lead Form <${gmailUser}>`,
      to: ownerEmail,
      replyTo: payload.email,
      subject: `New lead: ${payload.fullName}`,
      text: lines.join("\n"),
      html: `<div><h3>New lead submission</h3><ul>${lines
        .slice(2)
        .map((line) => `<li>${line.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</li>`)
        .join("")}</ul></div>`,
    });

    return true;
  } catch (error) {
    console.error("[Email] Failed to send lead submission email:", error);
    return false;
  }
}
