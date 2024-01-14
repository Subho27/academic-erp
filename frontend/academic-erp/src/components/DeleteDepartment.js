import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from './helper-components/Footer';

const DeleteDepartment = ( ) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [deptData, setDeptData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [alldepartments, setAllDepartments] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [data, setData] = useState({
    department: 0,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const fetchAllDepartments = () => {
    try {
      axios.get('http://localhost:9191/departments/get-all').then((response) => {
        if (response.status === 200) {
          const filterdata = [];
          for(var item of response.data) {
            if(item.id !== 1 && item.id !== 7) {
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
            axios.delete(`http://localhost:9191/departments/delete/${data.department}`).then((response) => {
              if (response.status === 200) {
                alert("Department successfully deleted.");
                navigate("/dashboard");
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
    fetchAllDepartments();
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
                  <h1>Delete Department</h1>
                </div>
                <div class="border"></div>
                <form onSubmit={handleSubmit}>
                  <div class="contact-form margin-top">
                  <div className="container">
                      <hr />
                      <label htmlFor="department"><span>Department</span>
                        <select name="department" id="department"class="input_text" onChange={handleChange} required>
                        <option value="0" disabled hidden>ALL DEPARTMENT</option>
                        {alldepartments.map((item, i) => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                        </select> 
                      </label>

                      <label><span>Password</span>
                      <input type="password" placeholder="Enter Password" name="password" class="input_text" id="password" onChange={handleChange} required />
                      </label>

                      <button type="submit" className="button" >DELETE</button>
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

export default DeleteDepartment;
