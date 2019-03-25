from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from socketIO_client import SocketIO as socks ,LoggingNamespace

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@app.route("/")
def index():
    return "hello World"


@socketio.on('aaa')
def test_connect():
    print("Welcome, aaa received")
    emit('aaa_response', {'data': 'Server'})

def on_connect():
    print('connect')

def on_disconnect():
    print('disconnect')

def on_reconnect():
    print('reconnect')

def on_aaa_response(*args):
    print('on_aaa_response', args)


socks = socks('localhost', 8000, LoggingNamespace)
socks.on('connect', on_connect)
socks.on('disconnect', on_disconnect)
socks.on('reconnect', on_reconnect)

socks.on('aaa_response', on_aaa_response)
socks.emit('aaa')
socks.emit('aaa')
socks.wait(seconds=1)

if __name__ == '__main__':
    socketio.run(app, port=8001)
