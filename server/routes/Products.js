import express from "express";
import { Product } from "../models/index.js";

const Router = express();

Router.get("/all", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(401).json(e);
  }
});

export default Router;
