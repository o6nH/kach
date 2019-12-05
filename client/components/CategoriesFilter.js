import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {categorizeProducts} from '../actions';

class CategoriesFilter extends React.Component { 
  constructor(props) {
    super(props)
  }
  
  componentDidMount(){
    this.props.categorizeProducts();
  }

  render() {
    const {categories, categoryCounts} = this.props;
    return (
      <div id='filters'>
        <h4>Filter by category: </h4>
        <div className="list-group">
        {
          categories.map((category, index) => {
            const query = `category=${category}`;
            return categoryCounts[category] > 0 
            ? <Link key={index} to={`/products?${query}`} className="list-group-item list-group-item-action">
                {`${category[0].toUpperCase() + category.split('').slice(1).join('') } `}  
                {`(${categoryCounts[category]})`}
              </Link>
            : ''
          })
        }
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => {
  const {categorizedProducts} = state;
  const categoryCounts = {};
  for(let category in categorizedProducts) {
    categoryCounts[category] = categorizedProducts[category].availableCount
  }

  return {
    categoryCounts,
    categories: Object.keys(categoryCounts),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    categorizeProducts: () => dispatch(categorizeProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesFilter)