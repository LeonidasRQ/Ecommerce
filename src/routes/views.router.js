import { Router } from "express";
import { productsService, cartsService } from "../services/index.js";
import GetCurrentUserDto from "../dao/dtos/get-current-user.js";
import { passportCall, handlePolicies } from "../middlewares/authorization.js";
import { messageDao } from "../dao/mongo/index.js";

const router = Router();

router.get("/", passportCall("jwt"), async (req, res) => {
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
  } = await productsService.getProducts(options);

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
    user: req.user,
  });
});

router.get("/product/:pid", async (req, res) => {
  const productId = req.params.pid;
  const product = await productsService.getProductById(productId);
  res.render("product", { title: "Product Details", product });
});

router.get("/cart", passportCall("jwt"), async (req, res) => {
  const cart = await cartsService.getCartById(req.user.cart);
  res.render("cart", { products: cart.products, title: "Cart Items" });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productsService.getProducts();
  res.render("realtime-products", {
    products,
    style: "styles.css",
    title: "Real Time Products",
  });
});

router.get(
  "/chat",
  passportCall("jwt"),
  handlePolicies(["USER"]),
  async (req, res) => {
    const messages = await messageDao.getMessages();
    return res.render("messages");
  }
);

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

router.get("/current", passportCall("jwt"), (req, res) => {
  const jwtUser = req.user;
  const user = new GetCurrentUserDto(jwtUser);
  res.render("profile", { user });
});

export default router;
