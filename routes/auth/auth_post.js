import express from "express";
import { checkGuid, checkEmailSyntax } from "../../util/util.js";
import { getClienteById, getUsuarioByClienteIdEmail } from "../../db/mongo.js"

const router = express.Router();

router.post("/auth", async (req, res) => {
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
    
    res.json({ message: "OK" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
