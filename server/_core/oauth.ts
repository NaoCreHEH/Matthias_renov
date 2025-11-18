// server/oauth.ts
export function getLoginUrl() {
  console.warn("[OAuth] getLoginUrl called but OAuth is disabled.");
  return "#";
}
