import jwt from "jsonwebtoken"
import  { getClienteById } from "../db/mongo.js"

export async function simpleToken(req, res, next) {

  // confere caminhos publicos
  const publicPaths = ['/authenticate'];
  if (publicPaths.includes(req.path))
    return next()

  // confere token
  const token = req.headers['authorization']
  var validToken = false
  try {
    jwt.verify(token, process.env.JWT_SECRET, { issuer: process.env.JWT_ISSUER, audience: process.env.JWT_AUDIENCE });
    validToken = true
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: 'Unauthorized token' })
  }

  // confere se o client id passado é valido no bd
  const cliente_id = req.headers["cliente_id"];
  if (cliente_id == undefined)
    return res.status(401).json({ message: 'Unauthorized cliente_id' });
  const cliente = await getClienteById(cliente_id);
  if (!cliente)
    return res.status(401).json({ message: 'Unauthorized cliente_id' });

  // tudo ok!
  return next()
}
