import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from './helper-components/Footer';
import './../css/style.css';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [deptData, setDeptData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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
                    <h1>My Profile</h1>
                  </div>
                  <div class="border"></div>
                  <form>
                    <div class="contact-form margin-top">
                    <div className="container">
                        <hr />
                        <span><label>Name</label><p name="name" class="input_text" id="name">{userData.first_name + " " + userData.last_name}</p></span>
                        <span><label>Email</label><p name="email" class="input_text" id="email">{userData.email}</p></span>
                        <span><label>Title</label><p name="title" class="input_text" id="title">{userData.title}</p></span>
                        <span><label>Department</label><p name="department" class="input_text" id="department">{deptData.name}</p></span>
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

export default Profile;
