import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const cartId = 'ord123' //TODO: replace

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { cart } = this.props;
        return ( 
            <div>
                <h1>Your Cart</h1>
                <hr/>
                {
                    cart.map(prod => 
                    <div key={prod.id}>
                        <h2>{prod.name}</h2>
                        Quantity: {prod.quantity}
                    </div>)
                }
                <br/>
                <br/>
                <Link to={`/cart/${cartId}/checkout`}>Check Out</Link>
            </div>
         );
    }
}

const mapStateToProps = state => ({
    cart: state.cart
})
const mapDispatchToProps = dispatch => {
    return {
    }
};
 
 
export default connect(mapStateToProps, mapDispatchToProps)(Cart);