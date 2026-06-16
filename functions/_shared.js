import { siteConfig } from "../public/site-config.js";

const encoder = new TextEncoder();
const cookieName = "creator_hub_admin";
const weekInSeconds = 60 * 60 * 24 * 7;

export function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json",
      ...headers
    }
  });
}

export function getRequiredEnv(env, key) {
  const value = env[key];

  if (!value) {
    throw new Error(`${key} is not configured.`);
  }

  return value;
}

export function validateSubmission(input) {
  const formConfig =
    input.inquiryType === siteConfig.creatorForm.type ? siteConfig.creatorForm : siteConfig.brandForm;
  const data = {};
  const missing = [];

  data.inquiryType = formConfig.type;

  for (const field of formConfig.fields) {
    const value = typeof input[field.name] === "string" ? input[field.name].trim() : "";
    data[field.name] = value;

    if (field.required && !value) {
      missing.push(field.label);
    }
  }

  const emailField = formConfig.fields.find((field) => field.type === "email");
  const email = emailField ? data[emailField.name] : "";

  if (missing.length > 0) {
    return { error: `Please complete: ${missing.join(", ")}.` };
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  return { data };
}

async function sign(value, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function createSessionHeaders(env) {
  const issuedAt = Date.now().toString();
  const secret = getRequiredEnv(env, "AUTH_SECRET");
  const token = `${issuedAt}.${await sign(issuedAt, secret)}`;

  return {
    "set-cookie": `${cookieName}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${weekInSeconds}`
  };
}

export function clearSessionHeaders() {
  return {
    "set-cookie": `${cookieName}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`
  };
}

export async function isAuthenticated(request, env) {
  const cookie = request.headers.get("cookie") || "";
  const match = cookie.match(new RegExp(`${cookieName}=([^;]+)`));

  if (!match) {
    return false;
  }

  const [issuedAt, signature] = decodeURIComponent(match[1]).split(".");
  const issuedAtNumber = Number(issuedAt);

  if (!issuedAt || !signature || Number.isNaN(issuedAtNumber)) {
    return false;
  }

  const isFresh = Date.now() - issuedAtNumber < weekInSeconds * 1000;
  const expected = await sign(issuedAt, getRequiredEnv(env, "AUTH_SECRET"));
  return isFresh && signature === expected;
}

export async function ensureDatabase(env) {
  if (!env.DB) {
    throw new Error("DB binding is not configured.");
  }

  await env.DB.prepare(
    `create table if not exists submissions (
      id text primary key,
      created_at text not null,
      data text not null
    )`
  ).run();
}
