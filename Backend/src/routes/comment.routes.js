import { Router } from "express";
import {
  ctrlCreateComment,
  ctrlDeleteComment,
  ctrlEditComment,
  ctrlGetCommentsForPost,
} from "../controllers/comment.controller.js";

const commentRouter = Router();




// Rutas privadas
commentRouter.get('/:postId', ctrlGetCommentsForPost);
commentRouter.post("/:postId", ctrlCreateComment); // Crear comentario
commentRouter.put("/:commentId", ctrlEditComment); // Editar un comentario
commentRouter.delete("/:commentId", ctrlDeleteComment); // Eliminar comentario

export { commentRouter };
