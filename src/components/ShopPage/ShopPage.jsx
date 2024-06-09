import { useOutletContext } from "react-router-dom"
import shopStyles from './ShopPage.module.css'


export const ShopPage = () => {
    const { gameData } = useOutletContext()

    console.log(gameData)


    return (
        <main>
            <section className={shopStyles.gameSelectContainer}>
                Select youre game here
            </section>
            <section className={shopStyles.gameListContainer}>
                You can shop here
                {gameData.map((game) => {
                    return (
                        <div className={shopStyles.gameCardContainer} key={game.id}>
                            <div className={shopStyles.gameCard}>
                                <div className={shopStyles.gameImage}>

                                </div>  
                            </div>
                            
                            
                        </div>
                    )
                })}
            </section>
        </main>
    )
}