import { useOutletContext } from "react-router-dom"


export const ShopPage = () => {
    const { gameData } = useOutletContext()

    console.log(gameData)


    return (
        <>
            <div>
                You can shop here
            </div>
        </>
    )
}