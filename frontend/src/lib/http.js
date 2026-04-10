import { getToken } from "./token";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";
// generate proper headers for protected routes and check for auth
export const http = () => {
  const token = getToken();

  const baseHeaders = {
    "Content-Type": "application/json",
  };

  if (token) {
    baseHeaders["Authorization"] = `Bearer ${token}`;
  }

  async function request(path, options = {}) {
    const res = await fetch(`${BACKEND_URL}${path}`, {
      ...options,
      headers: {
        ...baseHeaders,
        ...(options.headers || {}),
      },
    });

    // let 429 through so callers can read cooldown info
    if (!res.ok && res.status !== 429) {
      throw new Error(res.error || "Request failed");
    }

    return res;
  }

  return {
    get: (path) =>
      request(path, {
        method: "GET",
      }),

    post: (path, body) =>
      request(path, {
        method: "POST",
        body: body ? JSON.stringify(body) : undefined,
      }),

    patch: (path, body) =>
      request(path, {
        method: "PATCH",
        body: body ? JSON.stringify(body) : undefined,
      }),
  };
}