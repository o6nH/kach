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
        const totalPrice = cart.reduce((acc, prod) => acc + (prod.price * prod.quantity), 0).toFixed(2);
        return ( 
            <div>
                <h1>Your Cart</h1>
                <hr/>
                {
                    cart.map(prod => 
                    <div key={prod.id}>
                        <h3><Link to={`/products/${prod.id}`}>{prod.name}</Link></h3>
                        Quantity: {prod.quantity}
                        <br/>
                        Price: ${prod.price}
                        <br/>
                        Amount: ${(prod.price * prod.quantity).toFixed(2)}
                    </div>)
                }
                <br/>
                <h4>Total: ${totalPrice}</h4>
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