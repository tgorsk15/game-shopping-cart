import homeStyles from './HomePage.module.css'

export const HomePage = () => {



    return (
        <main className={homeStyles.homePage}>
            <div className={homeStyles.homeContainer}>
                We are Home
                <div className={homeStyles.topSection}>
                    {/* give this container a background image */}
                    <h1 className={homeStyles.homeSlogan}>
                        Unleash your Gaming
                    </h1>
                </div>
                <div className={homeStyles.bottomSection}>

                </div>
            </div>
        </main>
    )
}