from math import floor
import os
from urllib import request
from flask import Flask, jsonify, request
from flask_cors import CORS
from models.reviews import Reviews
from db import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///rtngs.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

CORS(app, origins=os.getenv('ALLOWED_URL').split(','))

db.app = app
db.init_app(app)
db.create_all()

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'GET':
        reviews = Reviews.query.all()
        rating_avg = floor(sum([data.rating for data in reviews]) / len(reviews)) if len(reviews) else 0

        return jsonify({'data': reviews, 'ratingAvg': rating_avg})
    if request.method == 'POST':
        try:
            rating = request.json['rating']
            description = request.json['description']

            review = Reviews(description=description, rating=rating)
            db.session.add(review)
            db.session.commit()

            return jsonify({'message': 'Submission created'}) 
        except:
            return jsonify({'message': 'Submission failed'}), 400
    else:
        return "Invalid HTTP method."