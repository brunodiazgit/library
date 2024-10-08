import BookList from "./BookList"
import { useContext } from "react"
import {BookContext} from "../context/BookProvider"

function BookListContainer() {
const {books} = useContext(BookContext)

    return (
        <div className="flex flex-col items-center justify-center ">
            <BookList items={books}/>
        </div>
    )
}

export default BookListContainer