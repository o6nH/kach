/* eslint-disable linebreak-style */
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger';
import axios from 'axios';

//Actions
const ACT = {
  ADDTOCART: 'ADDTOCART',
  REMOVEFROMCART: 'REMOVEFROMCART',
  EDITCART: 'EDITCART',
  GET_PRODUCTS: 'GET_PRODUCTS',
  SELECT_PRODUCT: 'SELECT_PRODUCT',
}

//HelperFunction
//Get object with `category-productArray` key-values
export const categorizeProducts = products => {
  return products.reduce((catProdObj, product) => {
    let {category} = product;
    if(typeof category === 'string' && category) {
      category = category[0].toUpperCase() + category.split('').slice(1).join('');
      if(catProdObj[category]) catProdObj[category].push(product);
      else catProdObj[category]=[product];     
    }
    else if (Array.isArray(category)) {
      category.forEach(_category => {
        if (catProdObj[_category]) catProdObj[_category].push(product)
        else catProdObj[_category] = [product]
      })
    } 
    else {
      console.log(`Error: Could not understand category property of product: ${product.productId}`)
    }
    return catProdObj;
  }, {})
};

//Get object with `category-productCountInt` key-values
export const getCategoryCounts = categorizedProducts => {
  return getCategories(categorizedProducts).reduce((categoryCounts, category) => {
    categoryCounts[category] = categorizedProducts[category].length;
    return categoryCounts;
  }, {})
};

//Get array of `category` strings
export const getCategories = categorizedProducts => Object.keys(categorizedProducts);

//Creators (Action or Thunk)
export const fetchProducts = () => (dispatch, getState, axios) => {
  axios.get('/api/products')
  .then(({data: products}) => dispatch({type: ACT.GET_PRODUCTS, products}))
  .catch(err => console.error(err));
};

const addToCart = (info) => (dispatch, getState, axios) => {
  console.log('info: ', info);
  axios.post('/api/orders', info)
    .then(({data: product}) => dispatch({
      type: ACT.ADDTOCART,
      product,
  }))
    .catch(err => console.error(err));
}

const removeFromCart = (product) => {
  return {
      type: ACT.REMOVEFROMCART,
      product: product,
  }
}

export const fetchSelectedProduct = (productId) => (dispatch, getState, axios) => {
  axios.get(`/api/products/${productId}`)
  .then(({data: selectedProduct}) => dispatch({type: ACT.SELECT_PRODUCT, selectedProduct}))
  .catch(err => console.error(err));
};

//Reducers

//TODO: create function to set current user on the store
const userReducer = (state = {
    id: '058007a1-144e-4b42-96fe-1a59482b9520', 
    firstName:'Hugo',
    lastName: 'Campos', 
    streetAddress: '123 Fake St', 
    suite: 'A', 
    city: 'San Luis Obispo', 
    state: 'CA', 
    zip: '92555', 
    email: 'HugoCampos@email.com', 
    isAdmin: true, 
    isAuthenticated: true
  }, action) => {
  switch (action.type) {
    case ACT:
      return;
  
    default:
      return state;
  }
};

const usersReducer = (state=[], action) => {
  switch (action.type) {
    case ACT:
      return;
  
    default:
      return state;
  }
}; //isAuth ? allUsers : null

const ordersReducer = (state=[{id:'ord123', status:'inCart'}], action) => {
  switch (action.type) {
    case ACT:
      return;
  
    default:
      return state;
  }
}; //userId => [{id: ..., status:'inCart'}, {}]

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case ACT.GET_PRODUCTS:
      return action.products
    default:
      return state;
  }
};

const selectedProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ACT.SELECT_PRODUCT:
      return action.selectedProduct
    default:
      return state;
  }
};

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case ACT.ADDTOCART:
      console.log('ACTION.PRODUCT: ', action.product)
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
    cart: cartReducer,
    products: productsReducer, //TODO: refactor to limit number of products downloaded (paginate)
    selectedProduct: selectedProductReducer
  }),
  applyMiddleware(loggingMiddleware, thunkMiddleware.withExtraArgument(axios))
);

export { addToCart, removeFromCart }