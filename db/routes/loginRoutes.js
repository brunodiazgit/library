import express from "express"
import { register } from "../controllers/authController.js"
const router = express.Router()


export default (pool) => {
    router.post('/register',(req, res)=> register(req, res, pool))

    return router
}


