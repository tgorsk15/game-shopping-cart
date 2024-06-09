import { useOutletContext } from "react-router-dom"


export const Cart = () => {
    // needs to recieve the activeCart state, which points to which 
    // items are in the active cart
    const { shoppingCart, handleCartDelete } = useOutletContext();

console.log(shoppingCart)

    return (
        <main>
            <div>
                I am the cart
            </div>
        </main>
    )
}