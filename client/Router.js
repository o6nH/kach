import React from 'react';
import PropTypes from 'prop-types';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Product from './components/Product';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Home from './components/Home';
import UserInfo from './components/UserInfo';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import OrderConfirmation from './components/OrderConfirmation';
import Unauthorized from './components/Unauthorized';
import UserOrders from './components/UserOrders';
import UserOrder from './components/UserOrder';
import NotFoundPage from './components/NotFoundPage';
import ProtectedComponents from './components/ProtectedComponents';

export default class Router extends React.Component{
  componentDidMount() {
    this.props.getUser();
    this.props.getAllProducts();
  }

  render(){
    return(
      <HashRouter>
        <Route path='/' component={Navbar}/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/unauthorized' component={Unauthorized}/>
          <Route exact path='/signup' component={SignUpForm} />
          <Route exact path='/signin' component={SignInForm} />
          <Route exact path='/users/:userId' component={UserInfo}/>
          <Route exact path='/orders' component={UserOrders}/>
          <Route exact path='/orders/:orderId' component={UserOrder}/>
          <Route exact path='/cart' component={Cart}/>
          <Route exact path='/cart/:cartId/checkout' component={Checkout}/> 
          <Route exact path='/orders/confirmation' component={OrderConfirmation}/>
          <Route exact path='/products' component={Products}/>
          <Route exact path='/products/:productId' component={Product}/>
          <Route path='/admin' component={ProtectedComponents}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </HashRouter>
    )
  }
}

// Props acquired through `connect` function from `react-redux` module in 'App.js'
Router.propTypes = {
  getUser: PropTypes.func.isRequired,
  getAllProducts: PropTypes.func.isRequired,
};
