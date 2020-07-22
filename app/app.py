import os
import json
import urllib.request
from ai.predict import Predict
from flask import Flask, flash, request
from werkzeug.utils import secure_filename

# App configuration
app = Flask(__name__, static_folder='static')

APP_ROOT = os.path.dirname(os.path.abspath(__file__))

# Upload folder configuration
UPLOAD_FOLDER = os.path.join(APP_ROOT, 'static')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Check if the image extensions is allowed
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

def is_file_allowed(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/predict', methods=['POST'])
def upload_image():

  # Remove all images 
  for img in os.listdir(UPLOAD_FOLDER):
    os.remove(os.path.join(UPLOAD_FOLDER,img))

  # Request the image
  file = request.files['file']

  # if image has an allowed extension
  if file and is_file_allowed(file.filename):

    # Save the image
    filename = secure_filename(file.filename)    
    file.save(os.path.join(UPLOAD_FOLDER, filename))
    
    # Predict the image
    prediction = Predict(os.path.join(UPLOAD_FOLDER, filename))
    
    # Remove the image
    os.remove(os.path.join(UPLOAD_FOLDER, filename))

    # Sends the prediction as a response
    if (prediction <= 0.5):
        prediction_value = json.dumps({'pred': "Negative"})
    else:
        prediction_value = json.dumps({'pred': "Positive"})

    return prediction_value
  
  # If not has an allowed extension send error 
  else:
    return 'Image file Unsupported'

