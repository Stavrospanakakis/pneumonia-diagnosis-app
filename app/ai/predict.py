from tensorflow.keras.models import load_model
import cv2
import numpy as np

#############################################################################
# You can find the algorithm that trains the model in the repository below: #
#                                                                           #
#       https://github.com/Stavrospanakakis/pneumonia-diagnosis             #
#                                                                           #
#############################################################################

def Predict(image_filename):
    
    # Load the model
    model = load_model("models/model.h5")

    # Set the image size
    IMAGE_SIZE = 120

    # compile the model
    model.compile(
        loss='binary_crossentropy',
        optimizer='adam',
        metrics=['accuracy'],
    )

    # Read the image and convert it to grayscale
    image_array = cv2.imread(image_filename, cv2.IMREAD_GRAYSCALE) 
    
    # Resize the image to 120x120
    resized_array = cv2.resize(image_array, (IMAGE_SIZE, IMAGE_SIZE)) 
    
    # Reshape the image as (-1, 120, 120, 1)
    reshaped_array = np.array(resized_array).reshape(-1, IMAGE_SIZE, IMAGE_SIZE, 1)

    # Normalize the image
    normalized_image = reshaped_array/255.0

    # Predict the image
    prediction = np.around(model.predict(normalized_image)[0][0], decimals=2)

    # Return the prediction
    return prediction
