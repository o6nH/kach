import React from 'react';
import {Link} from 'react-router-dom';

export default function CategoriesFilter(props) {
  const {categories, categoryCounts} = props;
  return (
    <div id='filters'>
      <h3 >Filter by category: </h3>
      <ul name='categories'>
      {
        categories.map((category, index) => {
          const query = `category=${category}`;
          return (
            <li key={index}>
              <Link to={`/products?${query}`}>{`${category} (${categoryCounts[category]})`}</Link>
            </li>
          )
        })
      }
      </ul>
    </div>
  )
};
