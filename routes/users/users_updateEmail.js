import express from "express";
import { checkGuid, checkEmailSyntax } from "../../util/util.js";
import { getUsuarioByClienteIdUserId, updateUsuario } from "../../db/mongo.js";

const router = express.Router();

router.put("/users_updateEmail", async (req, res) => {

  try {
    
    const cliente_id = req.headers["cliente_id"];
    const { usuario_id, email } = req.body;

    if (!cliente_id || !usuario_id || !email)
      return res.status(400).json({ error: "Missing parameters" });

    if (!checkGuid(cliente_id))
      return res.status(400).json({ error: "invalid credentials" });

    if (!checkGuid(usuario_id))
      return res.status(400).json({ error: "invalid credentials" });

    if (!checkEmailSyntax(email))
      return res.status(400).json({ error: "invalid credentials" });

    const usuario = await getUsuarioByClienteIdUserId(cliente_id, usuario_id);
    
    if (!usuario)
      return res.status(404).json({ error: "User not found" });

    if (!await updateUsuario(usuario_id, cliente_id, email))
      res.status(500).json({ error: 'falha interna' });  

    res.json({ message: "Email updated successfully" });

  } catch (err) {
    console.error("❌ Error updating email:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
