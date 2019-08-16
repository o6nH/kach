import React from 'react';
import {connect} from 'react-redux';
import {getCurrentUser} from '../actions';
import axios from 'axios';

class SignInForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

handleChange(ev){
  const {name, value} = ev.target;
  this.setState({[name]: value});
}

async handleSubmit(ev){
  try {
    ev.preventDefault();
  console.log('HIT');
  const sendObj = {
    email: this.state.email,
    password: this.state.password
  }
  const login = await axios.post('/api/users/login', sendObj);
  if ( login.data === 'Email or password incorrect'){
    alert(login.data)
  } else {
  this.props.getUser();
  this.props.history.push('/');
  }
} catch (err){
  throw err;
}
}

  render() {
    return (
      <div>
        <form onSubmit = {this.handleSubmit}>
          <label>
            Email:
            <input type = 'email' name = 'email' onChange = {this.handleChange} />
          </label>
          <label>
            Password:
            <input type = 'password' name = 'password' onChange = {this.handleChange} />
          </label>
          <input type = 'submit' name = "Submit" />
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getCurrentUser())
})

export default connect(null, mapDispatchToProps)(SignInForm);