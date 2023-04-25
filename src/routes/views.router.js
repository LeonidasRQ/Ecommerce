import { Router } from "express";
import ProductManager from "../dao/dbManagers/products.js";
import MessageManager from "../dao/dbManagers/messages.js";
import CartManager from "../dao/dbManagers/carts.js";

const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();
const messageManager = new MessageManager();

router.get("/", async (req, res) => {
  const options = {
    query: {},
    pagination: {
      limit: req.query.limit ?? 10,
      page: req.query.page ?? 1,
      lean: true,
      sort: {},
    },
  };

  if (req.query.category) {
    options.query.category = req.query.category;
  }

  if (req.query.status) {
    options.query.status = req.query.status;
  }

  if (req.query.sort) {
    options.pagination.sort.price = req.query.sort;
  }

  const {
    docs: products,
    totalPages,
    prevPage,
    nextPage,
    page,
    hasPrevPage,
    hasNextPage,
  } = await productManager.getPaginatedProducts(options);

  const link = "/?page=";

  const prevLink = hasPrevPage ? link + prevPage : link + page;
  const nextLink = hasNextPage ? link + nextPage : link + page;

  return res.render("home", {
    products,
    totalPages,
    page,
    hasNextPage,
    hasPrevPage,
    prevLink,
    nextLink,
    title: "Products",
  });
});

router.get("/product", async (req, res) => {
  res.render("product");
});

router.get("/cart", async (req, res) => {
  const cart = await cartManager.getCartById("6440b66102acad1337350cc8");
  res.render("cart", { products: cart.products });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realtime-products", {
    products,
    style: "styles.css",
    title: "Real Time Products",
  });
});

router.get("/chat", async (req, res) => {
  const messages = await messageManager.getMessages();
  return res.render("messages");
});

export default router;
