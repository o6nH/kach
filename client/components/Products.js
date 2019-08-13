import React from 'react';
import queryString from 'querystring';
import {connect} from 'react-redux';
import CategoriesFilter from './CategoriesFilter';
import SearchForm from './SearchForm';
import ProductCard from './ProductCard';

function Products(props) {
  const {products, categorizedProducts, categories} = props;

  //Filter Products by Category
  const productsByQueryCategory = (categorizedProducts = categorizedProducts, allProducts = products) => {
    const parsedQuery = props.location.search ? queryString.parse(props.location.search) : {};
    if(parsedQuery['?category'] || parsedQuery['category']) {
      return categorizedProducts[parsedQuery['?category']].products || categorizedProducts[parsedQuery['category']].products;
    }
    return allProducts;
  };

  //Filter Products by SearchTerm
  const hasSearchTerm = (product, searchTerm) =>  {
    searchTerm = searchTerm && searchTerm.toLowerCase();
    const splitName = product.name.toLowerCase().split(' ');
    const splitDescription = product.description.toLowerCase().split(' ');
    return splitName.includes(searchTerm) || splitDescription.includes(searchTerm)
  };

  const productsByQuerySearchTerm = (allProducts = products) => {
    const parsedQuery = props.location.search ? queryString.parse(props.location.search) : {};
    if (parsedQuery['?search'] || parsedQuery['search']) {
      return products.filter(product => {
        return hasSearchTerm(product, parsedQuery['?search']) || hasSearchTerm(product, parsedQuery['search'])
      });
    }
    return allProducts;
  };

  const filteredProducts = categories.length 
    ? productsByQuerySearchTerm(productsByQueryCategory(categorizedProducts)) : '';
  
  //Component
  return (/* TODO:remove inline styles*/
    <div>
      <SearchForm location={props.location}/>
      <CategoriesFilter/>
      <div style={{display:'flex'}}>
      {
        categories.length 
        ? filteredProducts.map(product => <ProductCard key={product.id} product={product}/>) 
        : ''
      }
      </div>
    </div>
  );
};

//Mappings from redux store to react component's props
const mapStateToProps = state => ({
  products: state.products,
  categorizedProducts: state.categorizedProducts,
  categories: Object.keys(state.categorizedProducts)
})

export default connect(mapStateToProps)(Products);
