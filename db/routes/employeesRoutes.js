import express from "express"
const router = express.Router()
import upload from "../middlewares/upload.js"
import { prueba, addBook, getBooks, editBook, deleteBook, detailBook } from "../controllers/employeesController.js"
import { verifyRole } from "../middlewares/authMiddleware.js"
export default (pool)=>{
    router.get('/prueba', prueba)
    router.get('/books', (req, res)=> getBooks(req, res, pool))
    router.get('/books/:id', (req, res)=> detailBook(req, res, pool))
    router.post('/books', verifyRole(["empleado"]), upload.single('imagen'), (req, res)=> addBook(req, res, pool))
    router.put('/books/:id', verifyRole(["empleado"]), (req,res)=> editBook(req, res, pool))
    router.delete('/books/:id', verifyRole(["empleado"]),(req, res)=> deleteBook(req, res, pool))
    
    return router 
}
