import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './../css/style.css'
import Header from './helper-components/Header';
import Footer from './helper-components/Footer';

function Login ( props ) {

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:9191/handle/login", {
        email: data.email,
        password: data.password,
      }).then((response) => {
        localStorage.setItem("donotopen", JSON.stringify(response.data));
        if(response.status === 200) {
          alert("Login successful.");
        }
        else {
          alert("There was an error logging you in. Please try again!")
        }
        navigate("/dashboard");
      }).catch(error => {
        if (error.response) {
          alert('Error message from Academia : ' + error.response.data);
        } else {
          alert('Error :', error.message);
        }
      });
    } catch (error) {
        console.error('Error during login:', error);
    }
  };

  return (
      <div>
        <Header/>
        <div class="page-wrap">
          <div class="page-wrapper">
            <div class="primary-content marRight30">
              <div class="mid-panel">
                <div class="mid-panel-content">
                  <div class="title">
                    <h1>LogIn</h1>
                  </div>
                  <div class="border"></div>
                  <form onSubmit={handleSubmit}>
                  <div class="contact-form margin-top">
                    <label> <span>Email</span>
                    <input type="text" placeholder="Enter Email" id="email" class="input_text" name="email" onChange={handleChange} required />
                    </label>
                    <label> <span>Password</span>
                    <input type="password" class="input_text" placeholder="Enter Password" id="password" name="password" onChange={handleChange} required />
                    </label>
                    {/* <label>
                        <input type="checkbox" checked="checked" name="remember" /> Remember me
                      </label> */}
                    {/* <div className="container">
                      <Link to="/"><button type="button" className="cancelbtn">Forgot Password?</button></Link>
                    </div> */}
                    <label>
                    <input type="submit" class="button" value="LOGIN" />
                    </label>
                    </div>
                  </form>
                  <div class="clearing"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
      
  );
}

export default Login;