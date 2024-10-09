import BookList from "./BookList"
import { useState, useEffect } from "react"

function BookListContainer() {
const [products, setProducts] = useState([])


    useEffect(()=>{
        const fetchApi = async()=>{
                try{
                const response = await fetch("http://localhost:3900/api/employee/books/")
                if(!response.ok){
                    throw new Error("response was not ok")
                }
                const data = await response.json()
                setProducts(data.books)
            }catch(error){
            console.log("an error ocurred: " + error)
        }
    }
        fetchApi()
    },[])

    return (
        <div className="flex flex-col items-center justify-center ">
            <BookList items={products}/>
        </div>
    )
}

export default BookListContainer