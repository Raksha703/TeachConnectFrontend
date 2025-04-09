import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import "../css/style.css";
import { FaChalkboardTeacher, FaUserPlus, FaSignInAlt, FaUserCircle } from "react-icons/fa";

function NavbarComp() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" id="title">
          <FaChalkboardTeacher className="mb-1 me-2" />
          Teach Connect
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="me-auto"></Nav>

          <Nav className="ms-auto">
            <NavDropdown title={<><FaUserCircle className="mb-1 me-1" style={{fontSize : "25px"}} /> Profile</>} id="profile-dropdown">
              <NavDropdown.Item as={Link} to="/allTeachers">
                <FaChalkboardTeacher className="me-2" />
                All Teachers
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/reg">
                <FaUserPlus className="me-2" />
                Register
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item as={Link} to="/teacherLogin">
                <FaSignInAlt className="me-2" />
                Login as Teacher
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/studentLogin">
                <FaSignInAlt className="me-2" />
                Login as Student
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
