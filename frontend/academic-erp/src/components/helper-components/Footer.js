import React from 'react';
import { Link } from 'react-router-dom';
import './../../css/style.css'

function Footer ( props ) {
  return (
      <div>
        <div class="footer">
        <p>Copyright (c) websitename. All rights reserved. <Link to="/"> www.academia.com </Link></p>
        </div>
      </div>
  );
}

export default Footer;