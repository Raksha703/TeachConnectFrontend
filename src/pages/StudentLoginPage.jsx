import {Button, Form} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";

function LoginPage() {
  const [data, setData] = useState({ studentName: "", password: "", teacherName:"", lectureId:""});
  const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
        navigate("/student/", { state: { studentName:data.studentName, teacherName: data.teacherName, lectureId: data.lectureId } });
      
		} catch (error) {
      console.log("login error: ", error)
		}
	};

  return (
    <div  style={{margin:"15px"}}>
    <h2 className="heading">Student Login</h2>
      <>
    <Form  className="Profile" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Student User Name</Form.Label>
        <Form.Control        
          type="studentName"
					placeholder="Student Name"
					name="studentName"
					onChange={handleChange}
					value={data.studentName}
					required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Teacher User Name</Form.Label>
        <Form.Control 
          type="teacherName"
				  placeholder="teacherName"
				  name="teacherName"
				  onChange={handleChange}
				  value={data.teacherName}
				  required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Lecture Id</Form.Label>
        <Form.Control 
          type="lectureId"
				  placeholder="lectureId"
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