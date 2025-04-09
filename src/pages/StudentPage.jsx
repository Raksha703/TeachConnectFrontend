import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; 

const BASE_URL = "http://127.0.0.1:5000";

const StudentPage = () => {
  const [emotion, setEmotion] = useState("Loading...");

  const location = useLocation();

  const { studentName, teacherName, lectureId } = location.state || {};

  console.log(`student: ${studentName}, teacher: ${teacherName}, lectureId: ${lectureId}`)
  
  useEffect(() => {
    const fetchEmotionAndSend = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/detect`);

        if (!response.ok) {
          throw new Error("Failed to detect emotion");
        }

        const data = await response.json();
        console.log("Detected emotion:", data, "student: ", studentName, "teacher: ", teacherName);

        if (data.emotion && studentName) {
          
          await fetch(`${BASE_URL}/api/send_emotion`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              studentName: studentName,
              teacherName: teacherName,
              lectureId:lectureId,
              emotion: data.emotion,
            }),
          });

          setEmotion(data.emotion);
        }

        {/*
        const data = await response.json();

        console.log("data in student page: ", data)

        await fetch(`${BASE_URL}/send_emotion`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: studentName,
            emotion: data.emotion,
          }),
        });

        setEmotion(data.emotion);*/}

      } catch (error) {
        console.error("Error sending emotion:", error);
      }
    };

    const intervalId = setInterval(fetchEmotionAndSend, 1000);

    return () => clearInterval(intervalId);
  }, [studentName, teacherName, lectureId]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2 className="heading">Student Page</h2>
      <p>
        <strong>Detected Emotion:</strong> {emotion}
      </p>
      <img
        src={`${BASE_URL}/api/video`}
        alt="Emotion Detection Stream"
        style={{
          width: "80%",
          border: "2px solid black",
          borderRadius: "10px",
          margin: "20px 0",
        }}
      />
    </div>
  );
};

export default StudentPage;