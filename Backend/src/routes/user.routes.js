import { Router } from "express";
import {
  ctrlRegisterUser,
  ctrlLoginUser,
  ctrlLogoutUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

// Rutas públicas
userRouter.post("/register", ctrlRegisterUser); // Craer usuario
userRouter.post("/login", ctrlLoginUser); // Iniciar sesion
userRouter.post("/logout", ctrlLogoutUser); // cerrar sesion

export { userRouter };
