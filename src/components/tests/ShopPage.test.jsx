import { afterEach, describe, expect, it, test, vi } from 'vitest'
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ShopPage } from '../ShopPage/ShopPage';

describe("Shop Page", () => {
    // test to make sure item gets added to cart
    // ... will probably create mock data to achieve this

    it('item is added to cart on button click', async () => {
        const handleAddItem = () => {
            console.log('added')
        }

        const user = userEvent.setup()

        render(<ShopPage handleAddItem={handleAddItem} />)

        const addButton = screen.getAllByRole("button", {name: "Add to Cart"})
        console.log(addButton)

        await user.click(addButton);

        expect(handleAddItem).toHaveBeenCalled();

        screen.debug()
    })
})