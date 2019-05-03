from flask import Flask, render_template, request, redirect, url_for, jsonify, session
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
from werkzeug.utils import secure_filename
import os
from random import randint
from peer_lib import getTimeStamp, getDateStamp
UPLOAD_FOLDER = './data'

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
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


def random_with_N_digits(n):
    range_start = 10**(n-1)
    range_end = (10**n)-1
    return randint(range_start, range_end)


def getCooperativeID():

    date = str(getDateStamp())

    middle = random_with_N_digits(4)
    end = random_with_N_digits(2)

    start = date[2:4]

    id = f"{start} - {middle} - {end}"
    return id


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
    cooperativeID = getCooperativeID()
    walletaddr = eval(wallet.data)
    privateKey = walletaddr['privateKey']
    publicKey = walletaddr['publicKey']
    walletAddress = walletaddr['walletAddress']

    data = request.data
    parsed = json.loads(data.decode())
    parsedBody = parsed['body']
    parsedFullname = parsedBody['fullName']
    parsedCoopname = parsedBody['coopName']
    parsedCurraddress = parsedBody['currentAddress']
    parsedContactnum = parsedBody['contactNum']
    parsedUsername = parsedBody['userName']
    parsedPassword = parsedBody['passWord']
    parsedRpassword = parsedBody['rpassWord']
    parsedContactNumOffice = parsedBody['contactNoOffice']
    parsedResidence = parsedBody['residence']
    parsedMembershipType = parsedBody['membershipType']
    parsedOccupation = parsedBody['occupation']
    parsedPlaceOfAssignment = parsedBody['placeOfAssignment']
    parsedPosition = parsedBody['position']
    parsedMonthlyBasicSalary = parsedBody['monthlyBasicSalary']
    parsedAvenueMonthlyTakeHomePay = parsedBody['avenueMonthlyTakeHomePay']
    parsedTotalMonthlyStatutoryDeductions = parsedBody['totalMonthlyStatutoryDeductions']
    parsedTotalMonthlyNonStatutoryDeductions = parsedBody['totalMonthlyNonStatutoryDeductions']

    print(parsedBody)
    try:
        user = User()
        return user.addUser(cooperativeID, walletAddress, publicKey, privateKey, parsedFullname, parsedCoopname, parsedCurraddress, parsedContactnum, parsedUsername, parsedPassword, parsedRpassword,
                            parsedContactNumOffice,
                            parsedResidence,
                            parsedOccupation,
                            parsedMembershipType,
                            parsedPlaceOfAssignment,
                            parsedPosition,
                            parsedMonthlyBasicSalary,
                            parsedAvenueMonthlyTakeHomePay,
                            parsedTotalMonthlyStatutoryDeductions,
                            parsedTotalMonthlyNonStatutoryDeductions)
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


# @app.route("/uploadFiles", methods=['POST', 'GET'])
# @cross_origin()
# def uploadFiles():
#     target = os.path.join(UPLOAD_FOLDER, 'test_docs')
#     if not os.path.isdir(target):
#         os.mkdir(target)

#     # if 'file' not in request.file:
#     #     return jsonify({'no': "NO FILE"})
#     file = request.files['file']
#     filename = secure_filename(file.filename)
#     destination = "/".join([target, filename])
#     file.save(destination)
#     session['uploadFilepath'] = destination

#     print(filename)
#     # else:
#     #     # file = request.files['file']
#     #     return jsonify({'status': True})
#     # filename = secure_filename(file.name)

#     # file.save(filename)
#     # response = "success"
#     return jsonify({'name': filename})


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

    print(sign)
    print(signingKey)
    print(privateKey)

    walletCredentials = {'privateKey': privateKey,
                         'publicKey': publicKey,
                         'walletAddress': walletAddress}

    return json.dumps(walletCredentials)


if __name__ == '__main__':
    app.secret_key = os.urandom(24)
    app.run(debug=True)
