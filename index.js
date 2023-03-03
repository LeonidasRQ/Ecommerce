const ProductManager = require("./ProductManager.js");

const env = async () => {
  const manager = new ProductManager();

  let products = await manager.getProducts();
  console.log(products);

  const product = {
    title: "queso",
    description: "500 gr",
    price: 5,
    thumbnail: "image1",
    code: "FJHGN",
    stock: 10,
  };

  await manager.addProduct(product);

  const changes = {
    title: "Hola Mundo",
  };

  await manager.updateProduct(2, changes);

  await manager.deleteProduct(3);
};

env();
