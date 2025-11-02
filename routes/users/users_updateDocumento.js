import express from "express";
import { checkGuid } from "../../util/util.js";
import { getUsuarioByClienteIdUserId, updateUsuarioDocumentoCPF, updateUsuarioDocumentoCNPJ } from "../../db/mongo.js";

const router = express.Router();

router.put("/users_updateDocumento", async (req, res) => {

  try {

    const cliente_id = req.headers["cliente_id"];

    const { 
      usuario_id, 
      tipoDocumento, 
      usuario_cpf, 
      usuario_cnpj, 
      usuario_local_rua, 
      usuario_local_numero, 
      usuario_local_compl, 
      usuario_local_cep 
    } 
    = req.body;

    if (!cliente_id || !usuario_id  || !tipoDocumento)
      return res.status(400).json({ error: "Missing parameters" });

    if (!checkGuid(usuario_id))
      return res.status(400).json({ error: "invalid credentials" });

    const usuario = await getUsuarioByClienteIdUserId(cliente_id, usuario_id);
    
    if (!usuario)
      return res.status(404).json({ error: "User not found" });

    switch (tipoDocumento)
    {
      case "1":
        if (!usuario_cpf)
          return res.status(400).json({ error: "Missing parameters" });
        if (!await updateUsuarioDocumentoCPF (usuario_id, cliente_id, usuario_cpf))
          return res.status(400).json({ error: "internal error" });
        break

      case "2":
        if (!usuario_cnpj)
          return res.status(400).json({ error: "Missing parameters" });
        if (!await updateUsuarioDocumentoCNPJ (usuario_id, cliente_id, usuario_cnpj))
          return res.status(400).json({ error: "internal error" });
        break

      case "3":
        if (!usuario_local_rua || !usuario_local_numero || !usuario_local_cep)
          return res.status(400).json({ error: "Missing parameters" });
        break
    }

    res.json({ message: "Documento atualizado!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
