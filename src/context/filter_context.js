import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  //this array is always gonna change as we change the filters.
  filtered_products: [],
  //this array contains all the products i.e. default array
  all_products: [],
  grid_view: true,
  sort: 'price-lowest',
  //setting up object that contains default values for various filters.
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  //we cannot directly pass products to state value instead we need to setup useEffect.
  const {products} = useProductsContext()
  const [state, dispatch] = useReducer(reducer, initialState)

  //initially products array is empty in products context as well but as products changes we invoke the dispatch with required action.
  useEffect(() => {
    dispatch({type: LOAD_PRODUCTS, payload: products})
  },[products])

  //useEffect to setup sort functionality and set placeholder everytime we change something in our filters 
  useEffect(() => {
    dispatch({type: FILTER_PRODUCTS})
    dispatch({type: SORT_PRODUCTS})
  },[products, state.sort,state.filters])

  //setup two functions to dispatch two actions for toggling grid and list view

  const setGridView = () => {
    dispatch({type: SET_GRIDVIEW})
  }

  const setListView = () => {
    dispatch({type: SET_LISTVIEW})
  }
  
  const updateSort = (e) => {
    //name is only for demonstration
    //const name = e.target.name
    const value = e.target.value
    dispatch({type: UPDATE_SORT, payload: value})
  }
  //we invoke this function whenever we update our filters.
  const updateFilters = (e) => {
    let name = e.target.name
    let value = e.target.value
    if(name === 'category') {
      //to fetch the text which is inside of the button as value property cannot fetch the text in case of a button 
      value = e.target.textContent
    }
    if(name === 'color'){
      value = e.target.dataset.color
    }
    if(name === 'price'){
      value = Number(value)
    }
    if(name === 'shipping'){
      value = e.target.checked
    }
    dispatch({type: UPDATE_FILTERS, payload: {name,value} })
  }
  //we invoke this function when we clear all the filters.
  const clearFilters = () => {
    dispatch({type: CLEAR_FILTERS})
  }

  return (
    <FilterContext.Provider value={{...state, setGridView, setListView, updateSort, updateFilters, clearFilters}}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
