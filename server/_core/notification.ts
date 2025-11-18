import { TRPCError } from "@trpc/server";
import { createTransport } from "nodemailer";
import { ENV } from "./env";

export type NotificationPayload = {
  title: string;
  content: string;
};

const transporter = createTransport({
  host: ENV.smtpHost,
  port: ENV.smtpPort,
  secure: false, // important pour Mailersend en port 587
  auth: {
    user: ENV.smtpUser,
    pass: ENV.smtpPass,
  },
});

export async function notifyOwner(
  payload: NotificationPayload
): Promise<boolean> {
  try {
    console.log("[Mail] Attempting SMTP send...");

    await transporter.sendMail({
      from: `"Matthias Renov" <contact@rommelaere-renov.be>`,
      to: "desmet.erwin22@gmail.com",
      subject: payload.title,
      text: payload.content,
    });

    console.log("[Mail] Email successfully sent.");
    return true;
  } catch (error) {
    console.error("[Mail] Error sending email:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to send email.",
    });
  }
}
