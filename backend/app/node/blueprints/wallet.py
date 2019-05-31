from flask import Blueprint, jsonify, request
from flask_cors import CORS, cross_origin
import os
from .db import Transaction

import hashlib
import json
import binascii
from pycoin.ecdsa import generator_secp256k1, sign, verify
import datetime
from peer_lib import getDateStamp, getTimeStamp
from blueprints.loanCalculator import LoanCalculator
from random import randint
from werkzeug.utils import secure_filename
import ast
import sys


UPLOAD_FOLDER = './data'

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


# def getDateStamp():
#     currentDT = datetime.datetime.now()
#     return currentDT.strftime('%Y-%m-%d')


# def getTimeStamp():
#     currentDT = datetime.datetime.now()
#     return currentDT.strftime("%H:%M:%S")


@wallet.route("/getPort", methods=['POST', 'GET'])
@cross_origin()
def getPort():
    return jsonify({'status': 'True'})


@wallet.route("/sendLoanRequest", methods=['POST', 'GET'])
@cross_origin()
def sendLoanRequest():
    data = request.data
    parsed = json.loads(data.decode())

    parsedBody = parsed['body']
    parsedData = parsedBody['data']
    parsedLoan = parsedBody['loan']
    # print(parsedData)
    print(parsedBody['data'])
    print(parsedBody['loan'])
    # return jsonify(parsedBody)
    # # userCredentials
    parsedCooperativeID = parsedData['cooperativeID']
    parsedFullName = parsedData['fullName']
    parsedCoopName = parsedData['coopName']
    parsedPermanentAddress = parsedData['currentAddress']
    parsedContactNum = parsedData['contactNum']
    parsedContactNoOffice = parsedData['contactNoOffice']
    parsedResidenceNumber = parsedData['residence']
    parsedSenderWalletAddress = parsedData['walletAddress']
    parsedPrivateKey = parsedData['privateKey']
    parsedPublicKey = parsedData['publicKey']

    parsedMembershipType = parsedData['membershipType']
    parsedOccupation = parsedData['occupation']
    parsedPlaceOfAssignment = parsedData['placeOfAssignment']
    parsedPosition = parsedData['position']
    parsedMonthlyBasicSalary = parsedData['monthlyBasicSalary']
    parsedAvenueMonthlyTakeHomePay = parsedData['avenueMonthlyTakeHomePay']
    parsedTotalMonthlyStatutoryDeductions = parsedData['totalMonthlyStatutoryDeductions']
    parsedTotalMonthlyNonStatutoryDeductions = parsedData['totalMonthlyNonStatutoryDeductions']

    # Loan
    parsedLoanRequestID = parsedLoan['loanRequestID']
    parsedTypeOfLoan = parsedLoan['typeOfLoan']
    parsedAmountOfLoan = parsedLoan['amountOfLoan']
    parsedCoMakerName = parsedLoan['coMakerName']
    parsedCoMakercooperativeID = parsedLoan['coMakercooperativeID']
    parsedCoMakermembershipType = parsedLoan['coMakermembershipType']
    parsedCoMakerOccupation = parsedLoan['coMakerOccupation']
    parsedCoMakerplaceOfAssignment = parsedLoan['coMakerplaceOfAssignment']
    parsedCoMakerposition = parsedLoan['coMakerposition']
    parsedCoMakermonthlyBasicSalary = parsedLoan['coMakermonthlyBasicSalary']
    parsedCoMakeravenueMonthlyTakeHomePay = parsedLoan['coMakeravenueMonthlyTakeHomePay']
    parsedCoMakertotalMonthlyStatutoryDeductions = parsedLoan[
        'coMakertotalMonthlyStatutoryDeductions']
    parsedCoMakertotalMonthlyNonStatutoryDeductions = parsedLoan[
        'coMakertotalMonthlyNonStatutoryDeductions']
    parsedCoMakerContactNum = parsedLoan['coMakerContactNum']
    parsedCoMakerContactNoOffice = parsedLoan['coMakerContactNoOffice']
    parsedCoMakerResidence = parsedLoan['coMakerResidence']
    parsedDateRequested = parsedLoan['dateRequested']
    parsedDateRequestedFormat = parsedDateRequested[0:10]
    parsedInterest = parsedLoan['interest']
    parsedTermOfLoan = parsedLoan['termOfLoan']
    parsedPenalty = parsedLoan['penaltyFee']
    parsedServiceFee = parsedLoan['serviceFee']
    parsedUploadID = parsedLoan['uploadID']
    parsedStatus = parsedLoan['status']
    parsedAmountToPay = parsedLoan['amountToPay']
    parsedInitialAmount = parsedLoan['initialAmountOfLoan']

    loanRequest = {
        'loanRequestID': parsedLoanRequestID,
        'borrowerFullname': parsedFullName,
        'borrowerCoopID': parsedCooperativeID,
        'borrowerCoopName': parsedCoopName,
        'borrowerPermanentAddress': parsedPermanentAddress,
        'borrowerContactNum': parsedContactNum,
        'borrowerContactNoOffice': parsedContactNoOffice,
        'borrowerResidenceNumber': parsedResidenceNumber,
        'borrowerSenderWallerAddress': parsedSenderWalletAddress,
        'borrowerParsedPrivateKey': parsedPrivateKey,
        'borrowerParsedPublicKey': parsedPublicKey,

        'borrowerParsedMembershipType': parsedMembershipType,
        'borrowerOccupation': parsedOccupation,
        'borrowerParsedPlaceOfAssignment': parsedPlaceOfAssignment,
        'borrowerParsedPosition': parsedPosition,
        'borrowerParsedMonthlyBasicSalary': parsedMonthlyBasicSalary,
        'borrowerParsedAvenueMonthlyTakeHomePay': parsedAvenueMonthlyTakeHomePay,
        'borrowerParsedTotalMonthlyStatutoryDeductions': parsedTotalMonthlyStatutoryDeductions,
        'borrowerParsedTotalMonthlyNonStatutoryDeductions': parsedTotalMonthlyNonStatutoryDeductions,
        'borrowerParsedTypeOfLoan': parsedTypeOfLoan,

        'borrowerParsedAmountOfLoan': parsedAmountOfLoan,
        'borrowerParsedAmountToPay': parsedAmountToPay,
        'borrowerParsedCoMakerName': parsedCoMakerName,
        'borrowerParsedCoMakercooperativeID': parsedCoMakercooperativeID,
        'borrowerParsedCoMakermembershipType': parsedCoMakermembershipType,
        'borrowerParsedCoMakercooperativeID': parsedCoMakercooperativeID,
        'borrowerParsedCoMakerOccupation': parsedCoMakerOccupation,
        'borrowerParsedCoMakerplaceOfAssignment': parsedCoMakerplaceOfAssignment,
        'borrowerParsedCoMakerposition': parsedCoMakerposition,
        'borrowerParsedCoMakermonthlyBasicSalary': parsedCoMakermonthlyBasicSalary,
        'borrowerParsedCoMakeravenueMonthlyTakeHomePay': parsedCoMakeravenueMonthlyTakeHomePay,
        'borrowerParsedCoMakertotalMonthlyStatutoryDeductions': parsedCoMakertotalMonthlyStatutoryDeductions,
        'borrowerParsedCoMakertotalMonthlyNonStatutoryDeductions': parsedCoMakertotalMonthlyNonStatutoryDeductions,
        'borrowerParsedCoMakerContactNum': parsedCoMakerContactNum,
        'borrowerParsedCoMakerContactNoOffice': parsedCoMakerContactNoOffice,
        'borrowerParsedCoMakerResidence': parsedCoMakerResidence,
        'borrowerParsedDateRequested': parsedDateRequestedFormat,
        'borrowerParsedInterest': parsedInterest,
        'borrowerParsedTermOfLoan': parsedTermOfLoan,
        'borrowerParsedPenalty': parsedPenalty,
        'borrowerParsedServiceFee': parsedServiceFee,
        'borrowerParsedUploadID': parsedUploadID,
        'borrowerParsedStatus': parsedStatus,
        'borrowerParsedInitialAmount': parsedInitialAmount


    }

    loan = LoanCalculator()

    loanAmortization = loan.getAmortization(parsedTermOfLoan,
                                            parsedInitialAmount, parsedInterest, parsedCooperativeID)
    # loanAmor = json.loads(loanAmortization)
    loanAmortizations = eval(loanAmortization)

    transaction = Transaction()
    return transaction.addNewLoanRequest(loanRequest, loanAmortizations)


@wallet.route("/getAmortization", methods=['POST', 'GET'])
@cross_origin()
def getAmortization():
    data = request.data
    parsed = json.loads(data.decode())
    parsedBody = parsed['body']
    parsedCoopID = parsedBody['cooperativeID']

    transaction = Transaction()
    try:
        return transaction.getUserAmortization(parsedCoopID)
    except:
        return jsonify({'status': False})


@wallet.route("/getLoanRequest", methods=['POST', 'GET'])
@cross_origin()
def getLoanRequest():

    data = request.data
    parsed = json.loads(data.decode())
    parsedBody = parsed['body']
    parsedCoopID = parsedBody['cooperativeID']

    transaction = Transaction()
    try:
        return transaction.getLoanRequest(parsedCoopID)
    except:
        return jsonify({'status': False})


@wallet.route("/getAllLoanRequests", methods=['POST', 'GET'])
@cross_origin()
def getAllLoanRequest():

    data = request.data
    parsed = json.loads(data.decode())
    parsedBody = parsed['body']
    parsedCoopName = parsedBody['coopName']
    # print(parsedBody)

    # return jsonify(parsedBody)
    transaction = Transaction()
    try:
        return transaction.getAllLoanRequest(parsedCoopName)
    except:
        return jsonify({'status': False})


@wallet.route("/sendLoanPayment", methods=['POST', 'GET'])
@cross_origin()
def sendLoanPayment():

    data = request.data
    parsed = json.loads(data.decode())
    parsedBody = parsed['body']

    print(parsedBody)

    return jsonify(parsedBody)


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

    parsedBalance = parsedBody['balance']

    # parsedBalance = 200
    # parsedTotal = 120
    # parsedAmount = 50
    transactionFee = 0.3125
    parsedTotal = float(transactionFee) + float(parsedAmount)
    sender_private_key = private_key_hex_to_int(parsedPublicKey)
    public_key_compressed, sender_address = extract_public_key_and_address(
        sender_private_key)

    transaction = {
        'sender': parsedSigningKey,
        'senderAddress': parsedAddress,
        'to': parsedRecipientAddress,
        'trueAmount': parsedAmount,
        'amount': parsedTotal,
        'dateCreated': getDateStamp(),
        'hourCreated': getTimeStamp(),
        'transactionFee': transactionFee,
        'data': parsedData,
        'balance': parsedBalance

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
        return validTransaction.addValidatedTransaction(
            trans_hash, parsedAddress, parsedRecipientAddress, parsedBalance, parsedTotal, parsedAmount)
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
    # print("parsedBody", parsedBody)
    # return str(parsedBody)
    parsedSenderWallet = parsedBody['walletAddress']
    # # # print("parsedBody", parsedBalance)
    # # # parsedBalance = parsedBody['balance']

    transaction = Transaction()
    # # # return str(parsedBody['data'])
    return transaction.getBalance(parsedSenderWallet)
