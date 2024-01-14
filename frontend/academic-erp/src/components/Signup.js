import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from './helper-components/Header';
import Footer from './helper-components/Footer';
import './../css/style.css';

function Signup( props ) {
  const navigate = useNavigate();
  
  const [alldepartments, setAllDepartments] = useState([]);
  const [errorText, SetErrorText] = useState([]);
  const [rePass, SetRePass] = useState([]);
  const [data, setData] = useState({
    email: '',
    password: '',
    filename: '',
    first_name: '',
    last_name: '',
    title: '',
    department: ''
  });

  const fetchAllDepartments = () => {
    try {
      axios.get('http://localhost:9191/departments/get-all').then((response) => {
        if (response.status === 200) {
          const filterdata = [];
          for(var item of response.data) {
            if(item.id !== 7) {
              filterdata.push(item);
            }
          }
          setAllDepartments(filterdata);
        } else {
          alert("There was an error logging you out. Please try again!");
          navigate("/login");
        }
      }).catch(error => {
        if (error.response) {
          alert('Error message from Academia : ' + error.response.data);
        } else {
          alert('Error :', error.message);
        }
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  const handleReChange = (e) => {
    SetRePass(e.target.value);
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const isValidRepass = (value1, value2) => {
    return (value1 === value2);
  }

  const dataValidation = () => {
    var error = [];
    var emailVal = isValidEmail(data.email);
    if(!emailVal) {
      error.push("Email is invalid.");
    }

    var passVal = isValidPassword(data.password);
    if(!passVal) {
      error.push("Password is invalid");
    }

    var rePassVal = isValidRepass(data.password, rePass);
    if(!rePassVal) {
      error.push("Password not matching");
    }

    SetErrorText(error);

    if(error.length === 0){
      return true;
    }
    else {
      return false;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(dataValidation()) {
      const userData = {
        email: data.email,
        password: data.password,
        filename: data.filename,
        first_name: data.first_name,
        last_name: data.last_name,
        title: data.title,
        department: data.department
      };
      axios.post("http://localhost:9191/handle/register", userData).then((response) => {
        console.log(response);
        if(response.status === 200) {
          alert("User was registered successfully.");
        }
        else {
          alert("There was an error registering you. Please try again!")
        }
        navigate("/");
      }).catch(error => {
        if (error.response) {
          alert('Error message from Academia : ' + error.response.data);
        } else {
          alert('Error :', error.message);
        }
      });
    }
    
  };

  useEffect(() => {
    fetchAllDepartments();
  }, []);

  return (
    <div>
        <Header/>
        <div class="page-wrap">
          <div class="page-wrapper">
            <div class="primary-content marRight30">
              <div class="mid-panel">
                <div class="mid-panel-content">
                  <div class="title">
                    <h1>Sign Up</h1>
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
                    <label> <span>Repeat Password</span>
                    <input type="password" class="input_text" placeholder="Repeat Password" name="password-repeat" id="password-repeat" onChange={handleReChange} required />
                    </label>
                    <label> <span>Photo</span>
                    <input type="file" class="input_text" id="filename" onChange={handleChange} name="filename"/>
                    </label>
                    <label> <span>First Name</span>
                    <input type="text" class="input_text" placeholder="Enter First Name" name="first_name" id="first_name" onChange={handleChange} required />
                    </label>
                    <label> <span>Last Name</span>
                    <input type="text" class="input_text" placeholder="Enter Last Name" name="last_name" id="last_name" onChange={handleChange} required />
                    </label>
                    <label> <span>Title</span>
                    <input type="text" class="input_text" placeholder="Enter Title" name="title" id="title" onChange={handleChange} required />
                    </label>
                    <label> <span>Department</span>
                    <select name="department" id="department" class="input_text" onChange={handleChange}>
                        <option value="0">SELECT A DEPARTMENT</option>
                        {alldepartments.map((item, i) => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                      </select>
                    </label>
                    {(errorText.length === 0) ? <></>: 
                      errorText.map((item, i) => (
                        <p>{item}</p>
                    ))}
                    <hr />
                      <p>* By creating an account you agree to our <Link to="/">Terms & Privacy</Link>.</p>
                      <button type="submit" className="button">SIGN UP</button>
                    </div>

                    <div className="container signin">
                      <p>Already have an account? <Link to="/login">Sign In</Link>.</p>
                    </div>

                    {/* <label>
                        <input type="checkbox" checked="checked" name="remember" /> Remember me
                      </label> */}
                    {/* <div className="container">
                      <Link to="/"><button type="button" className="cancelbtn">Forgot Password?</button></Link>
                    </div> */}
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

export default Signup;