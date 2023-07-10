import express from "express";
import OverallStat from "../models/overallStat.js";

const Router = express();

Router.get("/", async (req, res) => {
  try {
    const overallStats = await OverallStat.find();

    res.status(200).json(overallStats[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default Router;
