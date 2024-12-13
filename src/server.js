import http from "node:http";
import { json } from "./middleware/json.js";
import { routes } from "./routes.js";



const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  const routeParams = req.url.match(route.path);

  console.log(routeParams);


  if (route) {
    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3333);
