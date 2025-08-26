import express from "express";
import cors from "cors";
import routerUser from "./routes/user.routes.js";
import routerProducts from "./routes/product.routes.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(routerUser);
app.use(routerProducts);

export default app