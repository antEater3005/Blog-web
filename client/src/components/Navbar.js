import React from 'react';
import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <div className='navbar'>
      <h1>Brimstone Blogs</h1>
      <div className='links'>
        <Link to={'/api'}>Home</Link>
        <Link to={'/api/create'}>Create</Link>
      </div>
    </div>
  );
}
