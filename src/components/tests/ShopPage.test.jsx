import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, 
    Outlet, RouterProvider, createBrowserRouter,
    createMemoryRouter, useOutletContext } from 'react-router-dom';

import { ShopPage } from '../ShopPage/ShopPage';
import { routes } from '../routes';
import { useGameData } from '../dataFetch';

// fake data for second test
// const data = [
//     {
//         id: 1, name: 'Game 1',
//         released: '2004',
//         background_image: 'pic',
//         genres: ['Shooter', 'Action']
//     },
//     {
//         id: 2, name: 'Game 2',
//         released: '2005',
//         background_image: 'pic2',
//         genres: ['RPG']
//     },
// ]

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
        // const router = createMemoryRouter(routes, {
        //     initialEntries: ['/', '/shop'],
        //     initialIndex: 1,
        // });

        // vi.mock("react-router-dom", async (importOriginal) => {
        //     const actual = await importOriginal()
        //     return {
        //         actual, useOutletContext: vi.fn()
        //     }
            
            
        // })

        // const handleAddItem = vi.fn()

        const user = userEvent.setup()
        

        // const mockContext = {
        //     gameData: data,
        //     shoppingCart: null,
        //     handleCartAdd: handleAddItem
        // }

        // gameData={data} handleCartAdd={handleAddItem}
        // useOutletContext.mockReturnValue(mockContext)
        // render(<ShopPage  />)
        render(<RouterProvider router={router}/> );

        const addButton = await screen.findByText(/add to cart/i)

        expect(addButton).toBeInTheDocument()

        await user.click(addButton);

        screen.debug()

        // const addButton2 = await screen.findByTestId("CartButton")
        // expect(addButton2).toBeInTheDocument()

        

        const addedItem = await screen.findByTestId("Game 1")

        expect(addedItem).toBeInTheDocument();

        screen.debug()
    })
})

