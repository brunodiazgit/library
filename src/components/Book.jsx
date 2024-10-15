/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

function Book({book}) {
    return (
        <div className="flex w-5/5 h-4/5 border-2 border-gray-950">
            <div className="w-3/5">
                <img src={book.imagen_url} alt={book.titulo} />
            </div>
            <div className="flex flex-col justify-center items-center gap-6 w-3/5 text-center">
                <h1 className="text-md">{book.titulo}</h1>
                <h2 className="text-sm"><span>Género: </span>{book.genero}</h2>
                <Link to={`/books/${book.id}`} className="h-10 w-24 rounded-md bg-green-900 text-white flex justify-center items-center">Ver más</Link>
            </div>
        </div>
    )
}

export default Book