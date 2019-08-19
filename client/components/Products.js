import React from 'react';
import queryString from 'querystring';
import {connect} from 'react-redux';
import CategoriesFilter from './CategoriesFilter';
import SearchForm from './SearchForm';
import ProductCard from './ProductCard';

class Products extends React.Component{
  constructor(props){
    super(props);
    this.productsByQueryCategory = this.productsByQueryCategory.bind(this);
    this.productsByQuerySearchTerm = this.productsByQuerySearchTerm.bind(this);
    this.hasSearchTerm = this.hasSearchTerm.bind(this);
  }
  
  //Filter Products by Category
  productsByQueryCategory(categorizedProducts, allProducts) {
    const {location} = this.props;
    const parsedQuery = location.search ? queryString.parse(location.search) : {};
    if(parsedQuery['?category'] || parsedQuery['category']) {
      const filteredProducts = categorizedProducts[parsedQuery['?category']].products || categorizedProducts[parsedQuery['category']].products;
      return filteredProducts.filter(product => product.quantity > 0);
    }
    return allProducts.filter(product => product.quantity > 0);
  }
  
  //Filter Products by SearchTerm
  productsByQuerySearchTerm(allProducts) {
    const {hasSearchTerm} = this;
    const {location} = this.props;
    const parsedQuery = location.search ? queryString.parse(location.search) : {};
    if (parsedQuery['?search'] || parsedQuery['search']) {
      return allProducts.filter(product => {
        return hasSearchTerm(product, parsedQuery['?search']) || hasSearchTerm(product, parsedQuery['search'])
      });
    }
    return allProducts;
  }

  hasSearchTerm(product, searchTerm) {
    searchTerm = searchTerm && searchTerm.toLowerCase();
    const splitName = product.name.toLowerCase().split(' ');
    const splitDescription = product.description.toLowerCase().split(' ');
    return splitName.includes(searchTerm) || splitDescription.includes(searchTerm);
  }
  
  render(){
    const {location, products, categorizedProducts, categories} = this.props;
    const {productsByQueryCategory, productsByQuerySearchTerm} = this;
    const filteredProducts = categories.length 
      ? productsByQuerySearchTerm(productsByQueryCategory(categorizedProducts, products)) : '';
    return (/* TODO:remove inline styles*/
      <div>
        <SearchForm location={location}/>
        <CategoriesFilter/>
        <div className="container d-flex justify-content-around flex-wrap">
        {
          categories.length 
        ? filteredProducts.map(product => <ProductCard key={product.id} product={product}/>) 
          : ''
        }
        </div>
      </div>
    )
  }
}

//Mappings from redux store to react component's props
const mapStateToProps = state => ({
  products: state.products,
  categorizedProducts: state.categorizedProducts,
  categories: Object.keys(state.categorizedProducts)
})

export default connect(mapStateToProps)(Products);
