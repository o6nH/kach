import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCart, addToCart, removeFromCart } from '../actions';

const cartId = 'ord123' //TODO: replace

class Cart extends Component {

    constructor(props) {
        super();
        this.state = {};
    }

    componentDidMount() {
        const { getCart } = this.props;
        getCart();
    }


    render() { 
        const { cart, addToCart, removeFromCart } = this.props;
        console.log('the cart: ', cart)
        
        const totalPrice = cart.reduce((acc, prod) => acc + (prod.purchaseUnitPrice * prod.quantity), 0).toFixed(2);
        return ( 
            <div>
                <h1>Your Cart</h1>
                <hr/>
                {
                    cart.map(prod => 
                        <div key={prod.productId}>
                            <h3><Link to={`/products/${prod.productId}`}>{prod.product.name}</Link></h3>
                            Quantity: {prod.quantity}
                            <br/>
                            Price: ${prod.purchaseUnitPrice}
                            <br/>
                            Amount: ${(prod.purchaseUnitPrice * prod.quantity).toFixed(2)}
                            <br/>
                            <form>
                                <button onClick={() => {removeFromCart({...prod.product})}}>-</button>
                                {
                                    prod.product.quantity > 0 ? 
                                    <button onClick={() => {addToCart({...prod.product}); console.log('working'); }}>+</button> : null
                                }
                            </form>
                        </div>)
                }
                <br/>
                <h4>Total: ${totalPrice}</h4>
                <br/>
                {
                    cart.length ? 
                    <Link to={`/cart/${cartId}/checkout`}>Check Out</Link> : null
                }
            </div>
         );
    }
}

const mapStateToProps = state => ({
    cart: state.cart,
})
const mapDispatchToProps = dispatch => {
    return {
        getCart: () => dispatch(getCart()),
        addToCart: (info) => dispatch(addToCart(info)),
        removeFromCart: (info) => dispatch(removeFromCart(info)),
    }
};
 
 
export default connect(mapStateToProps, mapDispatchToProps)(Cart);