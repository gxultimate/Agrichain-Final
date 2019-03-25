# # from flask import Flask, render_template
# # from flask_socketio import SocketIO , send , emit

# # app = Flask(__name__)
# # app.config['SECRET_KEY'] = 'secret!'
# # socketio = SocketIO(app)

# # SocketIO.test_client.

# # @socketio.on('msg')
# # def send_msg(msg):
# #     send(msg)















# # if __name__ == '__main__':
# #     socketio.run(app , port=4000)



# from socketIO_client import SocketIO, LoggingNamespace

# def on_connect():
#     print('connect')

# def on_disconnect():
#     print('disconnect')

# def on_reconnect():
#     print('reconnect')

# def on_aaa_response(*args):
#     print('on_aaa_response', args)

# socketIO = SocketIO('localhost', 8000, LoggingNamespace)
# socketIO.on('connect', on_connect)
# socketIO.on('disconnect', on_disconnect)
# socketIO.on('reconnect', on_reconnect)

# # Listen
# socketIO.on('aaa_response', on_aaa_response)
# socketIO.emit('aaa')
# socketIO.emit('aaa')
# socketIO.wait(seconds=1)

from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from socketIO_client import SocketIO as socks 

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@socketio.on('aaa')
def test_connect():
    print("Welcome, aaa received")
    emit('aaa_response', {'data': 'Server'})

if __name__ == '__main__':
    socketio.run(app, port=8000)
