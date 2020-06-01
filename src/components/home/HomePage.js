import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="jumbotron">
    <h1> Pluralsight Administration </h1>
    <p> React, Redux and React router for ultra responsive websites.</p>
    <Link to="about" className="btn btn-primary btn-sm">
      Learn More
    </Link>
  </div>
);

export default HomePage;
