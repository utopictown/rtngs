from math import floor
from urllib import request
from flask import Flask, jsonify, request
from models.reviews import Reviews
from db import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///rtngs.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True


@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'GET':
        reviews = Reviews.query.all()
        rating_avg = floor(sum([data.rating for data in reviews]) / len(reviews))

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
            return jsonify({'message': 'Submission failed'})
    else:
        return "Invalid HTTP method."


db.app = app
db.init_app(app)
db.create_all()
