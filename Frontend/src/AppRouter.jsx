import { Routes, Route } from "react-router-dom";
import { HomePage } from "./views/HomePage";
import { RegisterPage } from "./views/RegisterPage";
import { LoginPage } from "./views/LoginPage";
import { PostPage } from "./views/PostPage";
import { CreatePost } from "./components/CreatePost";
import { EditPostPage } from "./views/EditPostPage";
import { NotFoundPage } from "./views/NotFoundPage"
import {PrivateRouter} from "./Routes/PrivateRouter"


export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/users/login" element={<LoginPage />} />
      <Route path="/users/register" element={<RegisterPage />} />
      <Route path="/posts" element={<PostPage />} />

      <Route element={<PrivateRouter/>}> 
        <Route path="/posts/createPost" element={<CreatePost />} />
        <Route path="/posts/:postId" element={<EditPostPage />} />
      </Route>

    </Routes>
  );
};
