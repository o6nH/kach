import React, { Component } from 'react';
import { getSelectedOrder } from '../actions';
import { connect } from 'react-redux';

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
        return ( 
            <div>
            <h1>Order</h1>
            {
                <h3>Order {order.id}</h3>
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