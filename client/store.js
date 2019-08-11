/* eslint-disable linebreak-style */
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
  GETCART: 'GETCART',
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

export const getCart = () => (dispatch, getState, axios) => {
  axios.get('/api/orders/cart')
  .then(({data: orderLines}) => dispatch({type: ACT.GETCART, orderLines}))
  .catch(err => console.error(err));
};

export const addToCart = (product) => (dispatch, getState, axios) => {
  axios.post('/api/orders', product)
    .then(({data: line}) => dispatch({
        type: ACT.ADDTOCART,
        line,
    }))
    .catch(err => console.error(err));
}

export const removeFromCart = (product) => (dispatch, getState, axios) => {
  axios.delete('/api/orders', {data: product})
    .then(({data: line}) => dispatch({
      type: ACT.REMOVEFROMCART,
      line,
  }))
    .catch(err => console.error(err));
}

export const fetchSelectedProduct = (productId) => (dispatch, getState, axios) => {
  axios.get(`/api/products/${productId}`)
  .then(({data: selectedProduct}) => dispatch({type: ACT.SELECT_PRODUCT, selectedProduct}))
  .catch(err => console.error(err));
};

//Reducers

//TODO: create function to set current user on the store
const userReducer = (state={id: '058007a1-144e-4b42-96fe-1a59482b9520'}, action) => {
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

const ordersReducer = (state=[], action) => {
  switch (action.type) {
    case ACT:
      return;
  
    default:
      return state;
  }
}; //userId => [{orderId: ..., status:'inCart'}, {}]

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
      let newLine = true;
      const newState = state.map((prod) => {
        if (prod.productId === action.line.productId) {
          newLine = false;
          console.log('inside if')
          prod.quantity++
        }
        return prod;
       })
       if (newLine) {
         return [...state, action.line];
        } else {
          return newState;
       }
    case ACT.REMOVEFROMCART:
      const decreased = state.map(prod => {
        if (prod.productId === action.line.productId) {
          prod.quantity--
        }
        return prod;
      });
      const filtered = decreased.filter(prod => prod.quantity !== 0);
      return filtered;
    case ACT.GETCART:
      return [...action.orderLines];
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

//module.exports = {categorizeProducts, getCategoryCounts, getCategories, fetchProducts, getCart, addToCart, removeFromCart, fetchSelectedProduct}