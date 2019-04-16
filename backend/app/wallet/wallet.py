from flask import Flask, render_template, request, redirect, url_for, jsonify
import flask_bootstrap
from flask_socketio import SocketIO, send, emit
from time import sleep
from socketIO_client import SocketIO as socks_c, LoggingNamespace
from flask_cors import CORS, cross_origin
import requests
from pycoin.ecdsa import generator_secp256k1, sign, verify
from ecdsa import SigningKey, SECP256k1
import sha3
import qrcode
import sys
from data.db import User
import json
import ast
import binascii

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)
socketio = SocketIO(app)


def checksum_encode(addr_str):
    keccak = sha3.keccak_256()
    out = ''
    addr = addr_str.lower().replace('0x', '')
    keccak.update(addr.encode('ascii'))
    hash_addr = keccak.hexdigest()
    for i, c in enumerate(addr):
        if int(hash_addr[i], 16) >= 8:
            out += c.upper()
        else:
            out += c
    return '0x' + out


@app.route('/login', methods=['POST', 'GET'])
@cross_origin()
def login():

    data = request.data
    parsed = json.loads(data.decode())
    parsedBody = parsed['body']

    try:
        user = User()

        return user.checkUser(parsedBody['userName'], parsedBody['passWord'])

    except:
        return('failed')


@app.route('/checkname', methods=['POST', 'GET'])
@cross_origin()
def checkname():

    data = request.data
    parsed = json.loads(data.decode())
    parsedBody = parsed['body']
    parsedFullname = parsedBody['fullName']

    try:
        user = User()
        print(sign)
        return user.checkName(parsedFullname)

    except ValueError:
        return jsonify({'status': 'failed'})


@app.route('/register', methods=['POST', 'GET'])
@cross_origin()
def register():

    wallet = generateWallet()
    walletaddr = eval(wallet.data)
    privateKey = walletaddr['privateKey']
    publicKey = walletaddr['publicKey']
    walletAddress = walletaddr['walletAddress']

    data = request.data
    parsed = json.loads(data.decode())
    parsedBody = parsed['body']
    parsedFullname = parsedBody['fullName']
    parsedCoopname = parsedBody['coopName']
    parsedCurraddress = parsedBody['currAddress']
    parsedContactnum = parsedBody['contactNum']
    parsedUsername = parsedBody['userName']
    parsedPassword = parsedBody['passWord']
    parsedRpassword = parsedBody['rpassWord']

    try:
        user = User()
        return user.addUser(walletAddress, publicKey, privateKey, parsedFullname, parsedCoopname, parsedCurraddress, parsedContactnum, parsedUsername, parsedPassword, parsedRpassword)
    except ValueError:
        return jsonify({'status': 'failed'})


@app.route('/forgotPass', methods=['POST', 'GET'])
@cross_origin()
def changePass():

    data = request.data
    parsed = json.loads(data.decode())
    parsedBody = parsed['body']

    try:
        user = User()
        return user.changePassword(parsedBody['userName'], parsedBody['passWord'])
    except ValueError:
        return jsonify({'status': 'failed'})


@app.route('/generateWallet', methods=['POST', 'GET'])
@cross_origin()
def generateWallet():

    keccak = sha3.keccak_256()
    priv = SigningKey.generate(curve=SECP256k1)
    pub = priv.get_verifying_key().to_string()

    keccak.update(pub)

    address = keccak.hexdigest()[24:]

    def test(addrstr):
        assert(addrstr == checksum_encode(addrstr))

    privateKey = priv.to_string().hex()

    signingKey = priv.to_string()
    sign = binascii.unhexlify(privateKey)
    publicKey = pub.hex()
    walletAddress = checksum_encode(address)

    # sign = signingKey.encode('ASCII')
    print(sign)
    print(signingKey)
    print(privateKey)

    walletCredentials = {'privateKey': privateKey,
                         #  'signingKey': sign,
                         'publicKey': publicKey,
                         'walletAddress': walletAddress}

    return json.dumps(walletCredentials)


# @app.route('/checkBalance', methods=['POST', 'GET'])
# def checkBalance():
#     return "wow"


# @app.route('/sendTransaction', methods=['POST', 'GET'])
# @cross_origin()
# def sendTransaction():

#     try:
#         requests.get("127.0.0.1/3001")

#     except:
#         print("error")


if __name__ == '__main__':
    app.run(debug=True)
