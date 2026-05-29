import { createSessionHeaders, getRequiredEnv, json } from "../_shared.js";

export async function onRequestPost({ request, env }) {
  try {
    const { password } = await request.json();

    if (!password || password !== getRequiredEnv(env, "ADMIN_PASSWORD")) {
      return json({ error: "That password did not match." }, 401);
    }

    return json({ ok: true }, 200, await createSessionHeaders(env));
  } catch (error) {
    return json({ error: error.message || "Login failed." }, 500);
  }
}
