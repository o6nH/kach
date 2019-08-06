import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const cartId = 'ord123' //TODO: replace

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <h1>Your Cart</h1>
                <Link to={`/cart/${cartId}/checkout`}>Check Out</Link>
            </div>
         );
    }
}
 
export default Cart;