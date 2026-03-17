import { getToken } from "./token";
const BACKEND_URL = "http://localhost:3000";

export function http() {
  const token = getToken();

  const baseHeaders = {
    "Content-Type": "application/json",
  };

  if (token) {
    baseHeaders["Authorization"] = `Bearer ${token}`;
  }

  async function request(path, options = {}) {
    console.log(`${BACKEND_URL}${path}`)
    const res = await fetch(`${BACKEND_URL}${path}`, {
      ...options,
      headers: {
        ...baseHeaders,
        ...(options.headers || {}),
      },
    });

    // auto logout on 401 (optional)
    if (res.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return;
    }

    if (!res.ok) {
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