import express from "express";
import { checkGuid } from "../../util/util.js";
import { getClienteById, getUsuarioByClienteId, getUsuarioByClienteIdNome } from "../../db/mongo.js"

const router = express.Router();

router.get("/users", async (req, res) => {
  
  try {
    
    const { name } = req.query
    const cliente_id = req.headers["cliente_id"];

    if (!cliente_id)
      return res.status(400).json({ error: "Missing parameters" });

    if (!checkGuid(cliente_id))
      return res.status(400).json({ error: "invalid credentials" });

    // busca cliente
    const cliente = await getClienteById(cliente_id);
    if (!cliente)
      return res.status(404).json({ error: "invalid credentials" });

    // busca usuários
    const usuarios = name === undefined ? 
      await getUsuarioByClienteId(cliente_id) : 
      await getUsuarioByClienteIdNome(cliente_id, name);

    // somente campos necessários
    const _resp = (Array.isArray(usuarios) ? usuarios : []).map(u => ({
      id: u.id,
      nome: u.nome,
      email: u.email,      
    }));

    // finaliza
    res.json({ usuarios: _resp });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
