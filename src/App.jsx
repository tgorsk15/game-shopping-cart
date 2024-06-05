import { useState } from 'react'

import { NavBar } from './components/NavBar/NavBar';
import { PageContainer } from './components/PageContainer/PageContainer';

import './App.css'

import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';



const App = () => {
  // const [count, setCount] = useState(0)

  // Cart amount state will have to be lifted up here, so that item details
  // can be passed to Cart page

  // can trigger

  return (
    
    <> 
      <NavBar 
      
      />
      {/* <PageContainer 
      
      /> */}
      <Outlet />
      
    </>
    
  )
}

export default App
