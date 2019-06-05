from threading import Thread
from peer_lib import  getTimeStamp, getDateStamp
from miner_lib import Miner
from minerBlockchain import Mining
from socketIO_client import SocketIO as socks_c, LoggingNamespace
from time import sleep
import os
from io import StringIO
from flask import Flask, jsonify, request, blueprints, session
from flask_socketio import SocketIO, send, emit
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from werkzeug.debug import DebuggedApplication
import asyncio
from werkzeug.utils import secure_filename
import tempfile
from redis import Redis
from rq import Queue
from hashlib import sha256 
import time
import struct
import binascii
import datetime

import ast


app = Flask(__name__)
app.config['SECRET_KEY'] = 'admin'


cors = CORS(app)
socketio = SocketIO(app)


miner = Miner()
mining = Mining()


def startServer(ip, port, branch):
    sleep(1)
    print(f"{getTimeStamp()} >> Starting Server...")
    print(f"{getTimeStamp()} >> Server started in {branch}")
    sleep(2)
    print(f"{getTimeStamp()} >> Waiting for Connection ...")
    miner.connectToInitialPeers(ip, port , branch)



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

def sendMiningJob(msg):
    if "%NODE%" in msg:
        sleep(15)
    
        data = msg.replace("%NODE%," , "").split(",")
        print("msg")
        print("DATA",data)
        miner.reciprocateNodeConnection(data[0], int(data[1]) , str(data[2]))
       
    else:
        print("MINER!!",msg)
        miningJob = ast.literal_eval(msg)
        index = miningJob['index']
        previousHash= miningJob['previousHash']
        currentTransaction = miningJob['pendingTransaction']
        mining.get_block_header(  currentTransaction , previousHash,index  )
     
        
        
        
def handleMining():
    while True:
        if len(miner.getServers()) > 0 :
            
            msg = "Hello Im a miner!"
            for server in miner.getServers():
                
                server.send(msg)

            



if __name__ == "__main__":

    branch = input('Miner Cooperative Branch: ')
    port = int(input("PORT:"))
    ip = "127.0.0.1"
    startServer(ip, port, branch)

    # asyncio.run(messages())
    Thread(target=handleMining).start()
    
    # socketio.start_background_task(target=handleMessage)
    socketio.run(app, host=ip, port=port, debug=False)

    