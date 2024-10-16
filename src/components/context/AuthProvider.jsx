/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react"
import { jwtDecode} from "jwt-decode"

export const AuthContext = createContext()

function AuthProvider({children}){
    const[user, setUser] = useState(null)

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            const decoded = jwtDecode(token)
            setUser({
                id: decoded.id,
                nombre: decoded.nombre,
                correo: decoded.correo,
                rol: decoded.rol
            })
        }
    },[])

    const login =(token)=>{
        localStorage.setItem('token', token)
        const decoded = jwtDecode(token)
        setUser({
            id: decoded.id,
            nombre: decoded.nombre,
            correo: decoded.correo,
            rol: decoded.rol
        })
    }

    const logout = ()=>{
        localStorage.removeItem('token')
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider