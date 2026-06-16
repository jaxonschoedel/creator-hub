import { ensureDatabase, json, validateSubmission } from "../_shared.js";

export async function onRequestPost({ request, env }) {
  try {
    await ensureDatabase(env);
    const input = await request.json();
    const result = validateSubmission(input);

    if (result.error) {
      return json({ error: result.error }, 400);
    }

    const submission = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      data: result.data
    };

    await env.DB.prepare("insert into submissions (id, created_at, data) values (?, ?, ?)")
      .bind(submission.id, submission.createdAt, JSON.stringify(submission.data))
      .run();

    return json({ ok: true, submission });
  } catch (error) {
    return json({ error: error.message || "Submission failed." }, 500);
  }
}
