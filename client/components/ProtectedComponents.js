import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import AdminNav from './AdminNav';
import Analytics from './Analytics';
import AdminProductsTable from './AdminProductsTable';
import AdminUsersTable from './AdminUsersTable';
import AdminOrdersTable from './AdminOrdersTable';
import UserInfo from './UserInfo';
import ProductForm from './ProductForm';
import NewProductForm from './NewProductForm';
import Unauthorized from './Unauthorized';
import NotFoundPage from './NotFoundPage';

class Protected extends React.Component{
  render(){
    const {isAdmin} = this.props.user;
    return(
      isAdmin
      ? <div>
          <Route path='/admin' component={AdminNav}/>
          <Switch>
            <Route exact path='/admin' component={Analytics}/>
            <Route exact path='admin/users/:userId' component={UserInfo}/>
            <Route exact path='/admin/users' component={AdminUsersTable}/>
            <Route exact path='/admin/orders' component={AdminOrdersTable}/>
            {/* <Route exact path='/admin/orders/:orderId' component={EditOrder}/> */}
            <Route exact path='/admin/products' render={({history})=><div>
              <AdminProductsTable history={history}/>
              <NewProductForm />
            </div>}/>
            <Route exact path='/admin/products/:productId' component={ProductForm}/>
            <Route component={NotFoundPage}/>
          </Switch>
        </div>
      : <Unauthorized/>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Protected);
