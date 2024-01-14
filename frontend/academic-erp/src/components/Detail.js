import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from './helper-components/Footer';
import './../css/style.css';

const Detail = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [deptData, setDeptData] = useState({});
  const [deptDetail, setDeptDetail] = useState([]);
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
  const fetchDeptDetail = () => {
    try {
        axios.get(`http://localhost:9191/departments/get/detail`).then((response) => {
            console.log("gun");
          if (response.status === 200) {
            setDeptDetail(response.data);
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
    fetchDeptDetail();
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
                {deptDetail.map((item, i) => (
                <div class="panel marRight30 marginTop marginBottom">
                    <div class="title">
                    <h1 class="border-bottom">{item.name}</h1>
                    </div>
                    <div class="border"></div>
                    <div class="content">
                    <p><b>CAPACITY : </b>{item.capacity} <br/>
                    <b>STRENGTH : </b>{item.strength} <br/>
                    </p>
                    </div>
                </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
    </div>
  );
};

export default Detail;
