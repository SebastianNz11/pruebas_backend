import { Router } from "express";
import { register, login } from "../controllers/user.controllers.js";
import { validatorSchema } from "../middlewares/validatorSchema.js";
import { loginSchema, userSchema } from "../schemas/user.schemas.js";

const router = Router();

router.post("/register", validatorSchema(userSchema), register);
router.post("/login", validatorSchema(loginSchema), login);

export default router;
