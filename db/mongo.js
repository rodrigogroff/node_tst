import { MongoClient } from "mongodb"
import { v4 as uuidv4 } from "uuid";
import 'dotenv/config'

const uri = process.env.MONGO_URI
const client = new MongoClient(uri)

export async function getMongo() {
  if (!client.topology?.isConnected()) {
    await client.connect()
  }
  return client.db("financeiro")
}

export async function getClienteById(guid) {
  try {
    const db = await getMongo();
    const collection = db.collection("clientes");
    const clienteId = typeof guid === "string" ? guid : guid.value; 
    const cliente = await collection.findOne({ id: clienteId });
    return cliente;
  } catch (err) {
    console.error("Error fetching cliente:", err);
    throw err;
  }
}

export async function getAllClientes() {
  try {
    const db = await getMongo();
    const collection = db.collection("clientes");
    const clientes = await collection.find({}).toArray();
    return clientes;
  } catch (err) {
    console.error("Error fetching clientes:", err);
    throw err;
  }
}

export async function getUsuarioByClienteIdEmail(guid, email) {
  try {
    const db = await getMongo();
    const collection = db.collection("usuarios");
    const clienteId = typeof guid === "string" ? guid : guid.value; 
    const usuario = await collection.findOne({ cliente_id: clienteId, email: email });
    return usuario;
  } catch (err) {
    console.error("Error fetching cliente:", err);
    throw err;
  }
}

export async function getUsuarioByClienteId(guid) {
  try {
    const db = await getMongo();
    const collection = db.collection("usuarios");
    const clienteId = typeof guid === "string" ? guid : guid.value; 
    const usuarios = await collection.find({ cliente_id: clienteId }).toArray();
    return usuarios;
  } catch (err) {
    console.error("Error fetching cliente:", err);
    throw err;
  }
}

export async function getUsuarioByClienteIdNome(guid, nome) {
  try {
    const db = await getMongo();
    const collection = db.collection("usuarios");
    const clienteId = typeof guid === "string" ? guid : guid.value;     
    const regex = new RegExp(`^${nome}`, "i");
    const usuarios = await collection
      .find({ cliente_id: clienteId, nome: { $regex: regex } })
      .toArray();
    return usuarios;    
  } catch (err) {
    console.error("Error fetching cliente:", err);
    throw err;
  }
}

export async function getUsuarioByClienteIdUserId(guid_cliente, guid_user) {
  try {
    const db = await getMongo();
    const collection = db.collection("usuarios");
    const clienteId = typeof guid_cliente === "string" ? guid_cliente : guid_cliente.value;     
    const userId = typeof guid_user === "string" ? guid_user : guid_user.value;     
    const usuario = await collection.findOne({ cliente_id: clienteId, id: userId });
    return usuario;    
  } catch (err) {
    console.error("Error fetching cliente:", err);
    throw err;
  }
}

export async function updateUsuario(usuario_id, cliente_id, newEmail) {
  try {
    const db = await getMongo();
    const collection = db.collection("usuarios");
    const result = await collection.updateOne(
      { id: usuario_id, cliente_id },
      { $set: { email: newEmail } }
    );
    return result.matchedCount > 0
  } catch (err) {
    console.error("Error fetching cliente:", err);
    throw err;
  }
}

export async function updateUsuarioDocumentoCPF(usuario_id, cliente_id, cpf) {
  try {
    const db = await getMongo();
    const collection = db.collection("usuariosdocumentos");
    const usuariodoc = await collection.findOne({ cliente_id, usuario_id, tipoDocumento: "1" });
    if (usuariodoc == null) {
      const result = await collection.insertOne({
        id: uuidv4(),
        cliente_id: cliente_id,
        usuario_id: usuario_id,
        tipoDocumento: "1",
        usuario_cpf: cpf,        
      })
      return result.insertedId != null
    }
    else {
      const result = await collection.updateOne(
        { id: usuariodoc.id },
        { $set: { usuario_cpf: cpf } }
      )
      return result.matchedCount > 0
    }
  } catch (err) {
    console.error("Error fetching cliente:", err);
    throw err;
  }
}

export async function updateUsuarioDocumentoCNPJ(usuario_id, cliente_id, cnpj) {
  try {
    const db = await getMongo();
    const collection = db.collection("usuariosdocumentos");
    const usuariodoc = await collection.findOne({ cliente_id, usuario_id, tipoDocumento: "2" });
    if (usuariodoc == null) {
      const result = await collection.insertOne({
        id: uuidv4(),
        cliente_id: cliente_id,
        usuario_id: usuario_id,
        tipoDocumento: "2",
        usuario_cnpj: cnpj,        
      })
      return result.insertedId != null
    }
    else {
      const result = await collection.updateOne(
        { id: usuariodoc.id },
        { $set: { usuario_cnpj: cnpj } }
      )
      return result.matchedCount > 0
    }
  } catch (err) {
    console.error("Error fetching cliente:", err);
    throw err;
  }
}

export async function getUsuarioDocumentosByUsuarioId(guid) {
  try {
    const db = await getMongo();
    const collection = db.collection("usuariosdocumentos");
    const usuario_id = typeof guid === "string" ? guid : guid.value;     
    const usuarios_docs = await collection
      .find({ usuario_id })
      .toArray();
    return usuarios_docs;    
  } catch (err) {
    console.error("Error fetching cliente:", err);
    throw err;
  }
}

