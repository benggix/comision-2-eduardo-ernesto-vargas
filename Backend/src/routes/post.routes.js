import { Router } from "express";
import {
  ctrlCreatePost,
  ctrlDeletePost,
  ctrlGetPosts,
  ctrlEditPost,
} from "../controllers/post.controller.js";
import { authMiddleware } from "../middleware/authentication.js";

const postRouter = Router();

postRouter.get("/", ctrlGetPosts); // obtener los posts

// esto para q a partir de ahora, crear, edit y elim un post van a tener q estar autenticados
postRouter.use(authMiddleware)

postRouter.post("/createPost", ctrlCreatePost); // Crear post
postRouter.put("/:postId", ctrlEditPost); // Editar una publicación
postRouter.delete("/:postId", ctrlDeletePost); // Eliminar Post

export { postRouter };
