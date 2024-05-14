from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
import io
import json
import torch
import joblib
import tensorflow as tf
from tensorflow import keras
import cv2
import os
import io
import sys
import base64
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# Load the CNN model
cnn_model = tf.keras.models.load_model('app_rating_predict_cnn_model.h5')

# Load the Random Forest model
rf_model = joblib.load('app_rating_predict_random_forest_model.h5')


@app.route('/predict', methods=['POST'])
def predict():
    image1 = request.files['image1']
    image2 = request.files['image2']
    image3 = request.files['image3']

    print(image1)

    noInstalls = request.form.get("noInstalls")
    price = request.form.get("price")
    noRatings = request.form.get("noRatings")
    noReviews = request.form.get("noReviews")
    isFree = request.form.get("isFree")
    isAdSupported = request.form.get("isAdSupported")
    containsAds = request.form.get("containsAds")

    ensemble_prediction = 0

    try:

        # ======================= Getting the prediction from the cnn model ====================================
        image1 = Image.open(io.BytesIO(image1.read()))
        image2 = Image.open(io.BytesIO(image2.read()))
        image3 = Image.open(io.BytesIO(image3.read()))

        pixel_array1 = np.array(image1)
        pixel_array2 = np.array(image2)
        pixel_array3 = np.array(image3)

        resized_image1 = cv2.resize(pixel_array1, (50, 50))
        resized_image2 = cv2.resize(pixel_array2, (50, 50))
        resized_image3 = cv2.resize(pixel_array3, (50, 50))

        combined_image = np.concatenate(
            (resized_image1, resized_image2, resized_image3), axis=1)

        new_array = []
        new_array.append(combined_image)
        new_array = np.asarray(new_array)
        prediction_from_cnn_model = cnn_model.predict(new_array)

        # ================================== Getting the prediction from the random forest model =======================

        prediction_from_random_forest_model = rf_model.predict([[
            noInstalls, price, noRatings, noReviews, isFree, isAdSupported, containsAds
        ]])

        ensemble_prediction = 0.5 * \
            prediction_from_cnn_model[0][0] + 0.5 * \
            prediction_from_random_forest_model[0]
    except Exception as e:
        print(e)
        return f'Error opening the image : {str(e)}', 400

    return jsonify({'rating': ensemble_prediction})


if __name__ == '__main__':
    app.run()
