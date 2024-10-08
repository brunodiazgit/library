/* eslint-disable react/prop-types */
import Book from "./Book"

function BookList({items}) {
    return (
        <>
            {items.map(book => (
                <Book book={book} key={book.id}/>
            ))}
        </>
    )
}

export default BookList 