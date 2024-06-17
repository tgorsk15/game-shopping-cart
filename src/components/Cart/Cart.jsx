import { useOutletContext } from "react-router-dom"
import cartStyles from './Cart.module.css'


export const Cart = () => {
    // needs to recieve the activeCart state, which points to which 
    // items are in the active cart
    const { shoppingCart, handleCartDelete, gamePrice } = useOutletContext();

    console.log(shoppingCart)

    // create a test file that ensures the Order Total Calculation 
    // is being done in the right way


    return (
        <main className={cartStyles.cartPage}>
            {shoppingCart.length > 0 ? (
                <section className={cartStyles.itemsSection}>
                    {shoppingCart.map((item) => {
                        // let gameQuantity = 1
                        return (
                            <div className={cartStyles.itemContainer} key={item.id} >
                                <div 
                                    className={cartStyles.gameImage}
                                    style={{backgroundImage: `url(${item.background_image})`}}
                                >
                                </div>
                                <div className={cartStyles.itemInfoContainer}>
                                    <h2 className={cartStyles.gameTitle} data-testid={item.name}>
                                        {item.name}
                                    </h2>
                                    <div className={cartStyles.quantityAndDelete}>
                                        <form className={cartStyles.quantityControls}>
                                            
                                            <label htmlFor="amount">Quantity:</label>
                                            <input 
                                                type="number"
                                                name="amount"
                                                className={cartStyles.amountInput}
                                                placeholder={item.gameQuantity}                                            />
                                            <button 
                                                className={cartStyles.saveAmount}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    // trigger cartState change
                                                }}
                                            >
                                                Save
                                            </button>
                                        </form>
                                        <button
                                            className={cartStyles.removeFromCartBtn}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                // trigger delete function here
                                                handleCartDelete(item)
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })

                    }
                </section>
            ) : (
                <h1> You have no items in your cart currently</h1>
            )}
            
            <aside className={cartStyles.checkoutSection}>
                <h2 className={cartStyles.orderSummary}>Your Order:</h2>
                <div className={cartStyles.orderItemsList}>
                    {shoppingCart.map((item) => {
                        console.log(item)
                    })}
                </div>
                <div className={cartStyles.costContainer}>

                </div>
            </aside>
        </main>
    )
}