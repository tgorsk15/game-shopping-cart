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
  const [emptyCart, setEmptyCart] = useState(true)
  const [gamePrice, setPrice] = useState(39.99)
  const [gameAmount, setGameAmount] = useState(0)


  function handleCartAdd(newGame) {
    const oldCart = [...shoppingCart]
    const inCart = checkForRepeat(oldCart, newGame)
    // console.log(inCart)
    if (inCart) {
      newGame.gameQuantity += 1
      getNumItems(oldCart)
    } else {
      newGame.gameQuantity = 1;
      oldCart.push(newGame)
      changeFromEmpty(oldCart)
      setCart(oldCart)
      getNumItems(oldCart)
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
    checkEmptyCart(oldCart)
    setCart(oldCart)
    getNumItems(oldCart)
  }

  function getNumItems(cart) {
    console.log(cart)
    let itemTotal = 0;
    for (let i = 0; i < cart.length; i++) {
        const gameAmount = cart[i].gameQuantity
        console.log(gameAmount)
        itemTotal += gameAmount
    }
    console.log(itemTotal)
    setGameAmount(itemTotal)
}

  function checkForRepeat(oldCart, newGame) {
    for (let i = 0; i < oldCart.length; i++) {
      if (oldCart[i] === newGame) {
        return true
      }
    }
    return false
  }

  function checkEmptyCart(currentCart) {
    if (currentCart.length < 1) {
      setEmptyCart(true)
    }
  }

  function changeFromEmpty(currentCart) {
    if (currentCart.length === 1) {
      setEmptyCart(false)
    }
  }


  if (error) return <h2>A network error has occured</h2>

  return (
    
    <> 
      <NavBar 
        emptyCart = {emptyCart}
        shoppingCart = {shoppingCart}
        gameAmount = {gameAmount}
      />
      {loading ? <h1>Loading ...</h1> 
      : (<Outlet context={{
          initialData,
          shoppingCart,
          setCart,
          handleCartAdd,
          handleCartDelete,
          gamePrice,
          getNumItems
        }}/>)}
      
      
    </>
    
  )
}

export default App
