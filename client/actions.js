
//Actions
const ACT = {
  ADDTOCART: 'ADDTOCART',
  REMOVEFROMCART: 'REMOVEFROMCART',
  EDITCART: 'EDITCART',
  GETCART: 'GETCART',
  GET_PRODUCTS: 'GET_PRODUCTS',
  GET_PRODUCT: 'GET_PRODUCT',
  CHECKOUT: 'CHECKOUT',
  ADD_PRODUCT:'ADD_PRODUCT',
  UPDATE_PRODUCT:'UPDATE_PRODUCT',
  CATEGORIZE_PRODUCTS: 'CATEGORIZE_PRODUCTS'
}


//Thunk Creators
const fetchAndCategorizeProducts = () => (dispatch, getState, axios) => {
  axios.get('/api/products')
  .then(({data: products}) => {
    dispatch({type: ACT.GET_PRODUCTS, products})
    return products
  })
  .then(products => dispatch({type: ACT.CATEGORIZE_PRODUCTS, products}))
  .catch(err => console.error(err));
};

const categorizeProducts = () => (dispatch, getState) => {
  const {products} = getState();
  dispatch({type: ACT.CATEGORIZE_PRODUCTS, products})
};

const updateProduct = (adminProductUpdates) => (dispatch, getState, axios) => {
  //TODO: remove userId from body and get from session after sessions are working (changing adminProductUpdates to only productUpdates)
  axios.put(`/api/products/${adminProductUpdates.productUpdates.id}`, adminProductUpdates)
  .then(({data:updatedProduct}) => dispatch({type: ACT.UPDATE_PRODUCT, updatedProduct}))
  .catch(err => console.error(err));
};

const getCart = () => (dispatch, getState, axios) => {
  axios.get('/api/orders/cart')
  .then(({data: orderLines}) => dispatch({type: ACT.GETCART, orderLines}))
  .catch(err => console.error(err));
};

const addToCart = (product) => (dispatch, getState, axios) => {
  axios.post('/api/orders', product)
    .then(({data: line}) => dispatch({
        type: ACT.ADDTOCART,
        line,
    }))
    .catch(err => console.error(err));
};

const removeFromCart = (product) => (dispatch, getState, axios) => {
  axios.delete('/api/orders', {data: product})
    .then(({data: line}) => dispatch({
      type: ACT.REMOVEFROMCART,
      line,
  }))
    .catch(err => console.error(err));
}

const checkout = (info) => (dispatch, getState, axios) => {
  axios.put('/api/orders/checkout', info) 
    .then(() => dispatch({
      type: ACT.CHECKOUT,
    }
    ))
    .catch(err => console.error(err));
}

const fetchProduct = (productId) => (dispatch, getState, axios) => {
  axios.get(`/api/products/${productId}`)
  .then(({data: foundProduct}) => dispatch({type: ACT.GET_PRODUCT, foundProduct}))
  .catch(err => console.error(err));
};

export {ACT, fetchAndCategorizeProducts, categorizeProducts, getCart, addToCart, removeFromCart, checkout, fetchProduct, updateProduct}