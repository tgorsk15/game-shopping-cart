import { useOutletContext } from "react-router-dom"
import cartStyles from './Cart.module.css'
import { useEffect, useRef, useState } from "react";


export const Cart = () => {
    // shoppingCart shows what items the user has added to buy
    const { shoppingCart, setCart, handleCartDelete, gamePrice } = useOutletContext();

    const [totalCost, setCost] = useState(0)
    // let taxAmount = 0;
    const taxAmount = useRef(0)
    const shippingCost = 10;
    const taxRate = .10

    useEffect(() => {
        const result = getTotalCost(shoppingCart)

    }, [shoppingCart])

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

    function getTotalCost(cart) {
        let total = 0;
        for (let i = 0; i <cart.length; i++) {
            const gameAmount = cart[i].gameQuantity
            total += (gamePrice * gameAmount)
        }
        // tax = total * taxRate

        taxAmount.current = total * taxRate;
        

        total += taxAmount.current + shippingCost
        console.log(total)
        setCost(total)
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
                <h2 className={cartStyles.orderTitle}>Your Order:</h2>
                {shoppingCart.length > 0 ? (
                    <div className={cartStyles.orderListContainer}>
                        {shoppingCart.map((item) => {
                            return (
                            <div className={cartStyles.orderItemsList} key={item.id}>
                                <div className={cartStyles.itemInfo}>
                                    <h4 className={cartStyles.cartItemName}>
                                        {item.name} 
                                    </h4>
                                    <h5 className={cartStyles.itemAmount}>
                                        x{item.gameQuantity}
                                    </h5>   
                                </div>
                                
                                <p className={cartStyles.itemCost}>
                                   $ {item.gameQuantity * gamePrice}
                                </p>
                            </div>
                            )
                        })}
                    </div>
                ) : (
                   <h3>No items</h3>
                )}
                
                <div className={cartStyles.costContainer}>
                    {shoppingCart.length > 0 ? (
                        <div className={cartStyles.shippingAndTaxes}>
                            <div className={cartStyles.taxInfo}>
                                <h4 className={cartStyles.taxTitle}>
                                    Taxes:
                                </h4>
                                <p className={cartStyles.taxAmounts}>
                                    {taxAmount.current}
                                </p>
                            </div>
                            <div className={cartStyles.shippingInfo}>
                                <h4 className={cartStyles.taxTitle}>
                                    Shipping:
                                </h4>
                                <p className={cartStyles.shippingAmount}>
                                    {shippingCost}
                                </p>
                            </div>
                            <div className={cartStyles.totalCostInfo}>
                                <h4 className={cartStyles.totalTitle}>
                                    Total Cost:
                                </h4>
                                <p className={cartStyles.totalAmount}>
                                    {totalCost}
                                </p>
                            </div>
                            
                        </div>
                    ) : (
                        <h3>No items</h3> 
                    )}
                </div>
            </aside>
        </main>
    )
}