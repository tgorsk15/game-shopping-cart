import { Link } from "react-router-dom"
import navStyles from './NavBar.module.css'


export const NavBar = () => {


    return (
        <nav>
            <div className={navStyles.navBarContainer}>
                <Link to="home">
                    Home
                </Link>
                <Link to="shop">
                    Shop
                </Link>
                <Link to="cart">
                    Cart
                </Link>
            </div>
        </nav>
    )
}