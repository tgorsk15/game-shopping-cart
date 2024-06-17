import { useOutletContext } from "react-router-dom"
import cartStyles from './Cart.module.css'
import { useState } from "react";


export const Cart = () => {
    // needs to recieve the activeCart state, which points to which 
    // items are in the active cart
    const { shoppingCart, setCart, handleCartDelete, gamePrice } = useOutletContext();

    console.log(shoppingCart)

    // create a test file that ensures the Order Total Calculation 
    // is being done in the right way
    function handleQuantityChange(amount, itemID) {
        
        const oldCart = [...shoppingCart]
        const activeIndex = getActiveIndex(oldCart, itemID)
        oldCart[activeIndex] = {
           ...oldCart[activeIndex], ["gameQuantity"]: amount
        } 
        console.log(oldCart)
        setCart(oldCart)

    }

    function getActiveIndex(cart, id) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === id) {
                return i
            }
        }
    }


    return (
        <main className={cartStyles.cartPage}>
            {shoppingCart.length > 0 ? (
                <section className={cartStyles.itemsSection}>
                    {shoppingCart.map((item) => {
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
                                                value={item.gameQuantity}
                                                onChange={(e) => {
                                                    e.preventDefault()
                                                    handleQuantityChange(e.target.value, item.id)
                                                }}
                                            />
                                            {/* <button 
                                                className={cartStyles.saveAmount}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                }}
                                            >
                                                Save
                                            </button> */}
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
                    })}
                </div>
                <div className={cartStyles.costContainer}>

                </div>
            </aside>
        </main>
    )
}