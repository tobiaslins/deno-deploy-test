import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("test.db");
db.query(`
  CREATE TABLE IF NOT EXISTS people (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )
`);
const names = ["Peter Parker", "Clark Kent", "Bruce Wayne"];

// Run a simple query
for (const name of names) {
  db.query("INSERT INTO people (name) VALUES (?)", [name]);
}

addEventListener("fetch", async (event) => {
  const res = await db.query("SELECT name FROM people");
  const response = new Response("Hello World!" + res.toString(), {
    headers: { "content-type": "text/plain" },
  });
  event.respondWith(response);
});
