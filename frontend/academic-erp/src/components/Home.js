import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './helper-components/Header';
import Footer from './helper-components/Footer';
import HomePage from './helper-components/HomePage';

function Home ( props ) {
  const navigate = useNavigate();
  const fetchSessionData = () => {
    if(localStorage.getItem("donotopen") !== null) {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    fetchSessionData();
  }, []);

  return (
      <div>
        <Header/>
        <HomePage/>
        <Footer/>
      </div>
  );
}

export default Home;