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
                {gameData.map((game) => {
                    const releaseDate = game.released.substring(0, 4)
                    return (
                        <div className={shopStyles.gameCardContainer} key={game.id}>
                            <div className={shopStyles.gameCard}>
                                <div className={shopStyles.gameImage}>

                                </div>
                                <div className={shopStyles.gameInfo}>
                                    <div className={shopStyles.gameDescription}>
                                        <h4 className={shopStyles.gameTitle}>
                                            {game.name}
                                        </h4>
                                        <div className={shopStyles.yearAndGenre}>
                                            <p> {releaseDate} </p>
                                            <p> {
                                                    game.genres.map((genre) => {
                                                        if (genre.name === "Massively Multiplayer") {
                                                            return
                                                        }
                                                        return genre.name
                                                    }).join(', ')
                                                } 
                                            </p> 
                                        </div>
                                        
                                    </div>
                                    <div className={shopStyles.buyContainer}>
                                        <h4 className={shopStyles.priceTag}> $39.99 </h4>
                                        <button
                                            className={shopStyles.addToCartBtn}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>  
                            </div>
                            
                            
                        </div>
                    )
                })}
            </section>
        </main>
    )
}