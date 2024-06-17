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
  // const [gameData, setGameData ] = useState([])
  const [shoppingCart, setCart] = useState([])
  const [gamePrice, setPrice] = useState('$39.99')

  // useEffect(() => {
  //   if (initialData) {
  //     setGameData(initialData);
  //   }
  // }, [initialData]);


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
          handleCartAdd,
          handleCartDelete,
          gamePrice
        }}/>)}
      
      
    </>
    
  )
}

export default App
