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
                setDetail(data)
            } catch (error) {
                console.log("an error ocurred: " + error)
            }
        }
        fetchApi()
    }, [id])


    return (
        <div>
            <h1>{detail.titulo}</h1>
        </div>
    )
}

export default BookDetailContainer