import { Router } from "express";
import {
  ctrlCreateComment,
  ctrlDeleteComment,
  ctrlEditComment,
} from "../controllers/comment.controller.js";

const commentRouter = Router();

// Rutas privadas
commentRouter.post("/:postId", ctrlCreateComment); // Crear comentario
commentRouter.put("/:commentId", ctrlEditComment); // Editar un comentario
commentRouter.delete("/:commentId", ctrlDeleteComment); // Eliminar comentario

export { commentRouter };
