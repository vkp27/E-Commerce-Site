import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

//function to check if localstorage has some value in the cart or is it empty
const getlocalstorage = () => {
  let cart = localStorage.getItem('cart')
  if(cart){
    //we parse it since we have it in form of string
    return JSON.parse(localStorage.getItem('cart'))
  }
  else{
    return []
  }
}
const initialState = {
  cart: getlocalstorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 1000,
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  const[state, dispatch] = useReducer(reducer, initialState)

  //add to cart
  const addToCart = (id, color, amount, product) => {
    dispatch({type: ADD_TO_CART, payload: {id,color, amount, product}})
  }
  //remove item
  const removeItem = (id) => {
    dispatch({type: REMOVE_CART_ITEM, payload: id})
  }
  //toggle amount
  const toggleAmount = (id, value) => {
    dispatch({type: TOGGLE_CART_ITEM_AMOUNT, payload:{id, value}})
  }
  //clear cart
  const clearCart = () => {
    dispatch({type: CLEAR_CART})
  }

  //setup useEffect to store cart items in localstorage everytime there is some change in the cart content
  useEffect(() => {
    //inorder to invoke the useEffect everytime we change something in cart we dispatch this action
    dispatch({type: COUNT_CART_TOTALS})
    //used to set key value pair in localstorage.
    //also the value stored is always a string value so we use stringify.
    localStorage.setItem('cart', JSON.stringify(state.cart))
  },[state.cart])

  return (
    <CartContext.Provider value={{...state, addToCart, removeItem, toggleAmount, clearCart}}>{children}</CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
