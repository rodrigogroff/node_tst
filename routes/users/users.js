import express from "express";
import users_get from "./users_get.js";
import users_updateEmail from "./users_updateEmail.js";
import users_updateDocumento from "./users_updateDocumento.js";

const router = express.Router();

router.use(users_get);
router.use(users_updateEmail);
router.use(users_updateDocumento);

export default router;
