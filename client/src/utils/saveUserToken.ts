export default function saveUserToken(token: string) {
  document.cookie = `token=${token};secure;samesite=strict`;
}
