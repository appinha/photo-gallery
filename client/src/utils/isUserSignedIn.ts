import getUserToken from "./getUserToken";

export default function isUserSignedIn() {
  const token = getUserToken();
  return Boolean(token && token.length > 0);
}
