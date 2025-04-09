import React from 'react';
import { IoAirplaneOutline, IoPeopleOutline, IoLockClosedOutline } from 'react-icons/io5';

function Review(){

  const featureBoxStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    height: '100%',
  };

  return (
    <>
    <div className="container px-4 py-5 mx-8" id="featured-3">
      <h2 className="pb-2 border-bottom">REVIEWS</h2>
    <div className="row g-4 row-cols-1 row-cols-lg-3 m-2">
          <div className="feature col">
            <div className="feature-box" style={featureBoxStyle}>
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-dark bg-gradient fs-2 mb-3">
                <IoAirplaneOutline size="1.5em" />
              </div>
              <h3 className="fs-2 text-body-emphasis">A Game-Changer for Online Teaching!</h3>
              <p>Before using this platform, it was difficult to tell if my students were actually paying attention. Now, II get live feedback on their engagement levels, making my classes more interactive and effective.</p>
            </div>
          </div>
      <div className="feature col">
      <div className="feature-box" style={featureBoxStyle}>
      <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-dark bg-dark fs-2 mb-3">
                <IoPeopleOutline size="1.5em" />
              </div>
        <h3 className="fs-2 text-body-emphasis">Feels Like a Real Classroom</h3>
        <p>I appreciate that my teachers now understand when I am confused or need more explanation. This makes online learning feel more personalized and interactive.</p>
      </div>
      </div>
      <div className="feature col">
      <div className="feature-box" style={featureBoxStyle}>
      <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-dark bg-gradient fs-2 mb-3">
                <IoLockClosedOutline size="1.5em" />
              </div>
        <h3 className="fs-2 text-body-emphasis">No More Struggling in Silence</h3>
        <p>Sometimes, I hesitate to ask questions in online classes. This platform helps teachers recognize when I am struggling, so they address my concerns without me even needing to speak up.</p>
      </div>
      </div>
    </div>
    </div>
    </>
  );
}

export default Review;
