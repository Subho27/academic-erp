import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from './helper-components/Footer';
import './../css/style.css';

const Request = () => {

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
                  <li class="marRight20"><Link class="active" to="/profile">profile</Link></li>
                  <li class="marRight20"><Link class="active" to="/dashboard">dashboard</Link></li>
              </ul>
              </div>
          </div>
        </div>
        <div class="page-wrap">
          <div class="page-wrapper">
            <div class="primary-content marRight30">
              <div class="mid-panel">
                <div class="mid-panel-content">
                <div class="panel marRight30 marginTop marginBottom">
                    <div class="title">
                    <h1 class="border-bottom">COMING SOON</h1>
                    </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
    </div>
  );
};

export default Request;
