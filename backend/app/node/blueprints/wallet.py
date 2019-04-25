from flask import Blueprint, jsonify, request
from flask_cors import CORS, cross_origin
import os
from .db import Transaction
import hashlib
import json
import binascii
from pycoin.ecdsa import generator_secp256k1, sign, verify
import datetime

wallet = Blueprint('wallet', __name__)


def ripemd160(msg):
    hash_bytes = hashlib.new('ripemd160', msg.encode("utf8")).digest()
    return hash_bytes.hex()


def sha256(msg):
    hash_bytes = hashlib.sha256(msg.encode("utf8")).digest()
    return int.from_bytes(hash_bytes, byteorder="big")


def private_key_hex_to_int(privatekey_hex):
    return int(privatekey_hex, 16)


def private_key_to_public_key(private_key):
    return ((generator_secp256k1 * private_key).pair())


def get_public_key_compressed(pub_key):
    return hex(pub_key[0])[2:] + str(pub_key[1] % 2)


def public_key_compressed_to_address(public_key_compressed):
    return ripemd160(public_key_compressed)


def extract_public_key_and_address(private_key):
    pub_key = private_key_to_public_key(private_key)
    public_key_compressed = get_public_key_compressed(pub_key)
    print("public key compressed", pub_key)
    sender_address = public_key_compressed_to_address(public_key_compressed)
    print("address:", sender_address)

    return public_key_compressed, sender_address


def getDateStamp():
    currentDT = datetime.datetime.now()
    return currentDT.strftime('%Y-%m-%d')


def getTimeStamp():
    currentDT = datetime.datetime.now()
    return currentDT.strftime("%H:%M:%S")


@wallet.route('/sendTransaction', methods=['POST', 'GET'])
@cross_origin()
def sendTransaction():

    # try

    data = request.data
    parsed = json.loads(data.decode())
    parsedBody = parsed['body']
    parsedAddress = parsedBody['senderWalletAddress']
    parsedSigningKey = parsedBody['senderPrivateKey']
    parsedPublicKey = parsedBody['senderPublicKey']
    parsedAmount = parsedBody['amount']
    parsedData = parsedBody['data']
    parsedRecipientAddress = parsedBody['recipientWalletAddress']

    sender_private_key = private_key_hex_to_int(parsedPublicKey)
    public_key_compressed, sender_address = extract_public_key_and_address(
        sender_private_key)

    transaction_fee = 0.3125

    transaction = {
        'sender': parsedSigningKey,
        'senderAddress': parsedAddress,
        'to': parsedRecipientAddress,
        'amount': parsedAmount,
        'dateCreated': getDateStamp(),
        'hourCreated': getTimeStamp(),
        'transactionFee': transaction_fee,
        'data': parsedData

    }

    validTransaction = Transaction()

    json_encoder = json.JSONEncoder(separators=(',', ':'))
    trans_json = json_encoder.encode(transaction)
    print("transaction (json):", trans_json)

    trans_hash = sha256(trans_json)
    print("transaction hash (sha256):", hex(trans_hash)[2:])

    trans_signature = sign(generator_secp256k1, sender_private_key, trans_hash)
    print("transaction signature:", trans_signature)

    transaction['senderSignature'] = [
        hex(trans_signature[0])[2:], hex(trans_signature[1])]
    print("sign transaction: ")
    print(json.JSONEncoder(indent=2).encode(transaction))

    pub_key = private_key_to_public_key(sender_private_key)
    valid = verify(generator_secp256k1, pub_key, trans_hash, trans_signature)
    print("is signature valid? " + str(valid))
    if valid == True:
        return validTransaction.addValidatedTransaction(transaction)
    else:
        return jsonify({'status': False})


@wallet.route('/checkbalance', methods=['POST', 'GET'])
@cross_origin()
def checkBalance():
    return jsonify({'message': 'checkBalanceWorks'})


@wallet.route("/getTransactions", methods=["GET", "POST"])
@cross_origin()
def getTransaction():

    data = request.data
    parsed = json.loads(data.decode())
    parsedBody = parsed['body']
    parsedSenderWallet = parsedBody['walletAddress']
    # print(str(parsedBody))
    # # print(str(parsedBody))
    # return str(parsedBody)
    transaction = Transaction()

    return transaction.getTransactions(parsedSenderWallet)


@wallet.route("/getBalance", methods=["GET", "POST"])
@cross_origin()
def getBalance():

    data = request.data
    parsed = json.loads(data.decode())
    parsedBody = parsed['body']
    parsedSenderWallet = parsedBody['walletAddress']

    transaction = Transaction()

    return transaction.getBalance(parsedSenderWallet)
