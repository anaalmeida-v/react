//CSS 
import styles from './Navbar.module.css'

//Navlink
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/">
        Mini <span>Blog</span>
        <NavLink>
          <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/about'>About</NavLink></li>
          </ul>
        </NavLink>
      </NavLink>
    </nav>
  )
}

export default Navbar