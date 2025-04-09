const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { spawn } = require('child_process');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const runPythonScript = () => {

  const pythonProcess = spawn('python', [
    'C:\\Users\\703ra\\Documents\\Projects\\mood-matrix-mern\\server\\PythonFiles\\emotion_detector.py',
  ]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python Output: ${data.toString()}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python Error: ${data.toString()}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python script finished with code ${code}`);
  });
};

runPythonScript();

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

/*
// 1. Home route
app.get("/", homeRoute);

// 2. Endpoint to receive student emotion data
app.post("/send_emotion", send_emotionRoute);

// 3. Endpoint for the teacher to fetch all detected emotions
app.get("/get_emotions", getEmotionRoute);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
*/

/*
// Import necessary packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db"); // Import the DB connection file

// Import Mongoose models (Student, Emotion, Session)
const { Student } = require("./models/student");
const { Emotion } = require("./models/emotion");
const { Session } = require("./models/session");

// Initialize environment variables
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

// Create an Express app
const app = express();

// Middleware
app.use(express.json()); // To parse JSON body
app.use(cors()); // To handle CORS issues (Cross-Origin Resource Sharing)

// Connect to MongoDB
connectDB();

// Route: Receive emotion data from student
app.post("/send_emotion", async (req, res) => {
    const { studentName, emotion } = req.body;
  
    if (!studentName || !emotion) {
      return res.status(400).json({ message: "Invalid data" });
    }
  
    let student = await Student.findOne({ name: studentName });
  
    if (!student) {
      // Insert student if not found
      student = new Student({ name: studentName });
      await student.save();
    }
  
    // Save emotion
    const newEmotion = new Emotion({
      studentId: student._id,
      emotion: emotion,
    });
  
    await newEmotion.save();
  
    res.status(200).json({ message: "Emotion saved" });
  });
  
  // Route: Get all emotions (for teacher's view)
  app.get("/get_emotions", async (req, res) => {
    const allEmotions = await Emotion.find().populate("studentId");
    res.status(200).json(allEmotions);
  });
  
  // Helper function to find the most frequent emotion in an array
  function mostFrequentEmotion(arr) {
    const frequency = {};
    let maxCount = 0;
    let frequentEmotion = null;
  
    arr.forEach((emotion) => {
      frequency[emotion] = (frequency[emotion] || 0) + 1;
      if (frequency[emotion] > maxCount) {
        maxCount = frequency[emotion];
        frequentEmotion = emotion;
      }
    });
  
    return frequentEmotion;
  }
  */

/*
// Session tracking
let teacherMonitoring = false;
let sessionId = null;

// Route: Start session (teacher starts monitoring)
app.post("/start_monitoring", async (req, res) => {
  if (teacherMonitoring) {
    return res.status(400).json({ message: "Session already started" });
  }

  teacherMonitoring = true;
  sessionId = mongoose.Types.ObjectId();

  const session = new Session({
    _id: sessionId,
    startTime: new Date(),
  });

  await session.save();

  res.status(200).json({ message: "Teacher started monitoring", session_id: sessionId });
});

// Route: Stop session (teacher stops monitoring and calculate average emotions)
app.post("/stop_monitoring", async (req, res) => {
  if (!teacherMonitoring) {
    return res.status(400).json({ message: "Session not started" });
  }

  teacherMonitoring = false;

  const endTime = new Date().toISOString();

  // Calculate the average emotion of each student
  const studentAvgEmotions = {};
  const allEmotions = await Emotion.find().populate("studentId");

  allEmotions.forEach((row) => {
    const studentName = row.studentId.name;
    const emotion = row.emotion;

    if (!studentAvgEmotions[studentName]) {
      studentAvgEmotions[studentName] = [];
    }
    studentAvgEmotions[studentName].push(emotion);
  });

  // Calculate the most frequent emotion for each student
  for (const student in studentAvgEmotions) {
    studentAvgEmotions[student] = mostFrequentEmotion(studentAvgEmotions[student]);
  }

  // Calculate overall session rating
  const sessionRating = calculateSessionRating(studentAvgEmotions);

  // Update the session with end time and rating
  const session = await Session.findById(sessionId);
  session.endTime = new Date();
  session.sessionRating = sessionRating;
  await session.save();

  res.status(200).json({
    message: "Teacher stopped monitoring",
    avg_emotions: studentAvgEmotions,
    session_rating: sessionRating,
  });
});

// Helper function to calculate overall session rating
function calculateSessionRating(studentAvgEmotions) {
  const emotionCounts = {
    Happy: 0,
    Neutral: 0,
    Confused: 0,
    Bored: 0,
    Surprise: 0,
  };

  Object.values(studentAvgEmotions).forEach((emotion) => {
    emotionCounts[emotion]++;
  });

  return Object.keys(emotionCounts).reduce((a, b) => emotionCounts[a] > emotionCounts[b] ? a : b);
}

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/
