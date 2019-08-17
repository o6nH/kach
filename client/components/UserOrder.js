import React, { Component } from 'react';
import { getSelectedOrder } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderConfirmation from './OrderConfirmation';

class UserOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount() {
        const { getOrder, match } = this.props;
        getOrder(match.params.orderId);
    }
    render() { 
        const { order } = this.props;
        console.log('order on component', order)
        return ( 
            <div>
            <h1>Order</h1>
            #{order.id} <br/>
            Status: {order.status}
            <hr/>
            { (order.orderproducts) ? 
                order.orderproducts.map(line => 
                    <div key={line.id}>
                        <h3><Link to={`/products/${line.productId}`}>{line.product.name}</Link></h3>
                        Quantity: {line.quantity} <br/>
                        Price: {line.purchaseUnitPrice} <br/>
                    </div>) : null
            }
            
            </div>
         );
    }
}

const mapStateToProps = state => ({
    order: state.selectedOrder,
  })
  const mapDispatchToProps = dispatch => {
    return {
      getOrder: (orderId) => dispatch(getSelectedOrder(orderId)),
    }
  };
 
export default connect(mapStateToProps, mapDispatchToProps)(UserOrder);