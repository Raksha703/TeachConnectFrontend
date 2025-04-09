import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentPage from "./pages/StudentPage";
import TeacherPage from "./pages/TeacherPage";
import HomePage from "./pages/HomePage";
import StudentLoginPage from "./pages/StudentLoginPage";
import TeacherLoginPage from "./pages/TeacherLoginPage";
import AllTeachers from "./pages/AllTeachers";
import LectureRating from "./pages/LectureRating";
import "./css/style.css";
import NavbarComp from "./components/NavbarComp";
import Footer from "./components/Footer";
import RegComp from "./pages/RegComp";

function App() {
  return (
    <>
      <div style={{
        backgroundImage: `url('https://visme.co/blog/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-08.jpg')`,
        backgroundColor: "#ffffff",
      }}
      >      

        <NavbarComp />

        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lectureRating" element={<LectureRating />} />
            <Route path="/allTeachers" element={<AllTeachers />} />
            <Route path="/reg" element={<RegComp />} />            
            <Route path="/studentLogin" element={<StudentLoginPage />} />
            <Route path="/teacherLogin" element={<TeacherLoginPage />} />
            <Route path="/student" element={<StudentPage/>} />
            <Route path="/teacher" element={<TeacherPage/>} />
        </Routes>

        <Footer />

      </div>
    </>
  );
}

export default App;
