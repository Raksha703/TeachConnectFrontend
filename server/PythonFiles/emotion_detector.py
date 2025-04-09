from keras.models import load_model
from tensorflow.keras.utils import img_to_array
from flask import Flask, jsonify, render_template, Response, request
import cv2
import numpy as np
from flask_cors import CORS
import sys
from pymongo import MongoClient
from sklearn.metrics import confusion_matrix, classification_report
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from werkzeug.security import generate_password_hash, check_password_hash

y_true=[]
y_pred=[]

sys.stdout.reconfigure(encoding='utf-8')

'''
client = MongoClient("mongodb://localhost:27017/")
db = client["mood_matrix"]
teachers_collection = db["teachers"]
'''
load_dotenv()

db_url = os.getenv("DB")
client = MongoClient(db_url)
db = client.get_default_database()
teachers_collection = db["teachers"]
students_collection = db["students"]

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")  

cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print("❌ Error: Unable to access the webcam.")
    sys.exit(1)
    
face_classifier = cv2.CascadeClassifier(r'C:\Users\703ra\Documents\Projects\mood-matrix-mern\server\PythonFiles\haarcascade_frontalface_default.xml')

try:
    classifier = load_model(r'C:\Users\703ra\Documents\Projects\mood-matrix-mern\server\PythonFiles\Emotion_Detection.h5')
    print("✅ Model loaded successfully!")
except Exception as e:
    print("❌ Error loading model:", str(e))
    sys.exit(1)

class_emotion = ['Bored', 'Happy', 'Neutral', 'Confused', 'Surprise']
students_emotions = {}

def detect_emotion_once():
    success, frame = cap.read()
    if not success:
        return "Error: Unable to access the webcam", None

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_classifier.detectMultiScale(gray, 1.1, 7)

    for (x, y, w, h) in faces:
        roi_gray = gray[y:y + h, x:x + w]
        roi_gray = cv2.resize(roi_gray, (48, 48), interpolation=cv2.INTER_AREA)

        if np.sum([roi_gray]) != 0:
            roi = roi_gray.astype('float') / 255.0
            roi = img_to_array(roi)
            roi = np.expand_dims(roi, axis=0)

            preds = classifier.predict(roi)[0]
            emotion = class_emotion[preds.argmax()]

            print("\nprediction = ",preds)
            print("\nprediction max = ",preds.argmax())
            print("\nemotion = ",emotion)

            return emotion, frame

    return "No Face Found", frame

def generate_frames():

    while True:
        success, frame = cap.read()
        if not success:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_classifier.detectMultiScale(gray, 1.1, 7)

        for (x, y, w, h) in faces:
            roi_gray = gray[y:y + h, x:x + w]
            roi_gray = cv2.resize(roi_gray, (48, 48), interpolation=cv2.INTER_AREA)

            if np.sum([roi_gray]) != 0:
                roi = roi_gray.astype('float') / 255.0
                roi = img_to_array(roi)
                roi = np.expand_dims(roi, axis=0)

                preds = classifier.predict(roi)[0]
                emotion = class_emotion[preds.argmax()]
                print("Detected Emotion:", emotion)

                print("\nprediction = ",preds)
                print("\nprediction max = ",preds.argmax())
                print("\nemotion = ",emotion)

                cv2.putText(frame, emotion, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 255, 0), 3)
            else:
                cv2.putText(frame, "No Face Found", (20, 60), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 255, 0), 3)

        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/api/')
def index():
    return render_template('emotion.html')

@app.route('/api/video')
def video():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    user_type = data.get("type")  # "teacher" or "student"

    if not all([name, email, password, user_type]):
        return jsonify({"message": "All fields are required"}), 400

    hashed_password = generate_password_hash(password)

    if user_type == "teacher":
        existing_teacher = teachers_collection.find_one({"email": email})
        if existing_teacher:
            return jsonify({"message": "Teacher already exists"}), 400

        teacher_data = {
            "teacherName": name,
            "email": email,
            "password": hashed_password,
            "lectures": [],
            "teacherRating": 0
        }
        teachers_collection.insert_one(teacher_data)
        return jsonify({"message": "Teacher registered successfully"}), 201

    elif user_type == "student":
        existing_student = students_collection.find_one({"email": email})
        if existing_student:
            return jsonify({"message": "Student already exists"}), 400

        student_data = {
            "studentName": name,
            "email": email,
            "password": hashed_password,
        }
        students_collection.insert_one(student_data)
        return jsonify({"message": "Student registered successfully"}), 201

    else:
        return jsonify({"message": "Invalid user type"}), 400
    
@app.route("/api/login", methods=["POST"])
def teacherLogin():
    data = request.get_json()
    email = data['email']
    password = data['password']

    print(data)

    user = db.teachers.find_one({'email': email})
    
    if user and check_password_hash(user['password'], password):
        return jsonify(success=True)
    
    return jsonify(success=False)

@app.route('/api/detect')
def detect():
    emotion, _ = detect_emotion_once()
    return jsonify({'emotion': emotion})

def calculate_lecture_rating(emotions):
    total_count = sum(emotions.values())

    if total_count == 0:
        return 0

    happy = emotions.get("Happy", 0)
    neutral = emotions.get("Neutral", 0)
    bored = emotions.get("Bored", 0)
    confused = emotions.get("Confused", 0)
    surprise = emotions.get("Surprise", 0)

    # Weighted rating calculation
    rating = 5 * ((1.0 * happy + 0.8 * surprise) - (1.2 * bored + 1.0 * confused)) / total_count
    return round(max(1, min(5, rating)), 2)  # Ensure rating is between 1-5

@app.route('/api/send_emotion', methods=['POST'])
def send_emotion():
    data = request.json
    teacherName = data.get("teacherName")
    lectureId = data.get("lectureId")
    emotion = data.get('emotion')

    if emotion == "No Face Found" or emotion=="Error: Unable to access the webcam":
        return jsonify({'message': 'No valid emotion detected'}), 400

    teacher = teachers_collection.find_one({"teacherName": teacherName})

    if not teacher:
        
        new_teacher = {
            "teacherName": teacherName,
            "lectures": [{
                "lectureId": lectureId,
                "emotions": {emotion: 1},
                "rating": calculate_lecture_rating({emotion: 1})
            }],
            "teacherRating": calculate_lecture_rating({emotion: 1})
        }
        teachers_collection.insert_one(new_teacher)
        return jsonify({
            'message': 'New teacher created and emotion recorded',
            'teacherRating': new_teacher["teacherRating"],
            'lectures': new_teacher["lectures"]
        }), 201

    lectures = teacher.get("lectures", [])
    total_ratings = []

    lecture_found = False

    for lecture in lectures:
        if lecture["lectureId"] == lectureId:
            # Update existing lecture emotions
            lecture["emotions"][emotion] = lecture["emotions"].get(emotion, 0) + 1
            lecture["rating"] = calculate_lecture_rating(lecture["emotions"])
            lecture_found = True
        total_ratings.append(lecture["rating"])

    # If lecture was not found, add a new lecture entry
    if not lecture_found:
        new_lecture = {
            "lectureId": lectureId,
            "emotions": {emotion: 1},
            "rating": calculate_lecture_rating({emotion: 1})
        }
        lectures.append(new_lecture)
        total_ratings.append(new_lecture["rating"])

    # Calculate teacher rating as the average of all lecture ratings
    teacher_rating = round(sum(total_ratings) / len(total_ratings), 2) if total_ratings else 3

    # Update MongoDB
    teachers_collection.update_one(
        {"teacherName": teacherName},
        {"$set": {"lectures": lectures, "teacherRating": teacher_rating}}
    )

    return jsonify({
        'message': 'Emotions updated successfully',
        'teacherRating': teacher_rating,
        'lectures': lectures
    }), 200
        
@app.route('/api/get_emotions', methods=['POST'])
def get_emotions():
    data = request.json
    teacherName = data.get("teacherName")
    lectureId = data.get("lectureId")

    teacher = teachers_collection.find_one(
        {"teacherName": teacherName, "lectures.lectureId": lectureId},
        {"lectures.$": 1}  # Projection to get only the matching lecture
    )

    if teacher and "lectures" in teacher:
        lecture = teacher["lectures"][0]
        return jsonify(lecture)

    return jsonify({'message': 'Lecture not found'}), 404

@app.route('/api/allTeachers', methods=['GET'])
def all_teachers():
    teachers = list(teachers_collection.find({}, {"_id": 0}))  # Exclude MongoDB ObjectId
    return jsonify(teachers)

@app.route("/api/lectureRating", methods=['POST'])
def lectureRating():
    data = request.json
    teacherName = data.get("teacherName")

    if not teacherName:
        return jsonify({'message': 'Teacher name is required'}), 400

    teacher = teachers_collection.find_one({"teacherName": teacherName})

    if teacher:
        lectures = teacher.get("lectures", [])
        return jsonify(lectures)

    return jsonify({'message': 'Lecture not found'}), 404

if __name__ == "__main__":
    app.run(debug=True)