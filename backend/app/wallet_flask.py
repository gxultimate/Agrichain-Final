from flask import Flask, render_template, request, redirect, url_for, jsonify, json
import flask_bootstrap
from flask_cors import CORS, cross_origin
from ecdsa import SigningKey, SECP256k1
import sha3
import qrcode
import sys
from data.db import User
import json


app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)


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


@app.route('/')
def log():
    return render_template('login_interface.html')


@app.route('/getName', methods=['POST', 'GET'])
@cross_origin()
def getName():

    data = {'name': 'Ralph POGI'}
    return jsonify(data)


@app.route('/login', methods=['POST', 'GET'])
def login():

    data = request.data
    parsed = json.loads(data.decode())
    parsedBody = parsed['body']
    parseUsername = parsedBody['username']
    parsePassword = parsedBody['password']
    user = User()
    return user.checkUser(parseUsername, parsePassword)


@app.route('/register', methods=['POST', 'GET'])
@cross_origin()
def register():

    data = request.data
    parsed = json.loads(data.decode())

    user = User()
    return user.addUser(parsed['body'])


@app.route('/forgotPass', methods=['POST', 'GET'])
def changePass():

    data = request.data
    parsed = json.loads(data.decode())
    parsedBody = parsed['body']
    parsedUsername = parsedBody['username']
    parsedPassword = parsedBody['password']

    user = User()

    return user.changePassword(parsedUsername, parsedPassword)


@app.route('/wallet')
def wallet():
    return render_template('wallet_interface.html')


@app.route('/sample')
def sample():
    return render_template('sample.html')


@app.route('/generateWallet', methods=['POST', 'GET'])
def generateWallet():
    if request.method == 'GET':

        keccak = sha3.keccak_256()
        priv = SigningKey.generate(curve=SECP256k1)
        pub = priv.get_verifying_key().to_string()

        keccak.update(pub)

        address = keccak.hexdigest()[24:]

        def test(addrstr):
            assert(addrstr == checksum_encode(addrstr))

        # print("Private key:", priv.to_string().hex())
        # print("Public key: ", pub.hex())
        # print("Address:    ", checksum_encode(address))

        walletAddress = checksum_encode(address)

        # save QR code and other inputs=====================================
        # Address
        # addr = qrcode.QRCode(
        #     version=1,
        #     error_correction=qrcode.constants.ERROR_CORRECT_L,
        #     box_size=10,
        #     border=0,
        # )
        # addr.add_data(checksum_encode(address))
        # addr.make(fit=True)

        # addrImg = addr.make_image(fill_color="black", back_color="white")

        # addrImg.save('./templates/img/address.png')

        # # Private Key
        # priveKey = qrcode.QRCode(
        #     version=1,
        #     error_correction=qrcode.constants.ERROR_CORRECT_L,
        #     box_size=10,
        #     border=0,
        # )
        # priveKey.add_data(priv.to_string().hex())
        # priveKey.make(fit=True)

        # priveKeyImg = priveKey.make_image(fill_color="black", back_color="white")

        # priveKeyImg.save('./templates/img/privKey.png')

        return walletAddress

# @app.route('/cashIn')
# def cashIn():


if __name__ == '__main__':
    app.run(debug=True)
