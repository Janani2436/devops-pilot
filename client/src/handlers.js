import { rest } from "msw";

export const handlers = [
  rest.post("/api/agents", async (req, res, ctx) => {
    const body = await req.json();
    const log = (body.description || body.log || body.title || "").slice(0, 200);
    return res(
      ctx.status(200),
      ctx.json({
        suggestions: [
          { id: "s1", title: `Check network for: ${log}`, summary: "Quick network check" },
          { id: "s2", title: `Restart service`, summary: "Try restarting the affected service" },
        ],
      })
    );
  }),

  rest.get("/api/history", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: "h1",
          title: "System failed to connect",
          suggestions: ["Check network", "Restart agent"],
          date: new Date().toISOString(),
        },
        {
          id: "h2",
          title: "High CPU",
          suggestions: ["Investigate processes", "Scale up"],
          date: new Date().toISOString(),
        },
      ])
    );
  }),
];
