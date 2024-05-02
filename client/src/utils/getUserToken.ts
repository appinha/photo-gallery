export default function getUserToken() {
  const key = "token";
  const regex = new RegExp(`(^| )${key}=([^;]+)`);
  const match = document.cookie.match(regex);
  if (match) return match[2];
}
