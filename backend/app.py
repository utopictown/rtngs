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
        data = Reviews.query.all()
        return jsonify({'data': data})

    if request.method == 'POST':
        rating = request.json['rating']
        description = request.json['description']

        review = Reviews(description=description, rating=rating)
        db.session.add(review)
        db.session.commit()

        return jsonify({'data': 'Submission created'})
    else:
        return "Invalid HTTP method."


db.app = app
db.init_app(app)
db.create_all()
