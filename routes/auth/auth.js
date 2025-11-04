import express from "express";
import auth_authenticate from "./auth_authenticate.js";

const router = express.Router();

router.use(auth_authenticate);

export default router;
