import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger';
import axios from 'axios';

//Actions
const ACT = {
  //ACT_1:...
  ADDTOCART: 'ADDTOCART',
  REMOVEFROMCART: 'REMOVEFROMCART',
  EDITCART: 'EDITCART',

}

//HelperFunction

//Creators (Action or Thunk)

const addToCart = (product) => {
  return {
      type: ACT.ADDTOCART,
      product: product,
  }
}
const removeFromCart = (product) => {
  return {
      type: ACT.REMOVEFROMCART,
      product: product,
  }
}


//Reducers

const value = 'placeholder'

const userReducer = (state={}, action) => {
  switch (action) {
    case value:
      return;
  
    default:
      return state;
  }
};

const usersReducer = (state=[], action) => {
  switch (action) {
    case value:
      return;
  
    default:
      return state;
  }
}; //isAuth ? allUsers : null

const ordersReducer = (state=[], action) => {
  switch (action) {
    case value:
      return;
  
    default:
      return state;
  }
}; //userId => [{orderId: ..., status:'inCart'}, {}]

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case value:
      return
    default:
      return state;
  }
};

const cartReducer = (state = [{id: '1', name: 'Acetaminophen', quantity: 2, price: 3.49}], action) => {
  switch (action.type) {
    case ACT.ADDTOCART:
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.product.id) {
          state[i].quantity++;
          return state;
        }
      }
      const newProd = action.product;
      newProd.quantity = 1;
      return [...state, action.product];
    case ACT.REMOVEFROMCART:
      return state.filter(prod => prod !== product);
    default:
      return state;
  }
};

//Store
export default createStore(
  combineReducers({
    user: userReducer,
    users: usersReducer,
    orders: ordersReducer,
    products: productsReducer, //TODO: refactor to limit number of products downloaded
    cart: cartReducer
  }),
  applyMiddleware(loggingMiddleware, thunkMiddleware.withExtraArgument(axios))
);

export { addToCart, removeFromCart }