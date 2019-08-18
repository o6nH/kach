import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class UserInfo extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        user: {}
    };
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.setState({user:this.props.user});
  }

  handleChange(event){
    const {name, value} = event.target;
    this.setState({user:{...this.state.user, [name]:value}});
  }

  handleSubmit(event){
    event.preventDefault();
    console.log(this.state.user);
    //TODO: replace log with a dispatch to User.update and redirect or show isUpdated in state
  }
  
  render() {
    const {isAuthenticated:isAuth} = this.props.user;
    const {firstName, lastName, streetAddress, suite, city, state, zip, email} = this.state.user;
    const {handleChange, handleSubmit} = this;
    
    return (
      <div>
        {
          !isAuth
          ? <h1>You are not an authorized user. <Link to='/signin'>Please sign in.</Link></h1>
          : <div>
              <h3>User Information:</h3>
              <form type='submit' onSubmit={handleSubmit}>
              <label>First Name: </label> <br/>
              <input type='text' name='firstName' value={firstName} onChange={handleChange}/><br/>
              <label>Last Name: </label><br/>
              <input type='text' name='lastName' value={lastName} onChange={handleChange}/><br/>
              <label>Street Address: </label> <br/>
              <input type='text' name='streetAddress' value={streetAddress} onChange={handleChange}/><br/>
              <label>Suite: </label><br/>
              <input type='text' name='suite' value={suite} onChange={handleChange}/><br/>
              <label>City: </label> <br/>
              <input type='text' name='city' value={city} onChange={handleChange}/><br/>
              <label>State: </label><br/>
              <input type='text' name='state' value={state} onChange={handleChange}/><br/>
              <label>Zip Code: </label><br/>
              <input type='text' name='zip' value={zip} onChange={handleChange}/><br/>
              <label>Email: </label> <br/>
              <input type='text' name='email' value={email} onChange={handleChange}/><br/>
              <br/>
              <button type='submit'>Update</button>
            </form>
          </div>
        }
        <h3><Link to='/orders'>View Your Orders</Link></h3>
      </div>
      )
    }
};

const mapStateToProps = state => ({
  user: state.user,
  orders: state.orders,
});

const mapDispatchToProps = dispatch => ({
  updateUser: userInfo => dispatch(updateUser(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
