import { describe, expect, it, test, vi } from 'vitest'
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { routes } from '../routes';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';


window.fetch = vi.fn(() => {
    const user = { name: 'Albus', phone:'630-888-7755'};

    return Promise.resolve({
        json: () => Promise.resolve(user)
    })
    
})

describe('API fetch', () => {
    const router = createBrowserRouter(routes)

    it('loads "loading" screen while API is being fetched', async () => {
        render(<RouterProvider router={router} />);

        screen.debug()
        const loading = screen.getByText('Loading ...')

        expect(loading).toBeInTheDocument();

        await waitForElementToBeRemoved(() => screen.getByText('Loading ...'))
    })
})