from bottle import static_file, route, run, request, response
from nltk import sent_tokenize
import json
import sys
import hashlib
import cred
audio_data = dict()

from watson_developer_cloud import TextToSpeechV1

text_to_speech = TextToSpeechV1(
    username=cred.get_username(),
    password=cred.get_password()) 

@route('/static/')
def index_html():
    return static_file('index.html', root='./static')

@route('/static/<path:path>')
def static(path):
    return static_file(path, root='./static')

@route('/api/sentence_boundary_detection', method='POST')
def sentence_boundary_detector():
    paragraph = request.json['paragraph']
    return dict(arr=sent_tokenize(paragraph))

@route('/api/read', method='POST')
def read():
    t = request.json['text']
    h = hashlib.new('sha256')
    h.update(bytes(str(t), 'utf-8'))
    file_name = h.hexdigest()
    audio_data[file_name] = text_to_speech.synthesize(t, accept='audio/wav', voice="en-US_AllisonVoice")
    return dict(audio_name=file_name)

@route('/api/audio/<audio_hash>')
def get_audio(audio_hash):
    response.content_type = 'audio/wav'
    return audio_data[audio_hash]

run(host='0.0.0.0', port=8000, debug=True, reloader=True)
