import React from 'react';
import {Link} from 'react-router-dom';

export default function ProductCard({product}) {/* TODO:remove inline styles*/
  const {id:productId, name, imageUrls, price, aveRating} = product;
  return (
    <div key={productId} style={{border:'2px solid black', width:'125px', height:'180px'}}>
      <Link to={`/products/${productId}`}> 
      <img src={imageUrls[0]} style={{width:'125px'}}/>
      <h3>{name}</h3>
      </Link>
      <ul>
        <li>Price: ${`${price}`}</li>
        {
          aveRating ? <li>AveRating: {`${Math.round(100*aveRating)/100}`}</li> : ''
        }
      </ul>
    </div>
  )
}
