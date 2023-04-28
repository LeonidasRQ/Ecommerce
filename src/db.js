import mongoose from "mongoose";
import config from "./config.js";

const { dbUrl } = config;

const database = {
  connect: async () => {
    try {
      await mongoose.connect(dbUrl);
    } catch (error) {
      console.log(error);
    }
  },
};

export default database;
