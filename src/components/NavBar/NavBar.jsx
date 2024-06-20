import { Link } from "react-router-dom"
import navStyles from './NavBar.module.css'


export const NavBar = () => {


    return (
        <nav>
            <div className={navStyles.navBarContainer}>
                <h1 className={navStyles.siteTitle}>
                    Nameee
                </h1>
                <div className={navStyles.linksContainer}>
                    <Link to="home" className={navStyles.navBtn}>
                        Home
                    </Link>
                    <Link to="shop" className={navStyles.navBtn}>
                        Shop
                    </Link>
                    <Link to="cart" className={navStyles.navCartBtn}>
                        Cart
                    </Link>
                </div>
                
            </div>
        </nav>
    )
}