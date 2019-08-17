import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProducts, categorizeProducts, createProduct} from '../actions';

class ProductForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      product: {},
      newCategories: '',
      isDisabled: true
    }
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
    return !(name && quantity && price);
  }
  
  handleChange(event){
    const product = this.state.product;
    const needMore = this.isDisabled(product.name, product.quantity, product.price)
    const {name, value} = event.target;
    this.setState({
      product: {...product, [name]:value}, 
      isDisabled: needMore
    }, console.log);
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
    const {history} = this.props;
    const {product, newCategories:catStrings} = this.state;
    const {categories} = product;
    
    catStrings.split(', ')
    .forEach(catStr => {
      if (catStr && !categories.includes(catStr)) categories.push(catStr)
    })
    
    await createProduct({product});
    this.setState({product: {}, newCategories: ''});
    await categorizeProducts();
    console.log('clicked add');
    
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
              <form type='submit' onSubmit={handleSubmit}>
              <label>Name: </label> <br/>
              <input type='text' name='name' required value={name} onChange={handleChange}/><br/>
              <label>Qty: </label><br/>
              <input type='text' name='quantity' required  value={quantity} onChange={handleChange}/><br/>
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
              <button type='submit' disabled={isDisabled}>Add</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);