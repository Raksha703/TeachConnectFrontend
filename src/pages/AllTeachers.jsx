import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row, Spinner, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FaStar } from 'react-icons/fa';
import '../css/style.css';

const BASE_URL = "http://127.0.0.1:5000";

function AllTeachers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
  const itemPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);

  const rows = users.slice(
    currentPage * itemPerPage,
    (currentPage + 1) * itemPerPage
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const numberOfPage = Math.ceil(users.length / itemPerPage);
  const pageIndex = Array.from({ length: numberOfPage }, (_, idx) => idx + 1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/allTeachers`);
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch teachers:", error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="all-teachers-container">
      <h2 className="heading">All Teachers</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Row xs={1} md={2} className="g-4 teacher-grid">
            {rows.map((user) => (
              <Col key={user._id}>
                <Card className="dark-card">
                  <Card.Body className="d-flex align-items-center">
                    <Image
                      src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(user.teacherName)}`}
                      roundedCircle
                      className="teacher-avatar"
                    />
                    <div className="teacher-info ms-3">
                      <Card.Title className="teacher-name">{user.teacherName}</Card.Title>
                      <div className="teacher-rating">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar
                            key={i}
                            color={i < user.teacherRating ? "#ffc107" : "#555"}
                          />
                        ))}
                      </div>
                      <Button
                        as={Link}
                        to="/lectureRating/"
                        state={{ teacherName: user.teacherName }}
                        className="view-btn mt-2"
                        variant="outline-light"
                      >
                        See Lecture Ratings
                      </Button>
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

export default AllTeachers;
