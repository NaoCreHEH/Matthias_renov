import { TRPCError } from "@trpc/server";
import { createTransport } from "nodemailer";
import { ENV } from "./env";

export type NotificationPayload = {
  title: string;
  content: string;
};

const TITLE_MAX_LENGTH = 1200;
const CONTENT_MAX_LENGTH = 20000;

const trimValue = (value: string): string => value.trim();
const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const buildEndpointUrl = (baseUrl: string): string => {
  const normalizedBase = baseUrl.endsWith("/")
    ? baseUrl
    : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};

const validatePayload = (input: NotificationPayload): NotificationPayload => {
  if (!isNonEmptyString(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required.",
    });
  }
  if (!isNonEmptyString(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required.",
    });
  }

  const title = trimValue(input.title);
  const content = trimValue(input.content);

  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`,
    });
  }

  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`,
    });
  }

  return { title, content };
};

// Configuration du transporteur Nodemailer (à adapter selon le service SMTP)
const transporter = createTransport({
  host: ENV.smtpHost,
  port: ENV.smtpPort,
  secure: ENV.smtpPort === 465, // true for 465, false for other ports
  auth: {
    user: ENV.smtpUser,
    pass: ENV.smtpPass,
  },
});

/**
 * Envoie un email de secours en cas d'échec de l'API de notification.
 */
async function sendFallbackEmail(payload: NotificationPayload): Promise<boolean> {
  // Nous ne vérifions pas ici car l'utilisateur a confirmé la configuration des variables d'environnement.
  // Le transporteur Nodemailer gérera l'échec de connexion si les variables sont incorrectes.
  // if (!ENV.smtpHost || !ENV.smtpUser || !ENV.smtpPass) {
  //   console.warn("[Notification] SMTP credentials not configured. Skipping fallback email.");
  //   return false;
  // }

  try {
    await transporter.sendMail({
      from: `"${ENV.appName || "Formulaire de Contact"}" <${ENV.smtpUser}>`,
      to: "desmet.erwin22@gmail.com", // L'adresse email cible demandée
      subject: payload.title,
      text: payload.content,
    });
    console.log("[Notification] Fallback email sent successfully.");
    return true;
  } catch (error) {
    console.error("[Notification] Failed to send fallback email:", error);
    return false;
  }
}

/**
 * Dispatches a project-owner notification through the Manus Notification Service.
 * Returns `true` if the request was accepted, `false` when the upstream service
 * cannot be reached (callers can fall back to email/slack). Validation errors
 * bubble up as TRPC errors so callers can fix the payload.
 */
export async function notifyOwner(
  payload: NotificationPayload
): Promise<boolean> {
  const { title, content } = validatePayload(payload);

  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured.",
    });
  }

  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured.",
    });
  }

  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1",
      },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${
          detail ? `: ${detail}` : ""
        }`
      );
      // Tenter l'envoi d'un email de secours
      return await sendFallbackEmail(payload);
    }

    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    // Tenter l'envoi d'un email de secours en cas d'erreur de connexion
    return await sendFallbackEmail(payload);
  }
}
