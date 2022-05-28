import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
//action variables
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  //for loading
  GET_PRODUCTS_BEGIN,
  //get products without error
  GET_PRODUCTS_SUCCESS,
  //to handle error
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

const openSidebar  = () => {
  dispatch({type : SIDEBAR_OPEN})
}
const closeSidebar  = () => {
  dispatch({type : SIDEBAR_CLOSE})
}

//to fetch products from API.
  const fetchProducts = async(url) => {
    dispatch({type: GET_PRODUCTS_BEGIN })
    try {
      const response = await axios.get(url)
      const products = response.data
      dispatch({type: GET_PRODUCTS_SUCCESS, payload: products})
    } catch (error) {
      dispatch({type: GET_PRODUCTS_ERROR})
    }
    
    // console.log(response)
  }
  useEffect(() => {
    fetchProducts(url)
  },[])

  return (
    <ProductsContext.Provider value={{...state, openSidebar, closeSidebar}}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
