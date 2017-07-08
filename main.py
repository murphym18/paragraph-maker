from bottle import static_file, route, run, request
from nltk import sent_tokenize
import json
import sys

# paragraph = sys.stdin.read()
# print(json.dumps(sent_tokenize(paragraph)))
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

run(host='localhost', port=8080, debug=True, reloader=True)
