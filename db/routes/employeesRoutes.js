import express from "express"
const router = express.Router()
import { prueba, addBook, getBooks, editBook, deleteBook } from "../controllers/employeesController.js"
import { verifyRole } from "../middlewares/authMiddleware.js"
export default (pool)=>{
    router.get('/prueba', prueba)
    router.get('/books', (req, res)=> getBooks(req, res, pool))
    router.post('/books', verifyRole(["empleado"]), (req, res)=> addBook(req, res, pool))
    router.put('/books/:id', verifyRole(["empleado"]), (req,res)=> editBook(req, res, pool))
    router.delete('/books/:id', verifyRole(["empleado"]),(req, res)=> deleteBook(req, res, pool))
    return router 
}
