from math import floor
import os
from urllib import request
from flask import Flask, jsonify, request
from flask_cors import CORS
from models.reviews import Reviews
from db import db
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///rtngs.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

CORS(app, origins=os.getenv('ALLOWED_URL').split(','))

socketio = SocketIO(app, cors_allowed_origins=os.getenv('ALLOWED_URL').split(','))

db.app = app
db.init_app(app)
db.create_all()

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'GET':
        reviews = Reviews.query.all()
        rating_avg = get_average_rating(reviews)

        return jsonify({'data': reviews, 'ratingAvg': rating_avg['raw'], 'ratingAvgFloor': rating_avg['floored']})
    if request.method == 'POST':
        try:
            rating = request.json['rating']
            description = request.json['description']

            review = Reviews(description=description, rating=rating)
            db.session.add(review)
            db.session.commit()

            reviews = Reviews.query.all()
            rating_avg = get_average_rating(reviews)

            return jsonify({'data': review,'ratingAvg': rating_avg['raw'], 'ratingAvgFloor': rating_avg['floored'], 'message': 'Submission created'}) 
        except:
            return jsonify({'message': 'Submission failed'}), 400
    else:
        return "Invalid HTTP method."

def get_average_rating(list = []):
    avg = sum([data.rating for data in list]) / len(list) if len(list) else 0
    return {'floored': floor(avg), 'raw': round(avg, 1)}

@socketio.on('submit_review', namespace='/rtngs')
def listen_post():
    reviews = Reviews.query.all()
    rating_avg = get_average_rating(reviews)
    emit('new_review', {'data': [review.serialized for review in reviews], 'ratingAvg': rating_avg['raw'], 'ratingAvgFloor': rating_avg['floored']}, broadcast=True)

if __name__ == "__main__":
    socketio.run(app)
    app.run(debug=False, host='0.0.0.0')