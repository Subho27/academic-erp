import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from './helper-components/Footer';
import './../css/style.css';

const AddDepartment = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [deptData, setDeptData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [data, setData] = useState({
    department: 0,
    name: '',
    capacity: '',
    password: ''
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const fetchSessionData = () => {
    if(localStorage.getItem("donotopen") !== null) {
      const dataFromLocalStorage = JSON.parse(localStorage.getItem("donotopen"));
      if(dataFromLocalStorage.id == null || dataFromLocalStorage.id <= 0) {
        navigate("/");
      }
      setUserData(dataFromLocalStorage);
      setDeptData(dataFromLocalStorage.department);
      setIsLoggedIn(true);
      if(dataFromLocalStorage.department.id === 1) {
          setIsAdmin(true);
      }
    }
    else {
      navigate("/");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:9191/handle/login", {
        email: userData.email,
        password: data.password,
      }).then((response) => {
        if(response.status === 200) {
          try {
            axios.post('http://localhost:9191/departments/add', {
              name : data.name,
              capacity : data.capacity
            }).then((response) => {
              if (response.status === 200) {
                alert("Department successfully added.");
                navigate("/dashboard");
              }
              else {
                alert("There was an error logging you out. Please try again!");
                navigate("/login");
              }
            }).catch(error => {
              if (error.response) {
                alert('Error message from Academia : ' + error.response.data);
                navigate("/login");
              } else {
                alert('Error :', error.message);
              }
            }); 
          } catch (error) {
            console.error('Error during logout:', error);
          }
        }
        else {
          alert("There was an error logging you in. Please try again!")
        }
      }).catch(error => {
        if (error.response) {
          alert("You are not an admin, how did you reach here? :/");
          setIsLoggedIn(false);
          localStorage.clear();
          setUserData({});
          navigate("/login");
        } else {
          alert('Error :', error.message);
        }
      });
    } catch (error) {
        console.error('Error during login:', error);
    }
    
  };

  const handleLogout = async () => {
    try {
        await axios.post('http://localhost:9191/handle/logout').then((response) => {
        if (response.status === 200) {
            setIsLoggedIn(false);
            localStorage.clear();
            navigate("/login");
        } else {
            alert("There was an error logging you out. Please try again!");
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
  };

  useEffect(() => {
    fetchSessionData();
  }, []);

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
              {(isLoggedIn)? <li class="marRight20"><Link class="active" to="/profile">profile</Link></li>: <></>}
              {(isLoggedIn)? <li class="marRight20"><Link class="active" to="/dashboard">dashboard</Link></li>: <></>}
              {(isAdmin)? <li class="marRight"><Link class="active" to="/adddepart">add dept.</Link></li>: <></>}
              {(isAdmin)? <li class="marRight20"><Link class="active" to="/updatedep">update dept.</Link></li>: <></>}
              {(isAdmin)? <li class="marRight20"><Link class="active" to="/deletedep">delete dept.</Link></li>: <></>}
              {(isAdmin)? <li class="marRight"><Link class="active" to="/request">requests</Link></li>: <></>}
              {(isAdmin)? <li class="marRight20"><Link class="active" to="/detail">departments</Link></li>: <></>}
              {(isLoggedIn)? <li class="marRight"><Link class="active" onClick={handleLogout} >logout</Link></li>: <></>}
              </ul>
              </div>
          </div>
        </div>
        <div class="page-wrap">
          <div class="page-wrapper">
            <div class="primary-content marRight30">
              <div class="mid-panel">
                <div class="mid-panel-content">
                  <div class="title">
                    <h1>Add Department</h1>
                  </div>
                  <div class="border"></div>
                  <form onSubmit={handleSubmit}>
                    <div class="contact-form margin-top">
                    <div className="container">
                        <hr />
                        <label><span>Name</span>
                        <input type="text" placeholder="Enter Department Name" name="name" id="name" class="input_text" onChange={handleChange} style={{ textTransform: 'uppercase' }} required />
                        </label>

                        <label><span>Capacity</span>
                        <input type="number" placeholder="Enter Capacity" name="capacity" class="input_text" id="capacity" onChange={handleChange} required />
                        </label>

                        <label><span>Password</span>
                        <input type="password" placeholder="Enter Password" name="password" class="input_text" id="password" onChange={handleChange} required />
                        </label>

                        <button type="submit" className="button" >ADD</button>
                    </div> 
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
};

export default AddDepartment;
