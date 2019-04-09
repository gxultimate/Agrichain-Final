from threading import Thread
from peer_lib import Peer, getTimeStamp
from socketIO_client import SocketIO as socks_c, LoggingNamespace
from time import sleep
from flask_socketio import SocketIO, send, emit
from flask import Flask, request, jsonify


app = Flask(__name__)
app.config['SECRET_KEY'] = 'admin'
socketio = SocketIO(app)

peer = Peer()


def startServer(ip, port, branch):
    sleep(1)
    print(f"{getTimeStamp()} >> Starting Server...")
    sleep(2)
    print(f"{getTimeStamp()} >> Server started in {branch}")
    peer.connectToInitialPeers(ip, port, branch)
    sleep(1)
    print(f"{getTimeStamp()} >> Waiting for Connection ...")

@app.route('/testing', methods=['POST', 'GET'])
def testing():
    return jsonify({ 'message' : 'IT WORKS!'})


@socketio.on('connect')
def connect():
    print(f'{getTimeStamp()} >> A Node has connected')


@socketio.on('disconnect')
def disconnect():
    print(f'{getTimeStamp()}>> A Node has been disconnected')


@socketio.on('message')
def sendMessage(msg):

    if '%NODE%' in msg:
        data = msg.replace('%NODE%,', '').split(',')
        peer.reciprocateConnection(data[0], int(data[1]), data[2])
    else:

        print(f'\n {getTimeStamp()}>> {msg}')


def handleMessage():
    while True:
        if len(peer.getServers()) > 0:
            msg = input('Message: ')
            for server in peer.getServers():
                server.send(msg)


if __name__ == "__main__":

    branch = input('Cooperative Branch: ')
    port = int(input("PORT:"))
    ip = "127.0.0.1"
    startServer(ip, port, branch)
    Thread(target=handleMessage).start()

    socketio.run(app, host=ip, port=port)
