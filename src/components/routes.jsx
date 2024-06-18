import App from "../App";
import { HomePage } from "./HomePage/HomePage";
import { ShopPage } from "./ShopPage/ShopPage";
import { Cart } from "./Cart/Cart";


export const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "home", element: <HomePage /> },
            { path: "shop", element: <ShopPage /> },
            { path: "cart", element: <Cart /> },
        ]
    }
]

// export default routes