import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, 
    Outlet, RouterProvider, createBrowserRouter,
    createMemoryRouter, useOutletContext } from 'react-router-dom';

import { ShopPage } from '../ShopPage/ShopPage';
import { routes } from '../routes';
import { useGameData } from '../dataFetch';


// Mock the API
vi.mock('../dataFetch');

describe("Shop Page", () => {

    beforeAll(() => {
        // Mock the return value of useGameData
        useGameData.mockReturnValue({
            initialData: [{ 
                id: 1, name: 'Game 1',
                released: '2004',
                background_image: 'pic',
                genres: ['Shooter', 'Action'] 
            }],
            error: null,
            loading: false,
        });
    });

    // afterEach(() => {
    //     vi.restoreAllMocks();
    // })
    const router = createMemoryRouter(routes, {
        initialEntries: ['/', '/shop'],
        initialIndex: 1,
    });
    

    it('addButton exists on render', async () => {

        render(<RouterProvider router={router} />);

        const addButton = await screen.findAllByText(/add to cart/i)

        expect(addButton[0]).toBeInTheDocument();

        screen.debug()
    })

    it('item is added to cart on addButton click', async () => {
        const user = userEvent.setup()
        
        render(<RouterProvider router={router}/> );

        const addButton = await screen.findByText(/add to cart/i)
        expect(addButton).toBeInTheDocument()

        await user.click(addButton);

        screen.debug()

        // navigate to cart and check if the added game exists there
        const cartLink = await screen.findByRole('link', { name: /cart/i });
        expect(cartLink).toBeInTheDocument();

        await user.click(cartLink);
        const addedItem = await screen.findByTestId("Game 1")
        expect(addedItem).toBeInTheDocument()


        screen.debug()
    })
})

