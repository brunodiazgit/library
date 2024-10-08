import { Link } from "react-router-dom"

function Hero() {
    return (
            <div className="bg-[url('/vintage-books-dark.png')] bg-cover bg-center min-h-screen flex items-center justify-center">
                <Link to={'/home'} className="h-10  w-60 text-xl rounded-md border border-green-700 text-green-500 flex items-center justify-center">Ver Titulares disponibles</Link>
            </div>
    )
}

export default Hero