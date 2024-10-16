import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { AuthContext } from "./context/AuthProvider"

function NavBar() {
    const { user, logout } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = () => {
        setIsOpen(false);
    };

    return (
        <header>
            <nav className="flex items-center justify-evenly gap-5 bg-amber-950 text-white h-24">
                <div>
                    <Link to={'/'} className="tracking-wide text-2xl">e-Library</Link>
                </div>

                {user ? (
        <div className="relative inline-block text-left">
        {/* Botón del menú */}
        <button 
            onClick={toggleDropdown} 
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2  text-sm font-medium text-white"
        >
            {user.nombre}
        </button>

        {/* Contenido del menú desplegable */}
        {isOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                    <a 
                        href="#opcion1" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                        onClick={handleOptionClick}
                    >
                        Prestamos activos
                    </a>
                    <a 
                        href="#opcion2" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                        onClick={logout}
                    >
                        Cerrar sesión
                    </a>
                </div>
            </div>
        )}
    </div>
                ) : (<ul className="flex gap-5 text-xl">
                    <Link to={'/login'} className="text-white">Iniciar sesión</Link>
                </ul>)}

            </nav>
        </header >
    )
}

export default NavBar