import { clearSessionHeaders, json } from "../_shared.js";

export async function onRequestPost() {
  return json({ ok: true }, 200, clearSessionHeaders());
}
