import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Navbar from './Navbar';
import Products from './Products';
import Product from './Product';
import Cart from './Cart';
import Checkout from './Checkout';
import Home from './Home';
import UserInfo from './UserInfo';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import OrderConfirmation from './OrderConfirmation';
import Unauthorized from './Unauthorized';
import UserOrders from './UserOrders';
import UserOrder from './UserOrder';
import NotFoundPage from './NotFoundPage';
import ProtectedComponents from './ProtectedComponents';
import {fetchAndCategorizeProducts, getCurrentUser} from '../actions';

class App extends React.Component{
  componentDidMount() {
    this.props.getAllProducts();
    this.props.getUser();
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

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getCurrentUser()),
  getAllProducts: () => dispatch(fetchAndCategorizeProducts())
});

export default connect(null, mapDispatchToProps)(App);
