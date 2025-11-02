import { MongoClient } from "mongodb"
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
    // filtro correto
    const clienteId = typeof guid === "string" ? guid : guid.value; 
    // find one document matching the filter
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
    // find all documents in the collection
    const clientes = await collection.find({}).toArray();
    return clientes; // empty array if no documents
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
    // filtro correto
    const clienteId = typeof guid === "string" ? guid : guid.value; 
    // find one document matching the filter
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
    // filtro correto
    const clienteId = typeof guid === "string" ? guid : guid.value;     
    // Case-insensitive regex that matches names starting with the given string
    const regex = new RegExp(`^${nome}`, "i");
    // Find all matching users
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
    // filtro correto
    const clienteId = typeof guid_cliente === "string" ? guid_cliente : guid_cliente.value;     
    // filtro correto
    const userId = typeof guid_user === "string" ? guid_user : guid_user.value;     
    // busca pelos ids
    const usuario = await collection.findOne({ cliente_id: clienteId, id: userId });
    return usuario;    
  } catch (err) {
    console.error("Error fetching cliente:", err);
    throw err;
  }
}

export async function updateUsuario(usuario_id, cliente_id, newEmail) {
  try {
    // get DB connection
    const db = await getMongo();
    const collection = db.collection("usuarios");
    // update email
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
