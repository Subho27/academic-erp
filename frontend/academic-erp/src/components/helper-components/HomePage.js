import React from 'react';
import { Link } from 'react-router-dom';
import './../../css/style.css'

function HomePage ( props ) {

    return (
      <div>
        <div class="panel-wrap">
            <div class="clearing"></div>
            <div class="page-wrap">
            <div class="top-content">
                <h1>Welcome to Our College Portal</h1>
                <div class="top-border"></div>
                <p>Explore a world of academic opportunities and collaboration. Our college portal is designed to provide a seamless experience for students and faculty. From accessing course materials to staying informed about campus events, our portal is your gateway to a vibrant and enriching college journey. Join us in the pursuit of knowledge and personal growth.</p>
                <div class="bottom-border"></div>
                <div class="button-link"><Link to="/">readmore</Link></div>
            </div>
            <div class="page-wrapper">
                <div class="primary-content marRight30 ">
                <div class="toppanel">
                    <div class="container">
                    <h1>Unlock Your Academic Potential.</h1>
                    <div class="border-bottom"></div>
                    <div class="container-wrap">
                        <div class="container-panel padBottom">
                        <div class="container-panel-left marRight20"><img src={require("./../../images/icon-1.png")} alt='img-1'/></div>
                        <div class="container-panel-right">
                            <h3>Discover Exciting Courses</h3>
                            <p>Explore a diverse range of courses tailored to your interests.</p>
                        </div>
                        </div>
                        <div class="container-panel borderNone marginTop">
                        <div class="container-panel-left marRight20"><img src={require("./../../images/icon-3.png")} alt='img-1'/></div>
                        <div class="container-panel-right">
                            <h3>Expand Your Knowledge</h3>
                            <p>Immerse yourself in learning opportunities that will shape your academic journey.</p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="container-wrap borderNone">
                    <div class="container-panel marLeft20 padBottom">
                        <div class="container-panel-left marRight20"><img src={require("./../../images/icon-2.png")} alt='img-1'/></div>
                        <div class="container-panel-right">
                        <h3>Engage in Academic Excellence</h3>
                        <p>Embark on a journey of knowledge expansion.</p>
                        </div>
                    </div>
                    <div class="container-panel borderNone marginTop marLeft20">
                        <div class="container-panel-left marRight20"><img src={require("./../../images/icon-4.png")} alt='img-1'/></div>
                        <div class="container-panel-right">
                        <h3>Embrace a Vibrant Learning Community</h3>
                        <p>Join a vibrant learning community that fosters collaboration and innovation.</p>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="mid-panel marginTop">
                    <div class="mid-panel-content">
                    <div class="title">
                        <h1>Welcome to Our College Portal</h1>
                    </div>
                    <div class="border"></div>
                    <h2>Explore Exciting Opportunities</h2>
                    <p>Embark on a journey of discovery at our college portal. </p>
                    <div class="img marRight20"> <img src={require("./../../images/img-4.jpg")} alt='img-1'/></div>
                    <div class="img marRight20"> <img src={require("./../../images/img-5.jpg")} alt='img-1'/></div>
                    <div class="img"> <img src={require("./../../images/img-6.jpg")} alt='img-1'/></div>
                    </div>
                </div>
                <div class="mid-panel marginTop">
                    <div class="mid-panel-content ">
                    <div class="title">
                        <h1>Welcome to our Academic Journey</h1>
                    </div>
                    <div class="border"></div>
                    <h2>Explore the Campus Experience</h2>
                    <p>Immerse yourself in a world of learning and discovery. Our commitment to academic excellence ensures a transformative experience.</p>
                    <p class="padBottom">Embark on an educational journey that goes beyond the ordinary. Our dynamic campus life offers a rich tapestry of experiences. Discover diverse opportunities for intellectual and personal growth. Engage in thought-provoking discussions, collaborative projects, and exciting extracurricular activities.</p>
                    </div>
                </div>
                </div>
                <div class="sidebar">
                <div class="search-panel">
                    <div class="content">
                    <div class="title">
                        <h1>Explore the Campus</h1>
                    </div>
                    <div class="border"></div>
                    <h2>Search the site here...</h2>
                    <div class="searchbox">
                        <input type="text" class="input" value="" />
                        <div class="button"><Link to="/"></Link></div>
                    </div>
                    </div>
                </div>
                <div class="midpanel">
                    <div class="content marginBottom">
                    <div class="title">
                        <h1>Discover Opportunities for Growth</h1>
                    </div>
                    <div class="border"></div>
                    <ul>
                        <li><Link to="/">Explore Various Academic Programs</Link></li>
                        <li><Link to="/">Engage in Engrossing Learning Experiences</Link></li>
                        <li><Link to="/">Discover Exciting Opportunities at Our Campus</Link></li>
                        <li><Link to="/">Connect with a Vibrant Community</Link></li>
                        <li><Link to="/">Foster Your Growth and Development</Link></li>
                        <li><Link to="/">Strive for Excellence in Education</Link></li>
                        <li className="borderNone padBottom20"><Link to="/">Innovate and Thrive in Academic Endeavors</Link></li>
                    </ul>
                    </div>
                </div>
                <div class="midpanel">
                    <div class="content">
                    <div class="title">
                        <h1>Explore our Distinguished Individuals</h1>
                    </div>
                    <div class="border"></div>
                    <div class="container">
                        <div class="left marRigth20">
                        <h2>Ajay</h2>
                        <p>Embark on a journey of intellectual exploration.</p>
                        </div>
                        <div class="img"><img src={require("./../../images/img-7.jpg")} alt='img-1'/></div>
                    </div>
                    <div class="container">
                        <div class="left">
                        <h2>Rishav</h2>
                        <p>Experience a vibrant community.</p>
                        </div>
                        <div class="img"><img src={require("./../../images/img-8.jpg")} alt='img-1'/></div>
                    </div>
                    <div class="container borderNone">
                        <div class="left">
                        <h2>Suraj</h2>
                        <p>Unlock your potential with inspiring mentors.</p>
                        </div>
                        <div class="img"><img src={require("./../../images/img-9.jpg")} alt='img-1'/></div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  );
}

export default HomePage;