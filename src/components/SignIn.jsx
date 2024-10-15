import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

function SignIn() {
    const [correo, setCorreo] = useState("")
    const [contraseña, setContraseña] = useState("")
    const [mensaje, setMensaje] = useState(null)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:3900/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    correo,
                    contraseña
                })
            })

            const data = await response.json()

            if (response.ok) {
                setCorreo("")
                setContraseña("")

                localStorage.setItem('token', data.token)

                navigate('/')
            } else {
                setMensaje("El correo electrónico o contraseña son erroneos !")
            }
        } catch (error) {
            setMensaje("Ha ocurrido un error, intentalo de nuevo !")
            console.log(error)
        }
    }

    return (
        <>

            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">

                <h1 className="text-xl m-10">Bienvenido</h1>

                <div className="flex flex-col gap-5">
                    <div className="flex flex-col">
                        <label htmlFor="email">Correo</label>
                        <input className=" w-52 h-10 border-2 border-gray-900 rounded-md" type="email" name="email" id="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password">Contraseña</label>
                        <input className=" w-52 h-10 border-2 border-gray-900 rounded-md" type="password" name="password" id="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />
                    </div>
                </div>

                <button className="w-40 h-10 rounded-md m-10" type="submit">Ingresar</button>
            </form>

            {mensaje && (
                <p className="text-red-500 text-center m-2">{mensaje}</p>
            )}

            <div className="flex justify-center gap-2">
                <p>Eres nuevo en <span className="text-black font-bold">e-Library?</span></p>
                <Link to={'/register'} className="text-blue-600 underline-offset-1 hover:underline ">Crear una cuenta</Link>
            </div>
        </>
    )
}

export default SignIn