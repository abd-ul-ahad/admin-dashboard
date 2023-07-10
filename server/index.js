import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import { geoRoutes, productsRoutes } from "./routes/index.js";

// CONFIGURATIONS
config();

// SERVER
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false" }));

// SETTING UP ROUTES
app.use("/api/v1/geography", geoRoutes);
app.use("/api/v1/product", productsRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT || 9000;

// Connecting MONGOOSE
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server is started ${PORT}`));
  })
  .catch((e) => console.log(e));
