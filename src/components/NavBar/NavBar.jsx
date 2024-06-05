import { Link } from "react-router-dom"


export const NavBar = () => {


    return (
        <>
            <div>
                I am Nav Bar
            </div>
            <h3>
                <Link to="home">
                    Home
                </Link>
                <Link to="shop">
                    Shop
                </Link>
                <Link to="cart">
                    Cart
                </Link>
            </h3>
        </>
    )
}