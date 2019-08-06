import React, { Component } from 'react';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            firstName: '',
            lastName: '',
            streetAddress: '',
            suite: '',
            city: '',
            state: '',
            zip: '',
            email: '',
         }
         this.onSubmit = this.onSubmit.bind(this);
         this.onChange = this.onChange.bind(this);
    }

    onSubmit(ev) {
        ev.preventDefault();
    }

    onChange(ev) {
        this.setState({[ev.target.name]: ev.target.value});
    }

    render() { 
        const { onChange, onSubmit } = this;
        return ( 
            <div>
                <h1>Checkout</h1>
                    <form type='submit' onSubmit={onSubmit}>
                        <h3>Shipping Address</h3>
                        <label>First Name: </label> <br/>
                        <input type='text' name='firstName' onChange={onChange}></input><br/>
                        <label>Last Name: </label><br/>
                        <input type='text' name='lastName' onChange={onChange}></input><br/>
                        <label>Street Address: </label> <br/>
                        <input type='text' name='streetAddress' onChange={onChange}></input><br/>
                        <label>Suite: </label><br/>
                        <input type='text' name='suite' onChange={onChange}></input><br/>
                        <label>City: </label> <br/>
                        <input type='text' name='city' onChange={onChange}></input><br/>
                        <label>State: </label><br/>
                        <input type='text' name='state' onChange={onChange}></input><br/>
                        <label>Zip Code: </label><br/>
                        <input type='text' name='zip' onChange={onChange}></input><br/>
                        <label>Email: </label> <br/>
                        <input type='text' name='email' onChange={onChange}></input><br/>
                        <br/>
                        <button type='submit'>Place Order</button>
                    </form>
            </div>
         );
        }
    }
 
export default Checkout;