import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

function SignUp() {
    const [nombre, setNombre] = useState("")
    const [correo, setCorreo] = useState("")
    const [contraseña, setContraseña] = useState("")
    const [mensaje, setMensaje] = useState(null)

    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:3900/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre,
                    correo,
                    contraseña
                })
            })

            const data = await response.json()

            if(response.ok){
                setNombre("")
                setCorreo("")
                setContraseña("")
                setMensaje({status: "success", message: "Se ha registrado exitosamente !"},
                navigate('/login')    

                )
            } else {
                setMensaje({status: "error", message: "Hubo un error durante la acción: ", error: data.message})
            }


        } catch (error) {
            setMensaje({status: "error", message: "Hubo un error, intentalo de nuevo!", error: error})
        }

    }
    return (
        <>
            <form onSubmit={submitHandler} className="flex flex-col items-center justify-center">

                <h1 className="text-xl m-10">Crear una cuenta</h1>

                <div className="flex flex-col gap-5">
                    <div className="flex flex-col">
                        <label htmlFor="name">Nombre</label>
                        <input className=" w-52 h-10 border-2 border-gray-900 rounded-md" type="text" name="name" id="name" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email">Correo</label>
                        <input className=" w-52 h-10 border-2 border-gray-900 rounded-md" type="email" name="email" id="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password">Contraseña</label>
                        <input className=" w-52 h-10 border-2 border-gray-900 rounded-md" type="password" name="password" id="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />
                    </div>
                </div>
                <button className="w-40 h-10 rounded-md m-10" type="submit">Registrase</button>
            </form>

            {mensaje &&(
                    <p className={`text-center m-2 ${mensaje.status === "success" ? "text-green-500" : "text-red-500"}`}>{mensaje.message}</p>
            )}

            <div className="flex justify-center gap-2">
                <p>Ya eres usuario en <span className="text-black font-bold">e-Library?</span></p>
                <Link to={'/login'} className="text-blue-600 underline-offset-1 hover:underline ">Ingresar</Link>
            </div>
        </>
    )
}

export default SignUp