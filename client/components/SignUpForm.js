import React from 'react';
import {connect} from 'react-redux';
import {signUpUser} from '../actions';

class SignUpForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      cPassword: '',
      streetAddress:'',
      city: '',
      zip:'',
      state:'',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

handleChange(ev){
  const {name, value} = ev.target;
  this.setState({[name]: value})
}

handleSubmit(ev){
  ev.preventDefault();
  const sObj = {}
  for (let key in this.state){
    if (key !== 'cPassword'){
      sObj[key] = this.state[key]
    }
  }
  console.log('THING XSDADSFA: ', sObj);
  this.props.signUp(sObj);
}

  render() {
    return (
      <div>
        <form onSubmit = {this.handleSubmit}>
          <label>
            First Name:
            <input type = 'text' value = {this.state.firstName} name = 'firstName' onChange = {this.handleChange}/>
          </label>
          <label>
            Last Name:
            <input type = 'text' value = {this.state.lastName} name = 'lastName' onChange = {this.handleChange} />
          </label>
          <label>
            Street Address:
            <input type = 'text' value = {this.state.streetAddress} name = 'streetAddress' onChange = {this.handleChange} />
          </label>
          <label>
            city:
            <input type = 'text' value = {this.state.city} name = 'city' onChange = {this.handleChange} />
          </label>
          <label>
            zip:
            <input type = 'text' value = {this.state.zip} name = 'zip' onChange = {this.handleChange} />
          </label>
          <label>
            State:
            <input type = 'text' value = {this.state.state} name = 'state' onChange = {this.handleChange} />
          </label>
          <label>
            Email:
            <input type = 'email' value = {this.state.email} name = 'email' onChange = {this.handleChange} />
          </label>
          <label>
            Password:
            <input type = 'password' value = {this.state.password} name = 'password' onChange = {this.handleChange} />
          </label>
          <label>
            Confirm Password:
            <input type = 'password' value = {this.state.cPassword} name = 'cPassword' onChange = {this.handleChange} />
          </label>
          <input disabled = {this.state.password !== this.state.cPassword || this.state.password === '' || this.state.firstName === '' || this.state.lastName === ''} type = 'submit' name = 'Submit' />
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  signUp: (user) => dispatch(signUpUser(user)),
})

export default connect(null, mapDispatchToProps)(SignUpForm);