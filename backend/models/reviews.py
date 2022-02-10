from dataclasses import dataclass
from db import db


@dataclass
class Reviews(db.Model):
    id: int
    description: str
    rating: int

    id = db.Column('id', db.Integer, primary_key=True)
    description = db.Column(db.String(240))
    rating = db.Column(db.Integer())


def __init__(self, description, rating):
    self.description = description
    self.rating = rating
