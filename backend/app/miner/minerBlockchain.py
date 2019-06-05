from threading import Thread
from peer_lib import  getTimeStamp, getDateStamp
from miner_lib import Miner

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



class Mining:

    def __init__(self):
    
        index = ""
        currentHash = ""
       
        nonce = 0 



    def hexify (self , value , type):
        return binascii.hexlify(struct.Struct(type).pack(value))



    def get_block_header(self , merkleRootTransaction, previousHash , index):
     
        prev = str(previousHash).encode("utf8")
        merk = str(merkleRootTransaction).encode("utf8")
        print("index",index)
        # print(type(prev))
        # print(type(merk))
        # previousHashed = binascii.hexlify(merk[::-1]),
        # print(previousHashed)
        headerhex = f"{merkleRootTransaction}".format(
            previousHash = binascii.hexlify(prev[::-1]),
            hashMerkelRoot = binascii.hexlify(merk[::-1]),
            index = index 
        
        )
        headerBin = headerhex
        _currentHash = sha256(str(headerBin).encode('utf8')).hexdigest()
        mined = self.mine(index, _currentHash)
        print("mine",mined )
        return jsonify({"status": True})



    def mine(self , _index ,  _currentHash):
        nonce = 0 
        newHash = ""
        nextIndex = int(_index)+ 1 
        difficulty = "0"
        while newHash[0:1] != difficulty:
            print(self.calc_next_hash(nextIndex , _currentHash , nonce))
            nonce += 1
            newHash = self.calc_next_hash(nextIndex  , _currentHash , nonce)  
        
        return {"newHash":newHash , "nextIndex": nextIndex}



    def calc_next_hash(self , nextIndex, currentHash , nonce):
        date = datetime.datetime.now()
        timeStamp = date.strftime("%c")
        data =  str(nextIndex) + currentHash + str(nonce) + str(timeStamp)
        return sha256(data.encode('utf8')).hexdigest()


            