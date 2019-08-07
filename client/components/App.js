import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Navbar from './Navbar';
import Products from './Products';
import Product from './Product';
import Cart from './Cart';
import Checkout from './Checkout';
import {fetchProducts} from '../store';

class App extends React.Component{
  componentDidMount() {
    this.props.getAllProducts();
  }

  render(){
    return(
      <HashRouter>
        <Route path='/' component={Navbar}/>
        <Route exact path='/products' component={Products}/>
        <Route path='/products/:productId' component={Product}/>
        <Route exact path='/cart/:cartId' component={Cart}/>
        <Route path='/cart/:cartId/checkout' component={Checkout}/> 
        {/* <Route exact path='/users' component={Users}/> //admin only
        <Route exact path='/users/:userId' component={User}/>
        <Route exact path='/orders' component={Orders}/>
        <Route exact path='/orders/:orderId' component={Order}/>*/}
      </HashRouter>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAllProducts: () => dispatch(fetchProducts()) 
})

export default connect(null, mapDispatchToProps)(App);