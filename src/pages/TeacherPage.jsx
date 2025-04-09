import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from "recharts";

const TeacherPage = () => {
  const [emotions, setEmotions] = useState({});
  const [rating, setRating] = useState(null);
  const [error, setError] = useState(null);
  const BASE_URL = "http://127.0.0.1:5000";

  const location = useLocation();

  const { teacherName, lectureId } = location.state || {};

  useEffect(() => {
    if (!teacherName) return;

    const fetchEmotions = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/get_emotions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ teacherName, lectureId }),
        });

        const data = await response.json();

        if (!response.ok || data.message) {
          setEmotions({});
          setRating(null);
          setError("Lecture not found");
          return;
        }

        setEmotions(data.emotions || {});
        setRating(data.rating ?? "N/A");
        setError(null);
      } catch (error) {
        console.error("Error fetching emotions:", error);
        setError("Failed to fetch emotions");
      }
    };

    fetchEmotions(); // Initial fetch
    const intervalId = setInterval(fetchEmotions, 2000); // Refresh every 2 seconds

    return () => clearInterval(intervalId);
  }, [teacherName, lectureId]);

  const emotionData = Object.entries(emotions).map(([emotion, count]) => ({
    emotion,
    count,
  }));

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2 className="heading">Teacher Dashboard</h2>
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
      <h4>Lecture Rating: {rating}</h4>
      <h5>Emotions Summary</h5>

      {emotionData.length > 0 ? (
        <ResponsiveContainer width="80%" height={400}>
          <BarChart data={emotionData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="emotion" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#146EB4" barSize={50}>
              <LabelList dataKey="count" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No emotions detected yet.</p>
      )}
    </div>
  );
};

export default TeacherPage;
