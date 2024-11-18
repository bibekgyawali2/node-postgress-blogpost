import { Router } from "express";
import messages from "../constants/messages";
import authRouter from "./auth.routes";
import postRouter from './post.routes';

const router = Router();
const routes = [
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/post",
    route: postRouter,
  }
];

// *Route to ensure that server is currently running
router.get("/", (req, res) => {
  res.send({
    success: true,
    message: messages["welcomeMessage"],
    data: [],
  });
});

// *Instantiate all the routes
routes.forEach((route) => {
  router.use("/auth", route.route());
  router.use("/post", route.route());
});

export default router;
