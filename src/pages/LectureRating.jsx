import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { Card, Col, Row, Spinner, Image } from 'react-bootstrap';
import "../css/style.css";
import { toast, ToastContainer } from 'react-toastify';
import { FaStar } from 'react-icons/fa';

const BASE_URL = "http://127.0.0.1:5000";


function TeacherRating() {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);

  const location = useLocation();
  const { teacherName } = location.state || {};

  const rows = lectures.slice(
    currentPage * itemPerPage,
    (currentPage + 1) * itemPerPage
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const numberOfPage = Math.ceil(lectures.length / itemPerPage);
  const pageIndex = Array.from({ length: numberOfPage }, (_, idx) => idx + 1);

  useEffect(() => {
    const fetchData = async () => {
      if (!teacherName) return;
      try {
        const response = await axios.post(`${BASE_URL}/api/lectureRating`, {
          teacherName: teacherName
        });
        setLectures(response.data);
      } catch (error) {
        console.error("Failed to fetch lecture data:", error.message);
        toast.error("Failed to fetch lectures.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teacherName]);

  return (
    <div className="all-teachers-container">
    <div className="d-flex justify-content-center mb-4">
    
    <Image
      src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(teacherName)}`}
      roundedCircle
      className="teacher-avatar"
      style={{ width: '100px', height: '100px' }}
    />
  </div>
      <h2 className="heading">{`${teacherName}`}</h2>
      
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Row xs={1} md={2} className="g-4 teacher-grid">
            {rows.map((lecture) => (
              <Col key={lecture._id}>
                <Card className="dark-card">
                  <Card.Body className="d-flex align-items-center">
                    <div className="teacher-info ms-3">
                      <Card.Title className="teacher-name">{lecture.lectureId}</Card.Title>
                      <div className="teacher-rating">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar
                            key={`${lecture._id}-star-${i}`}
                            color={i < lecture.teacherRating ? "#ffc107" : "#555"}
                            className="me-1"
                          />
                        ))}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="page-btn mt-4">
            <button disabled={currentPage < 1} onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
            {pageIndex.slice(
              Math.max(0, currentPage - 2),
              Math.min(numberOfPage, currentPage + 3)
            ).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page - 1)}
                className={page === currentPage + 1 ? "active" : ""}
              >
                {page}
              </button>
            ))}
            <button disabled={currentPage >= numberOfPage - 1} onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
          </div>
        </>
      )}
    </div>
  );
}

export default TeacherRating;
