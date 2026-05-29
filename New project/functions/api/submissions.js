import { ensureDatabase, isAuthenticated, json } from "../_shared.js";

export async function onRequestGet({ request, env }) {
  try {
    if (!(await isAuthenticated(request, env))) {
      return json({ error: "Unauthorized." }, 401);
    }

    await ensureDatabase(env);
    const result = await env.DB.prepare(
      "select id, created_at, data from submissions order by created_at desc"
    ).all();

    const submissions = result.results.map((row) => ({
      id: row.id,
      createdAt: row.created_at,
      data: JSON.parse(row.data)
    }));

    return json({ submissions });
  } catch (error) {
    return json({ error: error.message || "Could not load submissions." }, 500);
  }
}
