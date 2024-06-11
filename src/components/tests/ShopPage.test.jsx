import { afterEach, describe, expect, it, test, vi } from 'vitest'
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, Outlet } from 'react-router-dom';

import { ShopPage } from '../ShopPage/ShopPage';
import { App } from '../../App';

describe("Shop Page", () => {
    // test to make sure item gets added to cart
    // ... will probably create mock data to achieve this

    it('item is added to cart on button click', async () => {
        const handleAddItem = () => {
            console.log('added')
        }
        const gameData = [{ id: 1, name: 'Game 1' }];
        const shoppingCart = [];

        const user = userEvent.setup()

        // render(<ShopPage handleAddItem={handleAddItem} />)

        render(
            <MemoryRouter initialEntries={['/shop']}>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route path="shop" element={<ShopPage />} />
                    </Route>
                </Routes>
            </MemoryRouter>,
            {
                wrapper: ({ children }) => (
                    <Outlet context={{ gameData, shoppingCart, handleAddItem }}>
                        {children}
                    </Outlet>
                ),
            }
        );

        const addButton = screen.getAllByRole("button", {name: "Add to Cart"})
        console.log(addButton)

        await user.click(addButton[0]);

        expect(handleAddItem).toHaveBeenCalled(1);

        screen.debug()
    })
})