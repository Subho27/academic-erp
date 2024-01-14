import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from './helper-components/Footer';
import './../css/style.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [deptData, setDeptData] = useState({});
  const [alldepartments, setAllDepartments] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [data, setData] = useState({
    department: 0
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
          setAllDepartments(response.data);
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

  const fetchEmployees = () => {
    try {
      axios.get('http://localhost:9191/employee/get-all').then((response) => {
        if (response.status === 200) {
          setEmployees(response.data);
          handleSubmit();
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
  };

  const handleSubmit = () => {
    try {
      if(data.department !== 0 && data.department !== "0"){
        console.log(data);
        axios.get(`http://localhost:9191/employee/get/${data.department}`).then((response) => {
          if (response.status === 200) {
            console.log(typeof(response.data));
            if(response.data && response.data.length === 0){
              setEmployees([]);
            }
            else{
              setEmployees(response.data);
            }
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
      }
    } catch (error) {
      console.error('Error during logout:', error);
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
    fetchEmployees();
  }, [data]);

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
      <div class="panel-wrap">
        <div class="panel-wrapper">
        <div>
          <form>
            <div class="contact-form select-department margin-top">
              <div>
                <label><span style={{ color : 'black', fontWeight : 'bold' }}>Department</span></label>
              </div>
              <div>
                <select name="department" id="department" class="input_text" onChange={handleChange}>
                  <option value="0">ALL DEPARTMENT</option>
                  {alldepartments.map((item, i) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
        <div>
        {employees.map((item, i) => (
          <div class={`panel marRight30 marginTop marginBottom ${item.department.id === 7 ? 'fade' : ''}`}>
            <div class="img"><img src={require("./../images/img-1.jpg")} alt='profile'/></div>
            <div class="title">
              <h1 class="border-bottom">{item.first_name + " " + item.last_name}</h1>
            </div>
            <div class="border"></div>
            <div class="content">
              <p><b>EMAIL : </b>{item.email} <br/>
              <b>TITLE : </b>{item.title} <br/>
              <b>DEPARTMENT : </b>{item.department.name}<br/>
              </p>
            </div>
          </div>
        ))}
        </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Dashboard;
