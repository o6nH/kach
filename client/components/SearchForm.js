import React, {Component} from 'react';

class SearchForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchTerm:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    const {name, value} = event.target;
    this.setState({
      [name]:value
    })
  }

  handleSubmit(event){
    event.preventDefault();
    const {searchTerm} = this.state;
    const query = `?search=${searchTerm}`;
    window.location.hash=`/products/${query}`
    this.setState({searchTerm: ''});
  }

  render(){
    const {searchTerm} = this.state;
    const {handleChange, handleSubmit} = this;
    return (
      <form id='searchBar' onSubmit={handleSubmit}>
        <label htmlFor='searchTerm'></label>
        <input name='searchTerm' type='text' value={searchTerm} placeholder="Search..." onChange={handleChange}></input>
        <input type='submit' value='🔎'/>
      </form>
    )
  }
}


export default SearchForm;