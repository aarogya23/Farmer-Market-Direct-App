import { buildUrl, ENDPOINTS } from "../config/api";

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = typeof data === "string" ? data : data?.message || "Request failed";
    throw new Error(message);
  }

  return data;
}

export async function login(email, password) {
  const response = await fetch(buildUrl(ENDPOINTS.LOGIN), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return parseResponse(response);
}

export async function signup(fullName, email, password, role = "BUYER") {
  const response = await fetch(buildUrl(ENDPOINTS.SIGNUP), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName, email, password, role }),
  });

  return parseResponse(response);
}

export async function getCurrentUser(token) {
  const response = await fetch(buildUrl(ENDPOINTS.CURRENT_USER), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return parseResponse(response);
}
