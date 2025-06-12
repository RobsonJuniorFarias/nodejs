import { BuildRoutePath } from "./utils/build-route-path.js";
import { Database } from "./database.js";
import { randomUUID } from "node:crypto";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: BuildRoutePath("/users"),
    handler: (req, res) => {
      const { search } = req.query;

      const users = database.select("users", search ? {
        name: search,
        email: search
      } : null);

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: BuildRoutePath("/users"),
    handler: (req, res) => {
      const { name, email } = req.body;

      const user = {
        id: randomUUID(),
        name,
        email,
      };

      database.insert("users", user);

      return res.writeHead(201).end();
    },
  },
  {
    method: "PUT",
    path: BuildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      const { name, email } = req.body;

      database.update('users', id, {
        name,
        email,
      });

      return res.writeHead(204).end();
    }
  },
  {
    method: "DELETE",
    path: BuildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete('users', id);

      return res.writeHead(204).end();
    },
  },
  {
    method: "GET",
    path: BuildRoutePath("/orders"),
    handler: (req, res) => {
      const orders = database.select("orders") ?? [];
      const users = database.select("users") ?? [];
      const products = database.select("products") ?? [];

      const ordersWithDetails = orders.map(order => {
        const user = users.find(u => u.id === order.userId);
        const product = products.find(p => p.id === order.productId);
        return {
          ...order,
          user,
          product,
        };
      });

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(ordersWithDetails));
    }
  },
  {
    method: "POST",
    path: BuildRoutePath("/products"),
    handler: (req, res) => {
      const { name, price } = req.body;

      if (!name || !price) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Nome e preço são obrigatórios" }));
      }

      const product = {
        id: randomUUID(),
        name,
        price,
      };

      database.insert("products", product);

      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(product));
    }
  }
];
