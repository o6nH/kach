import React from 'react';
import {Link} from 'react-router-dom';

export default function Home() {
  return (
    <div className="jumbotron">
      <h1 className="display-2"><span role='img' aria-label="Hello">👋</span> Welcome <span role='img' aria-label="Developers">👩‍💻</span></h1>
      <p className="lead">This a marketplace for developers to buy and sell anything they have found useful while working on their projects.</p>
      <hr className="my-4"></hr>
      <p>Check out our products!</p>
      <Link to='/products' class="btn btn-primary btn-lg" href="#" role="button">See Products</Link>
    </div>
  )
}
