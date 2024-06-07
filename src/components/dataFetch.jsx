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

        // let gameData;
        // let gameData2;
        // let dataLoaded = false
        function handleMergeData(gameData, gameData2) {
            const mergedData = gameData.concat(gameData2)
            console.log(mergedData)
        }
        

        const fetchData = async () => {
            try {
                const response = await fetch(url, {mode: 'cors'})

                if (!response.ok) {
                    throw new Error('Request failed');
                }

                const tempData = await response.json();
                const gameData = tempData.results
                console.log(gameData)

                fetchData2(gameData);

            } catch(error) {
                console.log(error)
                setError(error)
            }

            
        }

        const fetchData2 = async (gameData) => {
            try {
                const response2 = await fetch(url2, {mode: 'cors'})

                if (!response2.ok) {
                    throw new Error('Request failed');
                }

                const tempData2 = await response2.json();
                const gameData2 = tempData2.results
                console.log(gameData2)

                handleMergeData(gameData, gameData2)
                

            } catch(error) {
                console.log(error)
                setError(error)
            } finally {
                setLoading(false)
            }

            
        }


        fetchData();
        // console.log(gameData)
        // console.log(gameData2)
        
        // if (dataLoaded === false) {
        //     const mergedData = gameData.concat(gameData2)
        //     console.log(mergedData)
        // }
        
    }, [])

    

        return { initialData, error, loading }

    
}