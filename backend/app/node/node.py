from threading import Thread
from peer_lib import Peer, getTimeStamp, getDateStamp
from socketIO_client import SocketIO as socks_c, LoggingNamespace
from time import sleep
import os
from flask import Flask, jsonify, request, blueprints
from flask_socketio import SocketIO, send, emit
from flask import Flask, request, jsonify
from blueprints import wallet
from flask_cors import CORS, cross_origin
# from werkzeug.debug import DebuggedApplication
import asyncio
from blueprints.db import Transaction
app = Flask(__name__)
app.config['SECRET_KEY'] = 'admin'
# app.debug = True
# app.wsgi_app = DebuggedApplication(app.wsgi_app, evalex=True)
app.register_blueprint(wallet.wallet)
cors = CORS(app)
socketio = SocketIO(app)


peer = Peer()


def startServer(ip, port, branch):
    sleep(1)
    print(f"{getTimeStamp()} >> Starting Server...")
    sleep(2)
    print(f"{getTimeStamp()} >> Server started in {branch}")
    sleep(1)
    print(f"{getTimeStamp()} >> Waiting for Connection ...")
    peer.connectToInitialPeers(ip, port, branch)


# @app.route('/testing', methods=['POST', 'GET'])
# def testing():
#     return jsonify({'message': 'IT WORKS!'})


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
        transaction = Transaction()
        date = str(getDateStamp())
        if len(peer.getServers()) > 0:
            # msg = input('Message: ')
            msg = transaction.getValidatedTransaction(date)
            for server in peer.getServers():
                sleep(2)
                server.send(msg)


# async def messages():
#     await asyncio.gather(handleMessage())

if __name__ == "__main__":

    branch = input('Cooperative Branch: ')
    port = int(input("PORT:"))
    ip = "127.0.0.1"
    startServer(ip, port, branch)
    # asyncio.run(messages())
    Thread(target=handleMessage).start()
    # socketio.start_background_task(target=handleMessage)
    socketio.run(app, host=ip, port=port)
