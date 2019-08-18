import React from 'react';

function Unauthorized() {
  return <div style={{textAlign:'center'}}>
    <span style={{fontSize:'128px'}}>🚫</span>
    <h1>Unauthorized</h1>
    <p>You are not authorized to perform this action.</p>
  </div>;

}

export default Unauthorized;