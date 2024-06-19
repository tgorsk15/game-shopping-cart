import homeStyles from './HomePage.module.css'

import { Link } from "react-router-dom"

export const HomePage = () => {



    return (
        <main className={homeStyles.homePage}>
            <div className={homeStyles.homeContainer}>
                <div className={homeStyles.topSection}>
                    <h1 className={homeStyles.homeSlogan}>
                        Find your Inner Gamer
                    </h1>
                </div>
                <div className={homeStyles.bottomSection}>
                    <h2 className={homeStyles.bottomTitle}>
                        Welcome to one of the world's largest Video Game databases...
                    </h2>
                    <p className={homeStyles.bottomParagraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.
                        Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.
                    </p>
                    <div className={homeStyles.shopBtnContainer}>
                        <Link 
                            to="../shop" 
                            className={homeStyles.shopBtn}
                        >
                            Start Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}