import express from "express"
const router = express.Router()
import { prueba, addBook, getBooks, editBook, deleteBook } from "../controllers/employeesController.js"
export default (pool)=>{
    router.get('/prueba', prueba)
    router.post('/books',(req, res)=> addBook(req, res, pool))
    router.get('/books', (req, res)=> getBooks(req, res, pool))
    router.put('/books/:id', (req,res)=> editBook(req, res, pool))
    router.delete('/books/:id', (req, res)=> deleteBook(req, res, pool))
    return router 
}
