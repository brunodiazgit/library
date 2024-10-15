import { Link } from "react-router-dom"

function NavBar(){
    return(
        <header>
            <nav className="flex items-center justify-evenly gap-5 bg-amber-950 text-white h-24">
                <div>
                    <Link to={'/'} className="tracking-wide text-2xl">e-Library</Link>
                </div>
                <ul className="flex gap-5 text-xl">
                    <Link to={'/login'} className="text-white">Cuenta</Link>
                </ul>
            </nav>
        </header>
    )
}

export default NavBar