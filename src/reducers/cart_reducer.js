import {
    ADD_TO_CART,
    CLEAR_CART,
    COUNT_CART_TOTALS,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
  } from '../actions'
  
  const cart_reducer = (state, action) => {
    if( action.type === ADD_TO_CART){
      //fetching items from payload that we dispatched along with the action
      const {id, color, amount, product} = action.payload
      //product id is mattched with id+color as same product could be chosen with different color 
      const tempItem = state.cart.find((i) => i.id === id+color)
      if(tempItem){
        const tempCart = state.cart.map((cartItem) => {
          if(cartItem.id === id + color){
            let newAmount = cartItem.amount + amount
            if(newAmount > cartItem.max) {
              newAmount = cartItem.max
            }
            return {...cartItem, amount: newAmount}
          }
          else{
            return cartItem
          }
        })
        return {...state, cart: tempCart}
      }
      else{
        //we setup a newItem object
        const newItem = {
          id: id+color,
          name: product.name,
          color,
          amount,
          //since images is an array so we access the first image
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        }
        return {...state,cart:[...state.cart,newItem]}
      }
    }
    throw new Error(`No Matching "${action.type}" - action type`)
  }
  
  export default cart_reducer
   