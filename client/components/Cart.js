import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCart } from '../store';

const cartId = 'ord123' //TODO: replace

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount() {
        const { getCart, user } = this.props;
        //getCart();
    }

    render() { 
        const { cart, products } = this.props;
        const cart2 = cart.map(line => {
            const productInfo = products.find(product => product.id === line.productId);
            return {...line, ...productInfo};
        })
        const totalPrice = cart2.reduce((acc, prod) => acc + (prod.price * prod.quantity), 0).toFixed(2);
        return ( 
            <div>
                <h1>Your Cart</h1>
                <hr/>
                {
                    cart2.map(prod => 
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
    cart: state.cart,
    user: state.user,
    products: state.products,
})
const mapDispatchToProps = dispatch => {
    return {
        getCart: () => dispatch(getCart())
    }
};
 
 
export default connect(mapStateToProps, mapDispatchToProps)(Cart);