import { useOutletContext } from "react-router-dom"
import cartStyles from './Cart.module.css'


export const Cart = () => {
    // needs to recieve the activeCart state, which points to which 
    // items are in the active cart
    const { shoppingCart, handleCartDelete } = useOutletContext();

console.log(shoppingCart)

// create a test file that ensures the Order Total Calculation 
// is being done in the right way

// 6/9/24: After I am done building skeleton of Cart, I should write an
// implementation test that checks if items are added to cart on Shop page

    return (
        <main className={cartStyles.cartPage}>
            {shoppingCart.length > 0 ? (
                <section className={cartStyles.itemsSection}>
                    {shoppingCart.map((item) => {
                        {console.log(item)}
                        return (
                            <div className={cartStyles.itemContainer} key={item.id}>
                                <div 
                                    className={cartStyles.gameImage}
                                    style={{backgroundImage: `url(${item.background_image})`}}
                                >
                                </div>
                            </div>
                        )
                    })

                    }
                </section>
            ) : (
                <h1> you no items in your cart currently</h1>
            )}
            
            <aside className={cartStyles.checkoutSection}>
                <h2 className={cartStyles.orderSummary}>Your Order:</h2>
                <div className={cartStyles.orderContainer}>
                    {/* will have to set up a totalCost state to
                    show order details here */}
                </div>
            </aside>
        </main>
    )
}