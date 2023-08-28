import bson
import json
from flask import current_app, g, jsonify
from werkzeug.local import LocalProxy
from flask_pymongo import PyMongo
from pymongo.errors import DuplicateKeyError, OperationFailure
from bson.objectid import ObjectId
from bson.errors import InvalidId
from model.model import runModel

from bson import json_util

def serialize_mongo_cursor(cursor):
    questions = [doc for doc in cursor]
    serialized_questions = json.loads(json_util.dumps(questions))
    return {"questions": serialized_questions}


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return super().default(o)

    

def get_db():
    """
    Configuration method to return db instance
    """
    db = getattr(g, "_database", None)
    if db is None:
        db = g._database = PyMongo(current_app).db
    return db

db = LocalProxy(get_db)

def insertQuestion(question, teacherAnswer):
    db.questions.insert_one(
        {
            "question": question, 
            'teacher_answer': teacherAnswer, 
            'student_answer': "", 
            "similarity": None
        }
    )

def getQuestion():
    questionsList = db.questions.find({})
    json_object = serialize_mongo_cursor(questionsList)
    return json.dumps(json_object, indent = 2)


    # return jsonify({
    #     'questions' : [
    #     jsonify(question) for question in questionsList
    # ]
    # })


def updateQuestion( id , teacherAnswer, studentAnswer):
    similarity = runModel(teacherAnswer, studentAnswer)
    
    result = db.questions.update_one({
        '_id':ObjectId(id),
    }, {
        '$set': {
            'student_answer': studentAnswer, 
            'similarity': similarity
        }
    })
    return similarity

def retAggregate():
    questionsList = db.questions.find({})
    json_object = serialize_mongo_cursor(questionsList)
    sum = 0
    questions = json_object['questions']
    for iter in questions:
        sum += iter['similarity']
    aggregate = sum/len(questions)
    return aggregate