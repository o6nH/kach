import React from 'react'

export default class SignUpForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }
  render() {
    return (
      <div>
        <form onSubmit = {this.handleSubmit}>
          <label>
            First Name:
            <input type = 'text' name = 'firstName' onChange = {this.handleChange}/>
          </label>
          <label>
            Last Name:
            <input type = 'text' name = 'lastName' onChange = {this.handleChange} />
          </label>
          <label>
            Email:
            <input type = 'email' name = 'email' onChange = {this.handleChange} />
          </label>
          <label>
            Password:
            <input type = 'text' name = 'password' onChange = {this.handleChange} />
          </label>
          <label>
            Confirm Password:
            <input type = 'text' name = 'cPassword' onChange = {this.handleChange} />
          </label>
        </form>
      </div>
    )
  }
}
