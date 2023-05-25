import React from "react";
import PropTypes from "prop-types";
import styles from "./main.module.css";
import "./main.css";
import Header from "./header";
import Categories from "./categories";
import "./styles.css";

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle';
//import 'bootstrap-icons/font/bootstrap-icons.css';

//import image1 from '../../../images/trato1.jpg'
const MainPage = () => {
  return (
    <div className="v117_338">
      <Header />
      <Categories />
    </div>
  );
};

export default MainPage;
