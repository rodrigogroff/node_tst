import jwt from "jsonwebtoken";
import express from "express";
import { checkGuid, checkEmailSyntax } from "../../util/util.js";
import { getClienteById, getUsuarioByClienteIdEmail } from "../../db/mongo.js"

const router = express.Router();

router.post("/authenticate", async (req, res) => {
  try {

    const { cliente_id, email } = req.body;

    if (!cliente_id || !email)
      return res.status(400).json({ error: "invalid credentials" })
    
    if (!checkGuid(cliente_id))
      return res.status(400).json({ error: "invalid credentials" })
    
    if (!checkEmailSyntax(email))
      return res.status(400).json({ error: "invalid credentials" })

    // confere se cliente existe no bd

    const cliente = await getClienteById(cliente_id);

    if (!cliente)
      return res.status(404).json({ error: "invalid credentials" });

    // confere se usuário está cadastrado

    const usuario = await getUsuarioByClienteIdEmail(cliente_id, email);
    
    if (!usuario)
      return res.status(404).json({ error: "invalid credentials" });

    const token = jwt.sign(usuario, process.env.JWT_SECRET, {
      expiresIn: "1h",
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE
    })

    res.json({ message: "OK", token: token  });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
