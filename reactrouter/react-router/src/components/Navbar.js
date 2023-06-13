//2 - links com react router

import "./Navbar.css"
import {NavLink} from "react-router-dom"

const Navbar = () => {
  return (
    <nav>
        {/* <Link to="/">Home</Link>
        <Link to="/about">Sobre</Link> */}
        <NavLink to="/" 
        /*className={({isActive}) => (isActive ? "esta-ativo" : "nao-ativo")}*///-posso usar caso eu queira usar meu padrao de link ativo, mas nao é necessário
        >Home</NavLink>
        <NavLink to="/about">Sobre</NavLink>
    </nav>
    )
}

export default Navbar