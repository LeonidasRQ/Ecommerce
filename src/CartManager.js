import fs from "fs";
import ProductManager from "./ProductManager.js";

const manager = new ProductManager();

export default class CartManager {
  constructor() {
    this.path = "./files/Carts.json";
  }

  getCarts = async () => {
    if (fs.existsSync(this.path)) {
      const cartsString = await fs.promises.readFile(this.path, "utf-8");
      const carts = JSON.parse(cartsString);
      return carts;
    } else {
      return [];
    }
  };

  getCartById = async (id) => {
    const carts = await this.getCarts();
    const cart = carts.find((cart) => cart.id === id);
    if (!cart) return false;
    return cart;
  };

  addCart = async (cart) => {
    const carts = await this.getCarts();

    cart = {
      id: carts.length === 0 ? 1 : carts[carts.length - 1].id + 1,
      products: [],
    };

    carts.push(cart);

    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
    return cart;
  };

  addProduct = async (cartId, productId, quantity) => {
    const carts = await this.getCarts();
    const cartIndex = carts.findIndex((cart) => cart.id === cartId);
    const cart = await this.getCartById(cartId);
    const product = await manager.getProductById(productId);

    if (!cart || !product) {
      return false;
    }

    const { products } = cart;

    const productIndex = products.findIndex(
      (product) => product.productId === productId
    );

    const cartProduct = {
      productId,
      quantity,
    };

    if (productIndex === -1) {
      products.push(cartProduct);
    } else {
      products[productIndex].quantity += quantity;
    }

    carts.splice(cartIndex, 1, cart);

    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
    return cart;
  };
}
