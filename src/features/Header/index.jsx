import React from 'react';
import { Link } from 'react-router-dom';

const navbar = () => {
  return (
    <div className="column is-4 is-offset-4">
      <nav className="navbar">
        <div className="container">
          <div id="navbarMenuHeroA" className="navbar-menu">
            <div className="navbar-end">
              {localStorage.getItem("username") ?
                <Link className="navbar-item" to="/logout">Sali {localStorage.getItem("username")}</Link>
              :
                <Link className="navbar-item" to="/">Entra</Link>
              }
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default navbar;