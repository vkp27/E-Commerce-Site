import {
    LOAD_PRODUCTS,
    SET_LISTVIEW,
    SET_GRIDVIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
  } from '../actions'
  
  const filter_reducer = (state, action) => {
    if(action.type === LOAD_PRODUCTS) {
      let maxPrice = action.payload.map((p) => p.price)
      maxPrice = Math.max(...maxPrice)
      
      return {
        ...state,
        //we use spread operator to fetch values and so on removing filters we can go  back to default values i.e. all products.
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: {...state.filters, max_price: maxPrice, price: maxPrice},
      }
    }
    // to toggle b/w grid view and list view
    if(action.type === SET_GRIDVIEW) {
      return {...state, grid_view: true}
    }
    if(action.type === SET_LISTVIEW) {
      return {...state, grid_view: false}
    }
    //for sorting
    if(action.type === UPDATE_SORT) {
      return {...state, sort: action.payload}
    }
    //sorting functionality

    if(action.type === SORT_PRODUCTS) {
      const {sort, filtered_products} = state
      let tempProducts = [...filtered_products]
      if(sort === 'price-lowest') {
        tempProducts = tempProducts.sort((a,b) => a.price - b.price)
      }
      if(sort === 'price-highest') {
        //sort function sorts elements on basis of some numeric value, in our case it's price
        tempProducts = tempProducts.sort((a,b) => b.price - a.price)
      }
      if(sort === 'name-a') {
        tempProducts = tempProducts.sort((a,b) => {
          return  a.name.localeCompare(b.name)
        })
      }
      if(sort === 'name-z') {
        tempProducts = tempProducts.sort((a,b) => {
          //localeCompare to sort the array elements on basis of their name.
          //inbuilt js function
          return  b.name.localeCompare(a.name)
        })
      }
      return {...state, filtered_products: tempProducts}
    }
    if(action.type === UPDATE_FILTERS){
      const {name, value} = action.payload
      return {...state,filters:{...state.filters, [name]:value}}
    }
    if(action.type === FILTER_PRODUCTS){
      console.log('filtering products')
      return {...state}
    }
    throw new Error(`No Matching "${action.type}" - action type`)
  }
  
  export default filter_reducer
  