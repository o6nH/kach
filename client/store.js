/* eslint-disable linebreak-style */
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger';
import {ACT} from './actions'
import axios from 'axios';

//Reducers
const userReducer = (state = {}, action) => {
  switch (action.type) {
    case ACT.GET_CURRENT_USER:
      return action.currentUser;
    default:
      return state;
  }
};

const usersReducer = (state=[], action) => {
  switch (action.type) {
    default:
      return state;
  }
}; //isAuth ? allUsers : null

const ordersReducer = (state=[{id:'ord123', userOrderId:'', orderProductsId:'', status:'inCart'}], action) => {
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
    case ACT.CREATE_PRODUCT:
      console.log("CREATING PRODUCT in productReducer");
      
      return [...state, action.product]
    case ACT.DELETE_PRODUCT:
      const {productId} = action
      return state.filter(product => product.id !== productId)
    case ACT.UPDATE_PRODUCT:
      const {updatedProduct} = action;
      const updatedProducts = state.map(product =>{
        return (product.id === updatedProduct.id) ? updatedProduct : product 
      }
      );
      return updatedProducts
    case ACT.ADDTOCART:
      const addedProduct = action.line.product;
      const updated = state.map(product =>{
        return (product.id === addedProduct.id) ? addedProduct : product 
      }
      );
      return updated
    default:
      return state;
  }
};

const catProdReducer = (state = {}, action) => {
  switch (action.type) {
    case ACT.CATEGORIZE_PRODUCTS:
      const {products} = action;
      return products.reduce((catProdObj, product) => {
        let {categories} = product;
        categories.forEach(_category => {
          if(_category) {
            if (catProdObj[_category] && catProdObj[_category].products) {
              catProdObj[_category].products.push(product);
            } else {
              catProdObj[_category]= {products: [product]};
            }
            catProdObj[_category].count = catProdObj[_category].products.length;
            catProdObj[_category].availableCount = catProdObj[_category].products
              .filter(product => product.quantity > 0)
              .length;
          }
        })
        return catProdObj;
      }, {})
    default:
      return state
  }
}

const selectedProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ACT.GET_PRODUCT:
      return action.foundProduct;
    case ACT.DESELECT:
      return {}
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
    users: usersReducer,
    user: userReducer,
    orders: ordersReducer,
    cart: cartReducer,
    products: productsReducer, //TODO: refactor to limit number of products downloaded (paginate)
    categorizedProducts: catProdReducer,
    selectedProduct: selectedProductReducer
  }),
  applyMiddleware(loggingMiddleware, thunkMiddleware.withExtraArgument(axios))
);
