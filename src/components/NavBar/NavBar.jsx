import { Link } from "react-router-dom"
import navStyles from './NavBar.module.css'


export const NavBar = () => {


    return (
        <nav>
            <div className={navStyles.navBarContainer}>
                <Link to="home" className={navStyles.navBtn}>
                    Home
                </Link>
                <Link to="shop" className={navStyles.navBtn}>
                    Shop
                </Link>
                <Link to="cart" className={navStyles.navBtn}>
                    Cart
                </Link>
            </div>
        </nav>
    )
}