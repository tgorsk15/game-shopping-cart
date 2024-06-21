import { useOutletContext } from "react-router-dom"
import cartStyles from './Cart.module.css'
import { useEffect, useRef, useState } from "react";


export const Cart = () => {
    // shoppingCart shows what items the user has added to buy
    const { shoppingCart, setCart, handleCartDelete, gamePrice, getNumItems } = useOutletContext();

    const [totalCost, setCost] = useState(0)
    const taxAmount = useRef(0)
    const shippingCost = 10;
    const taxRate = .11

    useEffect(() => {
        const result = getTotalCost(shoppingCart)

    }, [shoppingCart])

    // create a test file that ensures the Order Total Calculation 
    // is being done in the right way
    function handleQuantityChange(amount, itemID) {
        const numAmount = Number(amount)
        const oldCart = [...shoppingCart]
        const activeIndex = getActiveIndex(oldCart, itemID)
        oldCart[activeIndex] = {
           ...oldCart[activeIndex], ["gameQuantity"]: numAmount
        } 
        console.log(oldCart)
        setCart(oldCart)
        getNumItems(oldCart)
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
        for (let i = 0; i < cart.length; i++) {
            const gameAmount = cart[i].gameQuantity
            total += gamePrice * gameAmount
        }
        taxAmount.current = roundUpNum(total * taxRate);
        
        total += taxAmount.current + shippingCost
        total = roundUpNum(total)
        setCost(total)
    }

    function roundUpNum (num) {
        return parseFloat(num.toFixed(2))
    }

    function handleIncrement(amount, itemID) {
        if (amount < 50) {
            const newAmount = amount + 1
            handleQuantityChange(newAmount, itemID)  
        }
        

    }

    function handleDecrement(amount, itemID) {
        if (amount > 0) {
            const newAmount = amount - 1
            handleQuantityChange(newAmount, itemID)
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
                                            <div className={cartStyles.quantityContainer}>
                                                <button 
                                                    className={cartStyles.incrementBtn}
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        handleIncrement(item.gameQuantity, item.id)
                                                    }}
                                                >
                                                    +
                                                </button>
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
                                                <button 
                                                    className={cartStyles.decrementBtn}
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        handleDecrement(item.gameQuantity, item.id)
                                                    }}
                                                >
                                                    -
                                                </button>
                                            </div>
                                            
                                        </form>
                                        <button
                                            className={cartStyles.removeFromCartBtn}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handleCartDelete(item)
                                            }}
                                        >
                                            X Remove
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
                                   $ {roundUpNum(item.gameQuantity * gamePrice)}
                                </p>
                            </div>
                            )
                        })}
                    </div>
                ) : (
                   <h3 className={cartStyles.noItemsMessage}>No items</h3>
                )}
                
                <div className={cartStyles.costContainer}>
                    {shoppingCart.length > 0 ? (
                        <div className={cartStyles.shippingAndTaxes}>
                            <div className={cartStyles.taxInfo}>
                                <h4 className={cartStyles.taxTitle}>
                                    Taxes:
                                </h4>
                                <p className={cartStyles.taxAmounts}>
                                    $ {taxAmount.current}
                                </p>
                            </div>
                            <div className={cartStyles.shippingInfo}>
                                <h4 className={cartStyles.taxTitle}>
                                    Shipping:
                                </h4>
                                <p className={cartStyles.shippingAmount}>
                                    $ {shippingCost}
                                </p>
                            </div>
                            <div className={cartStyles.totalCostInfo}>
                                <h4 className={cartStyles.totalTitle}>
                                    Total Cost:
                                </h4>
                                <p className={cartStyles.totalAmount}>
                                    $ {totalCost}
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