import express from "express"
import cors from "cors"
import pkg from "pg"

import employeesRoutes from "./db/routes/employeesRoutes.js"
import loginRoutes from "./db/routes/loginRoutes.js"
import usersRoutes from "./db/routes/usersRoutes.js"

console.log("Inicializando api")
console.log("Conectadose al servidor...")

const app = express()
const puerto = 3900 

app.use(cors())
app.use(express.json())


const { Pool } = pkg

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Libreria',
    password: 'Santana1!',
    port: 5432,
})

app.use('/api/employee', employeesRoutes(pool))
app.use('/api/auth', loginRoutes(pool))
app.use('/api/user', usersRoutes(pool))

app.listen(puerto, ()=>{
    console.log("Corriendo servidor en el puerto: " + puerto)
})