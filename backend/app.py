from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/", methods=['GET', 'POST'])
def home():
    data = [
        {
            "comment": "Nice book",
            "rating": 5
        },
        {
            "comment": "Cool book",
            "rating": 4
        }
    ]
    return jsonify({"data": data})
