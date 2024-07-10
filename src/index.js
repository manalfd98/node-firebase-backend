import express from "express";
import dotenv from "dotenv";
import InitializeRoutes from "./router/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;



app.use("/",InitializeRoutes())

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
