import React from 'react';
import {Link} from 'react-router-dom';
const defaultImg = './img/product-image-placeholder.jpg';

export default function ProductCard({product}) {/* TODO:remove inline styles*/
  const {id:productId, name, imageUrls, price, aveRating} = product;
  return (
    <div key={productId} style={{margin: '.5px'}} className="card col-3 text-center shadow-lg p-3 mb-5 bg-light rounded">
      <Link to={`/products/${productId}`} className="stretched-link"> 
      <img src={imageUrls && imageUrls[0] ? imageUrls[0] : defaultImg} className="card-img-top"/>

      <h3>{name}</h3>
      </Link>
        <p style={{listStyle: 'none'}}>${`${price}`}</p>
        {/* {
          aveRating ? <li>AveRating: {`${Math.round(100*aveRating)/100}`}</li> : ''
        } */}
    </div>
  )
}

//style={{border:'2px solid black', width:'125px', height:'250px'}}