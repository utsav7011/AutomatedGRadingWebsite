from flask_cors import CORS
from flask import Flask, jsonify, request, make_response
from transformers import AutoTokenizer, AutoModel
import torch
from sklearn.metrics.pairwise import cosine_similarity
import os
import configparser
from db.db import insertQuestion, getQuestion, updateQuestion, retAggregate


config = configparser.ConfigParser()
config.read(os.path.abspath(os.path.join(".ini")))


app = Flask(__name__)
CORS(app)
app.config['MONGO_URI'] = 'mongodb+srv://utsav7011:utsav7011@cluster0.i096mza.mongodb.net/quizApp?retryWrites=true&w=majority'

@app.route("/")
def fallback():
    return jsonify({"success" : True})


# @app.route("/check-similarity", methods = ['POST'])
# def checkSimilarity():    
#     if request.method == 'POST':
#         data = request.json
#         str1 = data.get('teacher-answer')
#         str2 = data.get('student-answer')
        
#         return jsonify({'similarity': percent})
        
#     return jsonify({'error': 'Not a valid request'})

@app.route('/insert-question' , methods = ["POST"])
def insertQ():
    if request.method == 'POST':
        data = request.json
        question = data.get('question')
        teacherAnswer = data.get('teacher-answer')
        insertQuestion(question, teacherAnswer)
        return jsonify({'success': True})   

@app.route('/get-questions', methods = ['GET'])
def getQ():
    # Create a response object with headers
    response = make_response(getQuestion())
    
    # Set the Content-Type header to specify JSON format
    response.headers['Content-Type'] = 'application/json'

    return response

@app.route('/update-question', methods = ['POST'])
def updateQ():
    if request.method == 'POST':
        data = request.json
        question = data.get('id')
        teacherAnswer = data.get('teacherAnswer')
        studentAnswer = data.get('studentAnswer')
        simmilarity = updateQuestion(question, teacherAnswer, studentAnswer)
        return jsonify({'success': True, 'similarity': simmilarity }) 
    
@app.route('/aggregate', methods = ['GET'])
def returnAggregate():
    return jsonify({'status': True, 'aggregate':  retAggregate()}) 
