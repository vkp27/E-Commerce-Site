import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'

//named import since we used named export in index.js
import {  
  Home,
  Products,
  SingleProduct,
  About,
  Cart,
  Error,
  Checkout,
  //PrivateRoute,
  AuthWrapper, 
} from './pages'

function App() {

  return (
    <AuthWrapper>
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/about' element=
        {<About />} />
        <Route exact path='/cart' element=
        {<Cart />} />
        <Route exact path='/products' element= {<Products/>} />
        <Route exact path='/products/:id' element={<SingleProduct />} />
        {/* instead of route we use private route to setup a private path */}
        
        <Route exact path='/checkout'  element= {
        // <PrivateRoute>
        //   <Checkout />
        // </PrivateRoute>
        <Checkout />
      } />
      
        <Route path='*' element={<Error/>} />
      </Routes>
      <Footer />
    </Router>
    </AuthWrapper>
  );  
}

export default App
