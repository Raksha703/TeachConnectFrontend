import React from 'react';

function Features() {
  return (
    <div style={{margin:"15px"}}>

      <h2 className="pb-2 border-bottom  px-4 py-5">OUR FEATURES</h2>

      <div className="row featurette">
        <div className="col-md-7 align-self-center">
          <h2 className="featurette-heading fw-normal lh-1">
          Lecture Engagement <span className="text-body-secondary">Analysis</span>
          </h2>
          <p className="lead">Automatically calculates engagement score based on student expressions. Provides lecture-wise emotional heatmaps and performance ratings.</p>
        </div>
        <div className="col-md-5" style={{paddingLeft:"100px", paddingTop:"30px"}}>
          <img
            className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
            width="500"
            height="500"
            src="https://img.freepik.com/premium-photo/close-up-compass-paper-map-guide-travel-adventure-lifestyle-concept-planning-road-trip-new-discover-traveler-people-trip-destination_425263-5567.jpg?w=5000"
            role="img"
            aria-label="Placeholder: 500x500"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
          </img>
        </div>
      </div>

      <hr className="featurette-divider" />

      <div className="row featurette">
        <div className="col-md-7 order-md-2 align-self-center">
          <h2 className="featurette-heading fw-normal lh-1">
          Real-Time <span className="text-body-secondary">Emotion Detection</span>
          </h2>
          <p className="lead">
          Uses facial expression analysis to detect student emotions live via webcam. Captures emotions like happy, sad, angry, surprised, neutral, etc.
          </p>
        </div>
        <div className="col-md-5 order-md-1">
          <img
            className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
            width="500"
            height="500"
            src="https://img.freepik.com/free-photo/people-planning-trip-with-map-full-shot_23-2148925826.jpg?w=826&t=st=1700590820~exp=1700591420~hmac=8e853991d34af9dd9d0c930a2bcb4b183f3900c1b788139333cce62454b33ddd"
            role="img"
            aria-label="Placeholder: 500x500"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
          </img>
        </div>
      </div>

      <hr className="featurette-divider" />

      <div className="row featurette">
        <div className="col-md-7 align-self-center">
          <h2 className="featurette-heading fw-normal lh-1">
          Teacher <span className="text-body-secondary">Dashboard</span>
          </h2>
          <p className="lead">Teachers can view emotional feedback of the class in real time. Displays visual summaries and ratings for each lecture.</p>
        </div>
        <div className="col-md-5"  style={{paddingLeft:"100px", paddingBottom:"10px"}}>
        <img
            className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
            width="500"
            height="500"
            src="https://img.freepik.com/premium-photo/15-minute-city-isometric-map-people-transport-security-cameras-drone-bot-police-border_587981-4216.jpg?w=740"
            role="img"
            aria-label="Placeholder: 500x500"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
          </img>
        </div>

        <hr className="featurette-divider" />
      </div>
    </div>
  );
}

export default Features;
