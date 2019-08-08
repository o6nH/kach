import React from 'react';
import queryString from 'querystring';
import {connect} from 'react-redux';
import {categorizeProducts, getCategoryCounts, getCategories} from '../store';
import CategoriesFilter from './CategoriesFilter';
import SearchForm from './SearchForm';
import ProductCard from './ProductCard';

function Products(props) {
  const {products} = props;

  //Filter by Category
  const categorizedProducts = categorizeProducts(products);
  const categoryCounts = getCategoryCounts(categorizedProducts);
  const categories = getCategories(categorizedProducts);

  const productsByQueryCategory = (categorizedProducts = categorizedProducts, allProducts = products) => {
    const parsedQuery = props.location.search ? queryString.parse(props.location.search) : {};
    if(parsedQuery['?category'] || parsedQuery['category']) {
      return categorizedProducts[parsedQuery['?category']] || categorizedProducts[parsedQuery['category']];
    }
    else return allProducts;
  };

  //Filter by SearchTerm
  const hasSearchTerm = (product, searchTerm) =>  {
    const splitName = product.name.toLowerCase().split(' ');
    const splitDescription = product.description.toLowerCase().split(' ');
    return (splitName.includes(searchTerm)) || (splitDescription.includes(searchTerm))
  };

  const productsByQuerySearchTerm = (allProducts = products) => {
    const parsedQuery = props.location.search ? queryString.parse(props.location.search) : {};
    if (parsedQuery['?search'] || parsedQuery['search']) {
      return products.filter(product => {
        return hasSearchTerm(product, parsedQuery['?search']) || hasSearchTerm(product, parsedQuery['search'])
      });
    }
    else return allProducts;
  };
  
  //Component
  return (/* TODO:remove inline styles*/
    <div>
      <SearchForm location={props.location}/>
      <CategoriesFilter categories={categories} categoryCounts={categoryCounts}/>
      <div style={{display:'flex'}}>
      {          
        productsByQuerySearchTerm(productsByQueryCategory(categorizedProducts)).map(product => 
          <ProductCard key={product.id} product={product}/>)
      }
      </div>
    </div>
  );
};

//Mappings from redux store to react component's props
const mapStateToProps = state => ({
  products: state.products
})

export default connect(mapStateToProps)(Products);
