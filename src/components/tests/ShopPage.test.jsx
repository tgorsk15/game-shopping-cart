import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, 
    Outlet, RouterProvider, createBrowserRouter,
    createMemoryRouter } from 'react-router-dom';

import { ShopPage } from '../ShopPage/ShopPage';
import App from '../../App';
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
    

    it('addButton exists on render', async () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ['/', '/shop'],
            initialIndex: 1,
        });

        render(<RouterProvider router={router} />);

        const addButton = await screen.findAllByText(/add to cart/i)

        expect(addButton[0]).toBeInTheDocument();

        screen.debug()
    })

    it('item is added to cart on addButton click', async () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ['/', '/shop'],
            initialIndex: 1,
        });

        const handleAddItem = vi.fn()

        const user = userEvent.setup()
        render(<RouterProvider router={router}/> );

        const addButton = await screen.findAllByText(/add to cart/i)

        await user.click(addButton[0]);

        expect(handleAddItem).toHaveBeenCalled(1);

        screen.debug()
    })
})

