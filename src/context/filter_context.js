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

  //setup two functions to dispatch two actions for toggling grid and list view

  const setGridView = () => {
    dispatch({type: SET_GRIDVIEW})
  }

  const setListView = () => {
    dispatch({type: SET_LISTVIEW})
  }
  

  return (
    <FilterContext.Provider value={{...state, setGridView, setListView}}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
