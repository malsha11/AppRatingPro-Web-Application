# Machine Learning-Driven Forecasting of Mobile App Ratings pre-launch

## Overview

This repository contains code and resources for a research project aimed at predicting the success of a mobile app before its launch. The project leverages machine learning techniques, including convolutional neural networks (CNNs) and random forests (RF), to analyze app UIs and characteristics to predict app ratings.

## Table of Contents

1. [Problem Statement](#problem-statement)
2. [Proposed Solution](#proposed-solution)
3. [Technologies Used](#technologies-used)
4. [Data Collection and Preprocessing](#data-collection-and-preprocessing)
5. [Model Development and Evaluation](#model-development-and-evaluation)
6. [Web Application](#web-application)
7. [Usage](#usage)
8. [Contributing](#contributing)
9. [License](#license)

## Problem Statement

The life cycle of a mobile app is complex, with app popularity fluctuating before and after release. The challenge lies in predicting app success accurately prior to launch, as 80% of apps get abandoned after initial use. This research aims to address this challenge by predicting app ratings based on UIs and app characteristics.

## Proposed Solution

The proposed solution integrates UIs and app characteristics using machine learning algorithms such as CNNs and RF. It follows a structured process including data collection, preprocessing, model selection, training, and evaluation. A web application is also implemented to provide an interactive interface for accessing prediction models.

## Technologies Used

- Python
- TensorFlow
- Keras
- Scikit-learn
- GooglePlayScraper
- Flask
- React
- JavaScript
- CSS
- Anaconda

## Data Collection and Preprocessing

Data is collected using the Google Play Scraper API, including UI screenshots and app attributes. The collected data undergoes preprocessing steps such as resizing images, feature selection, and text preprocessing.

## Model Development and Evaluation

CNNs and RF are used to build regression models for predicting app ratings. Model performance is evaluated using metrics such as mean squared error and mean absolute error.

## Web Application

A web application is developed using React, Flask, JavaScript, and CSS to provide an interactive user interface for accessing prediction models.

## Usage

To use the project:
1. Clone the repository.
2. Install the necessary dependencies.
3. Run the web application using `flask run`.


