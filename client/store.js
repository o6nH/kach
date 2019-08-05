import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger';
import axios from 'axios';

//Actions
const ACT = {
  //ACT_1:...

}

//HelperFunction

//Creators (Action or Thunk)


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

//Store
export default createStore(
  combineReducers({
    user: userReducer,
    users: usersReducer,
    orders: ordersReducer,
    products: productsReducer, //TODO: refactor to limit number of products downloaded
  }),
  applyMiddleware(loggingMiddleware, thunkMiddleware.withExtraArgument(axios))
);