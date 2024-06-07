import { useState } from 'react'

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

  console.log(initialData)
  console.log(error)
  console.log(loading)

  // if (loading) return 

  return (

    
    <> 
      <NavBar 
      
      />
      {/* <PageContainer 
      
      /> */}
      {loading ? <h1>Loading ...</h1> : (<Outlet />)}
      
      
    </>
    
  )
}

export default App
