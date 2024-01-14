import React from 'react';
import { Link } from 'react-router-dom';
import './../../css/style.css'

function Header ( props ) {

  return (
      <div>
          <div class="header">
        <div class="header-left-panel">
            <div class="logo-wrap">
            <div class="logo">
                <h1>Academia ERP</h1>
            </div>
            </div>
        </div>
        <div class="header-right-panel">
            <div class="header-right-panel-top">
            </div>
            <div class="menu">
            <ul>
                <li class="marRight20"><Link class="active" to="/">home</Link></li>
                <li class="marRight20"><Link to="/login">login</Link></li>
                <li><Link to="/signup">signup</Link></li>
            </ul>
            </div>
        </div>
        </div>
      </div>
  );
}

export default Header;