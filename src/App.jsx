import { useState, useEffect } from 'react'

import { NavBar } from './components/NavBar/NavBar';

import './App.css'

import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import { useGameData } from './components/dataFetch';



const App = () => {
  const { initialData, error, loading } = useGameData();

  // const [gameData, setGameData ] = useState([])
  const [shoppingCart, setCart] = useState([])
  const [gamePrice, setPrice] = useState(39.99)


  function handleCartAdd(newGame) {
    const oldCart = [...shoppingCart]
    const inCart = checkForRepeat(oldCart, newGame)
    console.log(inCart)
    if (inCart) {
      newGame.gameQuantity += 1
      console.log(newGame)
    } else {
      newGame.gameQuantity = 1;
      oldCart.push(newGame)
      console.log(oldCart)
      setCart(oldCart)
    }
    
  }

  function handleCartDelete(removeGame) {
    const oldCart = [...shoppingCart]
    console.log(removeGame)
    oldCart.forEach(game => {
      const gameIndex = oldCart.indexOf(game)
      if (game.id === removeGame.id) {
        oldCart.splice(gameIndex, 1)
      }
    })
    setCart(oldCart)
  }

  function checkForRepeat(oldCart, newGame) {
    for (let i = 0; i < oldCart.length; i++) {
      if (oldCart[i] === newGame) {
        return true
      }
    }
    return false
  }


  if (error) return <h2>A network error has occured</h2>

  return (

    
    <> 
      <NavBar 
      
      />
      {loading ? <h1>Loading ...</h1> 
      : (<Outlet context={{
          initialData,
          shoppingCart,
          setCart,
          handleCartAdd,
          handleCartDelete,
          gamePrice
        }}/>)}
      
      
    </>
    
  )
}

export default App
