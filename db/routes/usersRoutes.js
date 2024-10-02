import express from "express"
import { loanBook, returnBook } from "../controllers/usersController.js"
import { verifyRole } from "../middlewares/authMiddleware.js"
const router = express.Router()

export default (pool)=>{
    router.post('/loan', verifyRole(["usuario"]), (req, res)=> loanBook(req, res, pool))
    router.put('/loan/:id', verifyRole(["usuario"]), (req,res)=> returnBook(req, res, pool))
    return router
}