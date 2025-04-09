import { Button, Form, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../css/style.css";
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = "http://127.0.0.1:5000";

function RegComp() {
  const [data, setData] = useState({
    type: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const strongPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

    if (!emailRegex.test(data.email)) {
      setError("Invalid email format.");
      return false;
    }

    if (!strongPassword.test(data.password)) {
      setError("Password must be at least 6 characters and contain a number.");
      return false;
    }

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateInputs()) return;

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          type: data.type
        })
      });

      const result = await res.json();
      setLoading(false);

      if (res.ok) {
        toast.success(result.message);
        setData({ type: "", name: "", email: "", password: "", confirmPassword: "" });
      } else {
        toast.error(result.message);
        setError(result.message);
      }

    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong. Try again.");
      setError("Something went wrong.");
    }
  };

  return (
    <div style={{ margin: "15px" }}>
      <h2 className="heading">Register</h2>
      <ToastContainer />
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <Form className="Profile" onSubmit={handleSubmit}>
            {/* User Type */}
            <Form.Group className="mb-3">
              <Form.Label>Register as</Form.Label>
              <Form.Select
                aria-label="User type"
                required
                name="type"
                onChange={handleChange}
                value={data.type}
              >
                <option value="">Select user type</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </Form.Select>
            </Form.Group>

            {/* Name */}
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Name"
                name="name"
                onChange={handleChange}
                value={data.name}
              />
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
              />
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3">
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

            {/* Confirm Password */}
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={handleChange}
                value={data.confirmPassword}
                required
              />
            </Form.Group>

            {error && <div style={{ color: "red" }}>{error}</div>}

            <Button variant="primary" type="submit" className="btn-dark">
              Register
            </Button>
          </Form>
          {
            (data.type=="student") ? 
              <p>Already have an account? <Link to="/studentLogin">Login</Link></p>
             :
              <p>Already have an account? <Link to="/teacherLogin">Login</Link></p>
            
          }
        </>
      )}
    </div>
  );
}

export default RegComp;
