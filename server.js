import express from "express"
import bodyParser from "body-parser"
import { simpleToken } from "./middleware/simpleToken.js"
import authRouter from "./routes/auth/auth.js"
import usersRouter from "./routes/users/users.js"

const app = express()

app.use(bodyParser.json())

// middleware
app.use(simpleToken)  

// rotas dos modulos
app.use(authRouter)
app.use(usersRouter)

app.listen(3000, () => console.log("🚀 Servidor rodando em http://localhost:3000"))
