import { useState, useEffect } from 'react'

import { NavBar } from './components/NavBar/NavBar';
import { PageContainer } from './components/PageContainer/PageContainer';

import './App.css'

import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import { useGameData } from './components/dataFetch';



const App = () => {
  const { initialData, error, loading } = useGameData();

  // Cart amount state will have to be lifted up here, so that item details
  // can be passed to Cart page
  const [gameData, setGameData ] = useState([])
  const [shoppingCart, setCart] = useState([])

  useEffect(() => {
    if (initialData) {
      setGameData(initialData);
    }
    // console.log(gameData)
  }, [initialData]);

  console.log(gameData)

function handleCartAdd(newGame) {
  const oldCart = [...shoppingCart]
  oldCart.push(newGame)
  console.log(oldCart)
  setCart(oldCart)
}

function handleCartDelete(deleteGame) {

}


  if (error) return <h2>A network error has occured</h2>

  return (

    
    <> 
      <NavBar 
      
      />
      {loading ? <h1>Loading ...</h1> 
      : (<Outlet context={{
          gameData,
          shoppingCart,
          handleCartAdd,
          handleCartDelete
        }}/>)}
      
      
    </>
    
  )
}

export default App
