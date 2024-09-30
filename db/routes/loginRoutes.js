import express from "express"
import { register, login} from "../controllers/authController.js"
const router = express.Router()


export default (pool) => {
    router.post('/register',(req, res)=> register(req, res, pool))
    router.post('/login', (req, res)=> login(req, res, pool))
    return router
}


