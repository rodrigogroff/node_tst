import express from "express"
import bodyParser from "body-parser"
import { simpleToken } from "./middleware/simpleToken.js"
import authRouter from "./routes/auth/auth.js"
import usersRouter from "./routes/users/users.js"
import 'dotenv/config'

const app = express()

app.use(bodyParser.json())

// middleware
app.use(simpleToken)  

// rotas dos modulos
app.use(authRouter)
app.use(usersRouter)

app.listen(process.env.SERVER_PORT, () => console.log("🚀 Servidor rodando em http://localhost:" + process.env.SERVER_PORT))
