import { getStore } from "@netlify/blobs";

const STORE_NAME = "preston-park-calendar";
const KEY = "items";

export default async (req) => {
  const store = getStore(STORE_NAME);
  const method = req.method;

  // GET – return all items
  if (method === "GET") {
    const items = await store.get(KEY, { type: "json" }) || [];
    return Response.json(items);
  }

  // POST/PUT – save items (full array)
  if (method === "POST" || method === "PUT") {
    try {
      const items = await req.json();
      await store.setJSON(KEY, items);
      return Response.json({ success: true });
    } catch (e) {
      return Response.json({ error: "Invalid data" }, { status: 400 });
    }
  }

  return new Response("Method not allowed", { status: 405 });
};
