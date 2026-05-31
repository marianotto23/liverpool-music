import express from "express";
import cors from "cors";

import productsRoutes from "./routes";
import ordersRoutes from "./routes/ordersRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "Liverpool Music API is running",
  });
});

app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);

export default app;