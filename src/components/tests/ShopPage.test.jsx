import { afterEach, describe, expect, it, test, vi } from 'vitest'
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, 
    Outlet, RouterProvider, createBrowserRouter,
    createMemoryRouter } from 'react-router-dom';

import { ShopPage } from '../ShopPage/ShopPage';
import App from '../../App';
import { routes } from '../routes';

describe("Shop Page", () => {
    // test to make sure item gets added to cart

    it('item is added to cart on button click', async () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ['/', '/shop'],
            initialIndex: 1,
        });

        const handleAddItem = () => {
            console.log('added')
        }
        const gameData = [{ id: 1, name: 'Game 1' }];
        const shoppingCart = [];

        const user = userEvent.setup()

        // render(<ShopPage handleAddItem={handleAddItem} />)

        render(<RouterProvider router={router} />);

        // const addButton = await screen.findAllByText("button", {name: "Add to Cart"})
        const addButton = await screen.findAllByText("Add To Cart")
        console.log(addButton)

        expect(addButton).toBeInTheDocument();

        await user.click(addButton[0]);

        expect(handleAddItem).toHaveBeenCalled(1);

        screen.debug()
    })
})


// render(
        //     <MemoryRouter initialEntries={['/shop']}>
        //         <Routes>
        //             <Route path="/" element={<App />}>
        //                 <Route path="shop" element={<ShopPage />} />
        //             </Route>
        //         </Routes>
        //     </MemoryRouter>,
        //     {
        //         wrapper: ({ children }) => (
        //             <Outlet context={{ gameData, shoppingCart, handleAddItem }}>
        //                 {children}
        //             </Outlet>
        //         ),
        //     }
        // );