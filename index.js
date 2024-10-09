import express from "express"
import cors from "cors"
import pkg from "pg"
import path from "path"
import { fileURLToPath } from 'url'

import employeesRoutes from "./db/routes/employeesRoutes.js"
import loginRoutes from "./db/routes/loginRoutes.js"
import usersRoutes from "./db/routes/usersRoutes.js"

console.log("Inicializando api")
console.log("Conectadose al servidor...")

const app = express()
const puerto = 3900 

app.use(cors())
app.use(express.json())

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const { Pool } = pkg

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Libreria',
    password: 'Santana1!',
    port: 5432,
})

//Definición de rutas

app.use('/images', express.static(path.join(__dirname, 'covers')))
app.use('/api/employee', employeesRoutes(pool))
app.use('/api/auth', loginRoutes(pool))
app.use('/api/user', usersRoutes(pool))

app.listen(puerto, ()=>{
    console.log("Corriendo servidor en el puerto: " + puerto)
})