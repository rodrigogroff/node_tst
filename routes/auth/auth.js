import express from "express";
import auth_post from "./auth_post.js";

const router = express.Router();

router.use(auth_post);

export default router;
