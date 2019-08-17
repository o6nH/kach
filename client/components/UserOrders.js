import React, { Component } from 'react';
import { getOrders } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class UserOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount() {
    const { getOrders } = this.props;
    getOrders();
  }

  render() { 
    const { orders } = this.props;
    return ( 
      <div>
      <h1>Your Orders</h1>
      {
        orders.map(order => 
            <div key={order.id}>
              <hr></hr>
              <h3><Link to={`/orders/${order.id}`}>Order {order.id}</Link></h3><br/>
              Order Placed: {order.orderedAt.slice(0,10)}<br/>
              Status: {order.status}
              <hr></hr>
              <br/>
            </div>
          )
      }
    </div>
     );
  }
}
 
const mapStateToProps = state => ({
  orders: state.orders,
})
const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(getOrders()),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(UserOrders);