import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Features from "../components/Features";
import Review from "../components/Review";

const HomePage = () => {

  return (
      <div>

        <div className="bg">
          <div className="overlay">
            <div className="px-4 py-5 text-center">
              <h1 className="display-5 fw-bold" style={{paddingTop:"27px"}}>Teach Connect</h1>
              <div className="col-lg-6 mx-auto">
                <p className="lead mb-4s" style={{ fontSize:"25px"}}>Your Pathway to Collaborative Learning</p> 
              </div>
            </div>
          </div>
        </div>

        <Features />
        <Review />

      </div>
  );
};

export default HomePage;
