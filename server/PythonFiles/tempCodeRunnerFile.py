from keras.models import load_model
from tensorflow.keras.utils import img_to_array
from flask import Flask, jsonify,render_template,Response, request
import cv2
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 
cap=cv2.VideoCapture(0)

face_classifier = cv2.CascadeClassifier(r'C:\Users\703ra\Documents\Projects\mood-matrix-mern\server\model\haarcascade_frontalface_default.xml')  #'./haarcascade_frontalface_default.xml' 
#series of pretrained classifiers, detect faces
'''XML files are commonly used to store data in a structured, hierarchical format, 
making them ideal for various configurations, models, and serialized data'''

# Load the emotion detection model
try:
    classifier = load_model(r'C:\Users\703ra\Documents\Projects\mood-matrix-mern\server\model\Emotion_Detection.h5') #'./Emotion_Detection.h5' 
except Exception as e:
    print("Error loading model:", e)

#class_labels = ['Angry','Happy','Neutral','Sad','Surprise']
class_emotion = ['Bored', 'Happy', 'Neutral', 'Confused','Surprise']

# Shared storage for student emotions
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
            return emotion, frame

    return "No Face Found", frame

def generate_frames():

    while True:
            
        ## read the camera frame
        success,frame = cap.read()

        if not success:
            break

        else:

            gray = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY) #Converts the frame to grayscale, 2d array [h,w]
            faces = face_classifier.detectMultiScale(gray,1.1,7) #gray, scale factor( image size is reduced by 10% at each step), faces-> list of faces rect

            for (x,y,w,h) in faces: #x,y top left corner
                roi_gray = gray[y:y+h,x:x+w] #region of interest 
                roi_gray = cv2.resize(roi_gray, (48,48) ,interpolation=cv2.INTER_AREA) #smooth when shrinking

                if np.sum([roi_gray])!=0:

                    roi = roi_gray.astype('float')/255.0  #pixel value to 0 to 1 (normalization) #2D (48x48)

                    roi = img_to_array(roi) # 3D (48x48x1) for deep learning model input
             
                    roi = np.expand_dims(roi,axis=0) #batch_size=1, (1, 48, 48, 1)

                    '''classifier.predict(roi): Uses the pre-trained emotion detection model (classifier) to predict the emotion from the face region (roi). 
                    The model returns an array of probabilities corresponding to each emotion.
                    [0]: array of probabilities for each emotion.'''
                    preds = classifier.predict(roi)[0]
                    
                    emotion = class_emotion[preds.argmax()]   #this label will contain emotion of maximum percentage
                    
                    print("label : ",emotion)

                    emotion_position = (x,y)
                    cv2.putText(frame,emotion,emotion_position,cv2.FONT_HERSHEY_SIMPLEX,2,(0,255,0),3)
                else:
                    cv2.putText(frame,'No Face Found',(20,60),cv2.FONT_HERSHEY_SIMPLEX,2,(0,255,0),3)
                print("\n")
            
            ret,buffer = cv2.imencode('.jpg',frame) #NumPy array (representing the image bytes)
            frame = buffer.tobytes()

        yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/detect')
def detect():
    emotion, _ = detect_emotion_once()
    return jsonify({'emotion': emotion})