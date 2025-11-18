export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const APP_TITLE = import.meta.env.VITE_APP_TITLE || "Edes";

export const APP_LOGO =
  import.meta.env.VITE_APP_LOGO ||
  "/EDES.webp";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const appId = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);



  return url.toString();
};