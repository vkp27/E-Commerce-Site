import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
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
  PrivateRoute, 
} from './pages'

function App() {

  return (
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
        <Route exact path='/checkout' element= {<Checkout/>} />
        <Route path='*' element={<Error/>} />
      </Routes>
      <Footer />
    </Router>
  );  
}

export default App
