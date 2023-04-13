import productsModel from "../models/products.js";

export default class ProductManager {
  constructor() {}

  getProducts = async () => {
    try {
      const products = await productsModel.find().lean();
      return products;
    } catch (error) {
      console.log(error);
    }
  };

  addProduct = async (product) => {
    try {
      const createdProduct = await productsModel.create(product);
      return createdProduct;
    } catch (error) {
      console.log(error);
    }
  };

  getProductById = async (id) => {
    try {
      const product = await productsModel.findOne({ _id: id });
      return product;
    } catch (error) {
      console.log(error);
    }
  };

  updateProduct = async (id, changes) => {
    try {
      const updatedProduct = await productsModel.updateOne(
        { _id: id },
        changes
      );
      return updatedProduct;
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (id) => {
    try {
      const deletedProduct = await productsModel.deleteOne({ _id: id });
      return deletedProduct;
    } catch (error) {
      console.log(error);
    }
  };
}
