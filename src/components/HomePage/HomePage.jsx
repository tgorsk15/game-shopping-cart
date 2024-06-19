import homeStyles from './HomePage.module.css'

export const HomePage = () => {



    return (
        <main className={homeStyles.homePage}>
            <div className={homeStyles.homeContainer}>
                <div className={homeStyles.topSection}>
                    {/* give this container a background image */}
                    <h1 className={homeStyles.homeSlogan}>
                        Find your inner Gamer
                    </h1>
                </div>
                <div className={homeStyles.bottomSection}>

                </div>
            </div>
        </main>
    )
}