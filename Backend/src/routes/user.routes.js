import { Router } from "express";
import {
  ctrlRegisterUser,
  ctrlLoginUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

// Rutas públicas
userRouter.post("/register", ctrlRegisterUser); // Craer usuario
userRouter.post("/login", ctrlLoginUser); // Iniciar sesion

export { userRouter };
