import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  return (
    <header>
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">Data Peace</span>
        <Link to="/" className={props.location.pathname === '/' ? 'displaynone' : 'nav justify-content-end'}>
          Go Back
        </Link>    
      </nav>
    </header>
  )
}