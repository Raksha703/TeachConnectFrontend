import {Button, Form} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
const SERVERURL = "http://127.0.0.1:5000";

function LoginPage() {
  const [data, setData] = useState({ teacherName: "", lectureId:"", password: "", email:"" });
  const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

/*    localStorage.setItem("teacherNameFromTeacher", data.teacherName);
    localStorage.setItem("lectureIdFromTeacher", data.lectureId);
*/
		try {
      const response = await fetch(`${SERVERURL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          usertype: "teacher"
        }),
      });

      console.log(data);
  
      const result = await response.json();
  
      if (result.success) {
        // Optionally store in localStorage
        // localStorage.setItem("teacherNameFromTeacher", data.teacherName);
        // localStorage.setItem("lectureIdFromTeacher", data.lectureId);
  
        // Navigate to teacher dashboard with state
        navigate("/teacher", {
          state: {
            teacherName: data.teacherName,
            lectureId: data.lectureId
          }
        });
      } else {
        console.log("Login failed",result );
        // You can show an error message here too
      }
		} catch (error) {
      console.log("login error: ", error)
		}
	};

  return (
    <div  style={{margin:"15px"}}>
    <h2 className="heading">Teacher Login</h2>
      <>
    <Form  className="Profile" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Teacher User Name</Form.Label>
        <Form.Control        
          type="teacherName"
					placeholder="Teacher Name"
					name="teacherName"
					onChange={handleChange}
					value={data.teacherName}
					required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email id</Form.Label>
        <Form.Control        
          type="email"
					placeholder="Email"
					name="email"
					onChange={handleChange}
					value={data.email}
					required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Lecture Id</Form.Label>
        <Form.Control        
          type="lectureId"
					placeholder="Lecture Id"
					name="lectureId"
					onChange={handleChange}
					value={data.lectureId}
					required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password"
				  placeholder="Password"
				  name="password"
				  onChange={handleChange}
				  value={data.password}
				  required
        />
      </Form.Group>
      
      <Button variant="primary" type="submit" className='btn-dark'>
        Login
      </Button>
    </Form>
    <p>New User? <Link to="/reg">Register</Link></p>
    </>
    
    </div>
  );
}

export default LoginPage;

{/*
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // To handle navigation

const StudentLogin = () => {
  const [studentName, setStudentName] = useState(""); // State to store the student name
  const navigate = useNavigate(); // Hook to manage page navigation

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (studentName) {
      // Redirect to the /student route with the student's name as a URL parameter
      navigate(`/student/${studentName}`);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Student Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)} // Update state as user types
          required
          style={{ padding: "10px", fontSize: "16px", marginBottom: "10px" }}
        />
        <br />
        <button type="submit" style={{ padding: "10px", fontSize: "16px" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default StudentLogin;
*/}
