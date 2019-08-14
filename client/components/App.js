import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Navbar from './Navbar';
import Products from './Products';
import Product from './Product';
import Cart from './Cart';
import Checkout from './Checkout';
import AdminPage from './AdminPage';
import Home from './Home';
import UserInfo from './UserInfo';
import EditProduct from './EditProduct';
import SignUpForm from './SignUpForm';
import OrderConfirmation from './OrderConfirmation';
import UserOrders from './UserOrders';
import {fetchAndCategorizeProducts, getCurrentUser} from '../actions';

class App extends React.Component{
  async componentDidMount() {
    this.props.getAllProducts();
    console.log('Mounting')
    this.props.getUser();
  }

  render(){
    return(
      <HashRouter>
        <Route path='/' component={Navbar}/>
        <Route exact path='/' component={Home}/>
        <Route path='/admin' component={AdminPage}/>
        <Route exact path='/users/:userId' component={UserInfo}/>
        {/* <Route exact path='/admin/users' component={AllUsers}/> */}
        {/* <Route exact path='/admin/users/:userId' component={EditUser}/> */}
        <Route exact path='/orders' component={UserOrders}/>
        {/* <Route exact path='/orders/:orderId' component={UserOrder}/> */}
        <Route exact path='/cart/:cartId' component={Cart}/>
        <Route path='/cart/:cartId/checkout' component={Checkout}/> 
        <Route path='/orders/confirmation' component={OrderConfirmation}/> 
        {/* <Route exact path='/admin/orders' component={AllOrders}/> */}
        {/* <Route exact path='/admin/orders/:orderId' component={EditOrder}/> */}
        <Route exact path='/products' component={Products}/>
        <Route path='/products/:productId' component={Product}/>
        {/* <Route exact path='/admin/products' component={AllProducts}/> */}
        <Route exact path='/admin/products/:productId' component={EditProduct}/>
        <Route path = '/signup' component = {SignUpForm} />
      </HashRouter>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getCurrentUser()),
  getAllProducts: () => dispatch(fetchAndCategorizeProducts())
});

export default connect(null, mapDispatchToProps)(App);
