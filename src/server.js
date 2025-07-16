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

  // Servir arquivo index.html da pasta public
  if (method === "GET" && (url === "/" || url === "/index.html")) {
    try {
      const filePath = path.join(__dirname, "public", "index.html");
      const html = await fs.readFile(filePath, "utf-8");

      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end(html);
    } catch {
      res.writeHead(404).end("Arquivo não encontrado");
      return;
    }
  }

  // Middleware JSON para popular req.body
  await json(req, res);

  // Encontrar rota correspondente
  const route = routes.find(route => route.method === method && route.path.test(url));

  if (route) {
    // Extrair parâmetros da URL
    const routeParams = url.match(route.path);

    if (routeParams) {
      const groups = route.path.exec(url).groups ?? {};
      const { query, ...params } = groups;

      req.params = params;
      req.query = query ? extractQueryParams(query) : {};
    } else {
      req.params = {};
      req.query = {};
    }

    return route.handler(req, res);
  }

  res.writeHead(404).end("Rota não encontrada");
});

server.listen(3333, () => {
  console.log("🚀 Servidor rodando em http://localhost:3333");
});
