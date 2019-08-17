import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProducts, categorizeProducts, createProduct} from '../actions';

const initState = {
  product: {
    name: '', 
    quantity: '', 
    price: '', 
    categories:[], 
    description:''},
  newCategories: '',
  isDisabled: 'disabled'
}

class NewProductForm extends Component {
  constructor(props){
    super(props);
    this.state = initState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleNewCategories = this.handleNewCategories.bind(this);
  }

 async componentDidMount() {
    const {getProducts, categorizeProducts} = this.props;
    await getProducts();
    await categorizeProducts();
  }

  isDisabled(name, quantity, price){
    return !(name && quantity && price) ? 'disabled' : '';
  }
  
  handleChange(event){
    const {product} = this.state;
    const {name, value} = event.target;
    let check;
    switch (name) {
      case 'name':
        check = this.isDisabled(value, product.quantity, product.price)
        break;
      case 'quantity':
        check = this.isDisabled(product.name, value, product.price)
        break;
      case 'price':
        check = this.isDisabled(product.name, product.quantity, value)
        break;
      default:
        break;
    }
    this.setState( ({product})=> ({
      product: {...product, [name]:value}, 
      isDisabled: check
    }));
  }
  
  handleCategoryChange(event){
    const {product} = this.state;
    const {categories} = product;
    const {name:cat} = event.target;
    const newCheckStatus = event.target.checked;
    let newCats;
    
    if(newCheckStatus === true && categories) newCats = [...categories, cat];
    else if(newCheckStatus === true) newCats = [cat];
    else newCats = categories.filter(category => category!==cat);

    this.setState({product: {...product, categories: newCats}});
  }
  
  handleNewCategories(event){
    const {value:catStrings} = event.target;
    this.setState({newCategories: catStrings});
  }

  async handleSubmit(event){
    event.preventDefault();
    const {createProduct, categorizeProducts} = this.props;
    const {product, newCategories:catStrings} = this.state;
    const {categories} = product;
    
    catStrings.split(', ')
      .forEach(catStr => {
        if (catStr && !categories.includes(catStr)) categories.push(catStr)
      })

    await createProduct({...product, categories});
    await categorizeProducts();
    this.setState(initState);
  }

  render() {
    const {
      handleChange, 
      handleSubmit, 
      handleCategoryChange, 
      handleNewCategories} = this;
    const {isAdmin, allCategories} = this.props;
    const {product:productUpdates, newCategories, isDisabled} = this.state;
    const {name, quantity, price, categories, description} = productUpdates;

    return (
      <div>
        {
          !isAdmin
          ? <h1>Forbidden.</h1>
          : <div>
              <h3>Add New Product:</h3>
              <form onSubmit={handleSubmit}>
              <label>Name: </label> <br/>
              <input type='text' name='name' required value={name} onChange={handleChange}/><br/>
              <label>Qty: </label><br/>
              <input type='number' min={0} name='quantity' required  value={quantity} onChange={handleChange}/>
              <br/>
              <label>Price: </label> <br/>
              <input type='text' name='price' required  value={price} onChange={handleChange}/><br/>
              <label>Categories: </label><br/>
              {
                allCategories.map((category, index) => 
                <div key={index}>
                  <input type='checkbox' id={category} name={category} onChange={handleCategoryChange} 
                  checked={categories && categories.includes(category) ? true : false}/>
                  <label>{category}</label>
                </div>)
              }
              <label>Add new (lower-cased, comma-separated) categories : </label>
              <br/>
              <input type='text' name='newCategories' value={newCategories} onChange={handleNewCategories}/>
              <br/>
              <label>Description: </label> <br/>
              <textarea rows={5} name='description' value={description} onChange={handleChange}/>
              <br/>
              <input type='submit' value='Add' disabled={isDisabled}/>
            </form>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allCategories: Object.keys(state.categorizedProducts),
  isAdmin: state.user.isAdmin,
  selectedProduct: state.selectedProduct,
});

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(fetchProducts()),
  categorizeProducts: () => dispatch(categorizeProducts()),
  createProduct: (product) => dispatch(createProduct(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProductForm);