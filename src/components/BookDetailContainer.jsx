import { useContext } from "react"
import { BookContext } from "../context/BookProvider"

function BookDetailContainer(){
    const {books} = useContext(BookContext)

    return(
        <div>
            {books.map(book =>(
                <div key={book.id}>
                    <img src={book.img} alt="imagen de libro"/>
                    

                </div>
            ))}
        </div>
    )
}

export default BookDetailContainer