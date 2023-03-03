import ProductManager from "../ProductManager.js";
import express from "express";

const app = express();

const manager = new ProductManager();

app.listen(8080, (req, res) => {
  console.log("Listening on port 8080");
});

app.get("/products", async (req, res) => {
  const { limit } = req.query;

  const products = await manager.getProducts();

  if (!limit) {
    return res.send({ products: products });
  }

  const limitedProducts = products.slice(0, limit);

  res.send({ products: limitedProducts });
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.send({ error: "You must specify a product id" });
  }
  const product = await manager.getProductById(+id);
  res.send(product);
});
