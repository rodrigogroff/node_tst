import  { getClienteById } from "../db/mongo.js"

export async function simpleToken(req, res, next) {

  // confere caminhos publicos

  const publicPaths = ['/auth'];

  if (publicPaths.includes(req.path))
    return next()

  // confere token

  const token = req.headers['authorization']

  if (!token || token !== "123456")
    return res.status(401).json({ message: 'Unauthorized token' })

  // confere se o client id passado é valido no bd

  const cliente_id = req.headers["cliente_id"];

  if (cliente_id == undefined)
    return res.status(401).json({ message: 'Unauthorized cliente_id' });
  
  const cliente = await getClienteById(cliente_id);

  if (!cliente)
    return res.status(401).json({ message: 'Unauthorized cliente_id' });

  // finaliza!
  return next()
}
