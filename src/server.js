import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { json } from "./middleware/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  // Servir index.html
  if (method === "GET" && url === "/") {
    const filePath = path.join(__dirname, "public", "index.html");
    const html = await fs.readFile(filePath, "utf-8");

    res.writeHead(200, { "Content-Type": "text/html" });
    return res.end(html);
  }

  // Middleware JSON
  await json(req, res);

  const route = routes.find(route => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3333, () => {
  console.log("🚀 Servidor rodando em http://localhost:3333");
});
