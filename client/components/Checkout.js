import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkout } from '../store';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            firstName: null,
            lastName: null,
            streetAddress: null,
            suite: null,
            city: null,
            state: null,
            zip: null,
            email: null,
         }
         this.onSubmit = this.onSubmit.bind(this);
         this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        const { firstName, lastName, streetAddress, suite, city, state, zip, email } = this.props.user;
        this.setState({
            firstName: firstName,
            lastName: lastName,
            streetAddress: streetAddress,
            suite: suite,
            city: city,
            state: state,
            zip: zip,
            email: email,
        });
    }

    onSubmit(ev) {
        ev.preventDefault();
        this.props.checkout(this.state);
        window.location.hash = `/orders/confirmation`;
    }

    onChange(ev) {
        this.setState({[ev.target.name]: ev.target.value});
        console.log(this.state)
    }

    render() { 
        const { onChange, onSubmit } = this;
        console.log(this.props)
        const { firstName, lastName, streetAddress, suite, city, state, zip, email } = this.state;
        return ( 
            <div>
                <h1>Checkout</h1>
                    <form type='submit' onSubmit={onSubmit}>
                        <h3>Shipping Address</h3>
                        <label>First Name: </label> <br/>
                        <input type='text' name='firstName' onChange={onChange} value={firstName}></input><br/>
                        <label>Last Name: </label><br/>
                        <input type='text' name='lastName' onChange={onChange} value={lastName}></input><br/>
                        <label>Street Address: </label> <br/>
                        <input type='text' name='streetAddress' onChange={onChange} value={streetAddress}></input><br/>
                        <label>Suite: </label><br/>
                        <input type='text' name='suite' onChange={onChange} value={suite}></input><br/>
                        <label>City: </label> <br/>
                        <input type='text' name='city' onChange={onChange} value={city}></input><br/>
                        <label>State: </label><br/>
                        <input type='text' name='state' onChange={onChange} value={state}></input><br/>
                        <label>Zip Code: </label><br/>
                        <input type='text' name='zip' onChange={onChange} value={zip}></input><br/>
                        <label>Email: </label> <br/>
                        <input type='text' name='email' onChange={onChange} value={email}></input><br/>
                        <br/>
                        <button type='submit'>Place Order</button>
                    </form>
            </div>
         );
        }
    }

const mapStateToProps = state => ({
    user: state.user,
})

const mapDispatchToProps = dispatch => {
    return {
        checkout: (info) => dispatch(checkout(info)),
    }
};
 
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
