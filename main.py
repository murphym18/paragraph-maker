from bottle import static_file, route, run, request, response
from nltk import sent_tokenize
import json
import sys
import hashlib
import speech

default_voice = speech.ibm_voice
voice_functions = {
    'allison': speech.ibm_voice,
    'salli': speech.salli_voice,
    'kimberly': speech.kimberly_voice,
    'kendra': speech.kendra_voice,
    'joanna': speech.aws_voice,
    'emma': speech.emma_voice,
    'amy': speech.amy_voice,
    'nicole': speech.nicole_voice
}
audio_data = dict()


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
    text = request.json['text']
    voice_name = request.json['voice']

    h = hashlib.new('sha256')
    h.update(bytes(str(text), 'utf-8'))
    h.update(bytes(str(voice_name), 'utf-8'))
    file_name = h.hexdigest()
    
    voice = voice_functions[voice_name]
    audio_data[file_name] = voice(text)
    return dict(audio_name=file_name)

@route('/api/audio/<audio_hash>')
def get_audio(audio_hash):
    speech_data = audio_data[audio_hash]
    response.content_type = speech_data.mime
    return speech_data.audio 

run(host='0.0.0.0', port=8000, debug=True, reloader=True)
