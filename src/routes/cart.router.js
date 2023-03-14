import { Router } from "express";
import CartManager from "../CartManager.js";

const manager = new CartManager();

const router = Router();

router.post("/", async (req, res) => {
  const cart = req.body;
  if (!cart) {
    res.status(400).send({ status: "Error", error: "Cart could not be added" });
  }

  const newCart = await manager.addCart(cart);
  return res.send({
    status: "OK",
    message: "Cart added successfully",
    payload: newCart,
  });
});

router.get("/:cid", async (req, res) => {
  const cartId = req.params.cid;

  if (!cartId) {
    return res
      .status(400)
      .send({ status: "Error", error: "Please especify a cart id" });
  }

  const cart = await manager.getCartById(+cartId);
  return res.send({ status: "OK", message: "Cart found", payload: cart });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  const { quantity } = req.body;

  const newProduct = await manager.addProduct(+cartId, +productId, quantity);

  if (!newProduct) {
    return res
      .status(404)
      .send({ status: "Error", error: "Product could not be found" });
  }
  return res.send({
    status: "OK",
    message: "Product successfully added to the cart",
    payload: newProduct,
  });
});

export default router;
