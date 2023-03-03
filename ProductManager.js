import fs from "fs";

export default class ProductManager {
  constructor() {
    this.path = "./files/Products.json";
  }

  getProducts = async () => {
    if (fs.existsSync(this.path)) {
      const productsString = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(productsString);
      return products;
    } else {
      return [];
    }
  };

  addProduct = async (product) => {
    const products = await this.getProducts();

    product.id =
      products.length === 0 ? 1 : products[products.length - 1].id + 1;

    products.push(product);

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, "\t")
    );
    return product;
  };

  getProductById = async (id) => {
    const products = await this.getProducts();
    const product = products.find((product) => product.id === id);
    if (!product) return `Error: Product with id: ${id} does not exist.`;
    return product;
  };

  updateProduct = async (id, changes) => {
    const products = await this.getProducts();
    const product = await this.getProductById(id);
    const productIndex = products.findIndex((product) => product.id === id);

    if (changes.id) {
      return "Error: Cannot modify id property";
    }

    const updatedProduct = {
      ...product,
      ...changes,
    };

    products.splice(productIndex, 1, updatedProduct);

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, "\t")
    );
    return updatedProduct;
  };

  deleteProduct = async (id) => {
    const products = await this.getProducts();
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1)
      return `Error: Product with id ${id} does not exist.`;

    products.splice(productIndex, 1);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, "\t")
    );
    return "Product deletion: successful!";
  };
}
