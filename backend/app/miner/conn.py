from threading import Thread
from peer_lib import Peer, getTimeStamp, getDateStamp
from miner_lib import Miner
from socketIO_client import SocketIO as socks_c, LoggingNamespace
from time import sleep
import os
from io import StringIO
from flask import Flask, jsonify, request, blueprints, session
from flask_socketio import SocketIO, send, emit
from flask import Flask, request, jsonify
from blueprints import wallet
from flask_cors import CORS, cross_origin
from werkzeug.debug import DebuggedApplication
import asyncio
from blueprints.db import Transaction

from werkzeug.utils import secure_filename
import tempfile
from redis import Redis
from rq import Queue



UPLOAD_FOLDER = './data'
app = Flask(__name__)
app.config['SECRET_KEY'] = 'admin'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


# app.debug = True
# app.wsgi_app = DebuggedApplication(app.wsgi_app, evalex=True)

app.register_blueprint(wallet.wallet)
cors = CORS(app)
socketio = SocketIO(app)


peer = Peer()
miner = Miner()
transaction = Transaction()



def startServer(ip, port, branch):
    sleep(1)
    print(f"{getTimeStamp()} >> Starting Server...")
    print(f"{getTimeStamp()} >> Server started in {branch}")
    sleep(2)
    print(f"{getTimeStamp()} >> Waiting for Connection ...")
    peer.connectToInitialPeers(ip, port, branch)
    miner.connectToInitialMiner(ip, port , branch)
    transaction.currentPort(port, ip)


@socketio.on('connect')
def connect():
    print(f'{getTimeStamp()} >> A Node has connected')


@socketio.on('disconnect')
def disconnect():
    print(f'{getTimeStamp()}>> A Node has been disconnected')


@socketio.on("error")
def on_my_event(data):
    raise RuntimeError()


@socketio.on('message')
def sendMessage(msg):


    if '%NODE%' in msg: 
        sleep(2)
        data = msg.replace('%NODE%,', '').split(',')
        peer.reciprocateConnection(data[0], int(data[1]), data[2])
    else:
        sleep(3)
        print(f'\n {getTimeStamp()} >> {msg}')
        transaction.addNewPendingTransaction(msg['msg'])
        transaction.addNewWalletBalance(msg['wallet'])


def handleMessage():
    while True:

        if len(peer.getServers()) > 0:
            # sleep(1)
            message = transaction.getPendingTransaction()
            wallet = transaction.getWalletBalance()
            msg = {'msg': message, 'wallet': wallet}
            for server in peer.getServers():

                server.send(msg)


@socketio.on('mining')

def sendMiningJob(msg):
    if "%MINER" in msg:
        data = msg.replace("%MINER" , "").split(",")
        miner.reciprocateConnection(data[0], int(data[1] , data[2]))
    else:
        print(msg)
        
        
def handleMining():
    while True:
        if len(miner.getServers()) > 0 :
            msg = transaction.getMiningJob()
            for server in miner.getServers():
                server.send(msg)
            


@app.route("/uploadFiles", methods=['POST', 'GET'])
@cross_origin()
def uploadFiles():

    target = os.path.join(UPLOAD_FOLDER, 'test_docs')
    if not os.path.isdir(target):
        os.mkdir(target)

    file = request.files['file']
    filename = secure_filename(file.filename)
    destination = "/".join([target, filename])
    file.save(destination)
    session['uploadFilepath'] = destination

    # print(filename)

    return jsonify({'name': filename})



if __name__ == "__main__":

    branch = input('Cooperative Branch: ')
    port = int(input("PORT:"))
    ip = "127.0.0.1"
    startServer(ip, port, branch)

    # asyncio.run(messages())
    Thread(target=handleMessage).start()
    
    # socketio.start_background_task(target=handleMessage)
    socketio.run(app, host=ip, port=port, debug=False)
