import { afterEach, describe, expect, it, test, vi } from 'vitest'
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { routes } from '../routes';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';




describe('API fetch', () => {

    afterEach(() => {
        vi.resetAllMocks(); // Reset mocks after each test
    });

    const router = createBrowserRouter(routes)

    it('loads "loading" screen while API is being fetched', async () => {
        window.fetch = vi.fn(() => {
            const user = { name: 'Albus', phone:'630-888-7755'};

            return Promise.resolve({
                json: () => Promise.resolve(user)
            })
            
        })

        render(<RouterProvider router={router} />);

        screen.debug()
        const loading = screen.getByText('Loading ...')

        expect(loading).toBeInTheDocument();

        await waitForElementToBeRemoved(() => screen.getByText('Loading ...'))
    })

    // it('produces error message when fetch fails', async () => {
    //     // window.fetch.mockImplementationOnce(() => {
    //     //     return Promise.reject({message: 'API is down'});
    //     // });

    //     window.fetch = vi.fn(() => {
    //         return Promise.reject({
    //             message: 'API is down'
    //         })
            
    //     })

    //     render(<RouterProvider router={router} />)

    //     screen.debug()

    //     const errorMessage = await screen.findByText('API is down');
    //     expect(errorMessage).toBeInTheDocument()

    //     screen.debug()
    // })
})