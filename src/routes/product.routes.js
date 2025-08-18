import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductsById,
  updateProduct,
} from "../controllers/product.controllers.js";

import { authenticateToken } from "../middlewares/auth.js";

const router = Router();

router.get("/products", authenticateToken, getProducts);
router.get("/products/:id", authenticateToken, getProductsById);
router.post("/products", authenticateToken, createProduct);
router.put("/products/:id", authenticateToken, updateProduct);
router.delete("/products/:id", authenticateToken, deleteProduct);

export default router;
