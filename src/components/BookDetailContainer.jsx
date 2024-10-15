import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

function BookDetailContainer() {
    const [detail, setDetail] = useState([])
    let { id } = useParams()

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await fetch(`http://localhost:3900/api/employee/books/${id}`)
                if (!response.ok) {
                    throw new Error("response was not ok")
                }
                const data = await response.json()
                setDetail(data.detail)
            } catch (error) {
                console.log("an error ocurred: " + error)
            }
        }
        fetchApi()
    }, [id])


    return (
        <div className="flex flex-col text-start  text-white">
            <div className="flex">
                <img className="w-2/4 h-2/4" src={detail.imagen_url} alt={detail.titulo} />
                <ul className="flex flex-col gap-3 justify-center text-md m-5">
                    <li><span>Título: </span>{detail.titulo}</li>
                    <li><span>Autor: </span> {detail.autor}</li>
                    <li><span>Género: </span> {detail.genero}</li>
                    <li><span>Stock: </span>{detail.stock}</li>
                </ul>
            </div>
            <div className="flex flex-col justify-center items-center">
            <p className="m-8 text-md">{detail.descripcion}</p>
            <button className="w-36 h-10 mb-10">Reservar</button>
            </div>
        </div>
    )
}

export default BookDetailContainer