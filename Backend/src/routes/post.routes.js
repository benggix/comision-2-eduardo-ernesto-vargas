import { Router } from "express";
import {
  ctrlCreatePost,
  ctrlDeletePost,
  ctrlGetPosts,
  ctrlEditPost,
} from "../controllers/post.controller.js";

const postRouter = Router();

postRouter.get("/", ctrlGetPosts); // obtener los posts
postRouter.post("/", ctrlCreatePost); // Crear post
postRouter.put("/:postId", ctrlEditPost); // Editar una publicación
postRouter.delete("/:postId", ctrlDeletePost); // Eliminar Post

export { postRouter };
