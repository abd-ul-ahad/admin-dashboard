import express from "express";
import Product from "../models/product.js";

const Router = express();

Router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(401).json(e);
  }
});

export default Router;
