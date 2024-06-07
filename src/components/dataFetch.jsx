import { useEffect, useState } from "react"
import PropTypes from 'prop-types';

export const useGameData = () => {
    const [initialData, setInitialData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    // function mergeGameData()

    useEffect(() => {
        const url = 'https://api.rawg.io/api/games?key=f07b838fb5eb4376b7727a3e0f12ee7a';
        const url2 = 'https://api.rawg.io/api/games?key=f07b838fb5eb4376b7727a3e0f12ee7a&page=2';

        const mergedData = {}

        const fetchData = async () => {
            try {
                const response = await fetch(url, {mode: 'cors'})

                if (!response.ok) {
                    throw new Error('Request failed');
                }

                const gameData = await response.json();
                console.log(gameData)
                

            } catch(error) {
                console.log(error)
                setError(error)
            }

            fetchData2();
        }

        const fetchData2 = async () => {
            try {
                const response2 = await fetch(url2, {mode: 'cors'})

                if (!response2.ok ) {
                    throw new Error('Request failed');
                }

                const gameData2 = await response2.json();
                console.log(gameData2)
                

            } catch(error) {
                console.log(error)
                setError(error)
            } finally {
                setLoading(false)
            }

            // mergeGameData()
        }


        fetchData();
    }, [])

    

        return { initialData, error, loading }

    
}