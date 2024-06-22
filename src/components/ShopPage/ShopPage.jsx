import { useOutletContext } from "react-router-dom"
import shopStyles from './ShopPage.module.css'
import { useEffect, useState } from "react"


export const ShopPage = () => {
    const { initialData, shoppingCart, handleCartAdd, gamePrice } = useOutletContext()
    const tempData = initialData

    const [query, setQuery] = useState('')
    const [activeList, setActiveList] = useState(tempData);

    useEffect(() => {
        getFilteredGames(query, initialData)
    }, [query, initialData])

    const getFilteredGames = (query, initialData) => {
        if (query === '') {
            setActiveList(initialData)
        } else {
            const newSearch = initialData.filter((game) => game.name.toLowerCase().includes(query.toLowerCase()))
            setActiveList(newSearch)
            return newSearch
        }
        
    }


    function handleGenreSearch(genreName) {
        console.log(genreName)
        if (genreName === 'all') {
            setActiveList(initialData)
        } else {
            const genresFiltered = initialData.filter((game) => 
                game.genres.some((genre) => {
                    return genre.name.toLowerCase() === genreName.toLowerCase()
                })
            )
            setActiveList(genresFiltered)
        }
    }


    return (
        <main className={shopStyles.shopContainer}>
            <section className={shopStyles.gameSelectContainer}>
                <div className={shopStyles.searchBarContainer}>
                    <label htmlFor="searchBar">Search by Name:</label>
                    <input 
                        type = "text"
                        name = "searchBar"
                        className={shopStyles.searchBar}
                        onChange={async (e) => {
                            setQuery(e.target.value)
                            
                        }}
                    />
                </div>
                <div className={shopStyles.genreSelectContainer}>
                    <label htmlFor="selectGenre">Search by Genre:</label>
                    <select
                        className={shopStyles.genreSelect}
                        onClick={(e) => handleGenreSearch(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="action">Action</option>
                        <option value="adventure">Adventure</option>
                        <option value="fighting">Fighting</option>
                        <option value="indie">Indie</option>
                        <option value="platformer">Platformer</option>
                        <option value="puzzle">Puzzle</option>
                        <option value="racing">Racing</option>
                        <option value="rpg">RPG</option>
                        <option value="shooter">Shooter</option>
                        <option value="sports">Sports</option>
                    </select>
                </div>
            </section>
            <section className={shopStyles.gameListContainer}>
                {activeList.map((game) => {
                    const releaseDate = game.released.substring(0, 4)
                    let tempName;

                    if (game.name.length > 32) {
                        tempName = game.name
                        tempName = tempName.substring(0, 31) + '...'
                    }

                    return (
                        <div className={shopStyles.gameCardContainer} key={game.id}>
                            <div className={shopStyles.gameCard}>
                                <div 
                                    className={shopStyles.gameImage}
                                    style={{backgroundImage: `url(${game.background_image})`}}
                                >
                                </div>
                                <div className={shopStyles.gameInfo}>
                                    <div className={shopStyles.gameDescription}>
                                        <h4 className={shopStyles.gameTitle}>
                                            {tempName ? tempName : game.name}
                                        </h4>
                                        <div className={shopStyles.yearAndGenre}>
                                            <p> {releaseDate} -</p>
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
                                        <h4 className={shopStyles.priceTag}> ${gamePrice} </h4>
                                        <button
                                            className={shopStyles.addToCartBtn}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handleCartAdd(game);
                                            }}
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