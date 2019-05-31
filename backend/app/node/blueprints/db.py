import tasho
from flask import jsonify, session, json
from peer_lib import getTimeStamp, getDateStamp
from unqlite import UnQLite
from tinydb import TinyDB, Query
import tempfile
from io import StringIO
import ast
from datetime import timedelta, datetime


class Transaction:

    newPort = 0

    def currentPort(_self, _port, _ip):

        global newPort
        newPort = _port

    def addNewLoanRequest(_self, _loanRequest, _loanAmortization):

        db = TinyDB('./pendingLoanTransaction.db')
        db2 = TinyDB('./loanAmortization.db')
        try:

            db.insert(_loanRequest)
            db2.insert(_loanAmortization)
            print("New Loan Amortization >>", _loanAmortization)
            return jsonify({'status': True})

        except:
            return jsonify({'status': 'Error on DB'})

    # def addNewLoanAmortization(_self, _loanAmortization):
    #     db = TinyDB('./loanAmortization.db')
    #     print("amor", _loanAmortization)
    #     try:
    #         db.insert(_loanAmortization)
    #         print("amor")
    #         return jsonify({'status': 'True on amor'})

    #     except:
    #         print("amor error")
    #         return jsonify({'status': 'Error on DB'})

    def getAllLoanRequest(_self, cooperativeName):

        db = TinyDB('./pendingLoanTransaction.db')

        loan = Query()

        try:
            checkAllLoan = db.search(
                loan.borrowerCoopName == cooperativeName)

            print("All Pendinng Loan Request >> ", checkAllLoan)
            return jsonify(checkAllLoan)
        except:
            return ({'status': False})

    def getLoanRequest(_self, _cooperativeID):

        db = TinyDB('./pendingLoanTransaction.db')

        loan = Query()

        try:
            checkUserLoan = db.search(loan.borrowerCoopID == _cooperativeID)

            print("User Loan Request >> ", checkUserLoan)
            return jsonify(checkUserLoan)
        except:
            return ({'status': False})

    def getUserAmortization(_self, _cooperativeID):
        db2 = TinyDB('./loanAmortization.db')
        loan = Query()
        try:
            checkUserAmortization = db2.search(
                loan.coopID == _cooperativeID)

            print("User Amortization >>", checkUserAmortization)
            # print(checkUserLoan)
            return jsonify(checkUserAmortization)
        except:
            return ({'status': False})

    def sendLoanPayment(_self, _loanTransactionID, _amount):
        db = TinyDB('./pendingLoanTransaction.db')
        loan = Query()
        try:
            checkUserLoan = db.search(loan.loanRequestID == _loanTransactionID)

            newBalance = checkUserLoan['borrowerParsedAmountOfLoan'] - _amount
            checkUserLoan['borrowerParsedAmountOfLoan'] = newBalance
            db.write_back(checkUserLoan)

            return ({'status': True})

        except:
            return ({'status': False})

    def addValidatedTransaction(self, _transaction, _senderAddress, _recipientAddress, _balance, _totalAmount, _amount):

        new_port = newPort

        db2 = TinyDB(f"./databaseTransaction/{new_port}walletBalance.db")
        db3 = TinyDB(f"./databaseTransaction/{new_port}blockChain.db")
        db = TinyDB(f"./databaseTransaction/{new_port}pendingTransaction.db")

        date = datetime.now()
        timeStamp = date.strftime("%c")
        transaction = Query()
        userBalance = db2.search(transaction.senderAddress == _senderAddress)

        receiverBalance = db2.search(
            transaction.senderAddress == _recipientAddress)

        if userBalance != [] or len(userBalance) > 1:
            userBalanceDict = userBalance[-1]
            if receiverBalance != [] or len(receiverBalance) > 1:
                receiverBalanceDict = receiverBalance[-1]
                userBalanceDict['balance'] = float(
                    userBalanceDict['balance']) - float(_totalAmount)

                receiverBalanceDict['balance'] = float(
                    receiverBalanceDict['balance']) + float(_amount)
                # print(receiverNewBalance)
                db2.write_back(userBalance)

                db.insert({'timeStamp': timeStamp,
                           'transaction': _transaction})

                db2.write_back(receiverBalance)

                return jsonify({'status': 'pending transaction'})
            else:
                db2.insert(
                    {'senderAddress': _senderAddress, 'balance': _balance, 'lastTransaction': timeStamp})
                db2.insert(
                    {'senderAddress': _recipientAddress, 'balance': _amount})

                db.insert({'timeStamp': timeStamp,
                           'transaction': _transaction})

                return jsonify({'status': 'pending new transaction '})
        else:

            db2.insert({'senderAddress': _senderAddress,
                        'balance': _balance, 'lastTransaction': timeStamp})

            db.insert({'timeStamp': timeStamp, 'transaction': _transaction})
            return jsonify({'status': 'invalid'})

    def getPendingTransaction(_self):

        new_port = newPort

        db = TinyDB(f"./databaseTransaction/{new_port}pendingTransaction.db")

        date = datetime.now()
        dateTime = date.strftime("%c")
        timeStamp = date.strptime(dateTime, "%a %b %d %H:%M:%S %Y")
        endTime = timeStamp + timedelta(minutes=5)

        transactions = Query()
        currentPendingTransaction = db.search((transactions.timeStamp < str(
            endTime)) and (transactions.timeStamp > str(timeStamp)))

        return json.dumps(currentPendingTransaction)

    def getWalletBalance(_self):

        new_port = newPort

        db = TinyDB(f"./databaseTransaction/{new_port}walletBalance.db")
        transactions = Query()
        return json.dumps(db.all())

    def addNewWalletBalance(_self, _newBalance):
        new_port = newPort
        date = datetime.now()
        timeStamp = date.strftime("%c")
        db = TinyDB(f"./databaseTransaction/{new_port}walletBalance.db")
        db2 = TinyDB(f"./databaseTransaction/{new_port}tempWalletBalance.db")
        transactions = Query()
        allBalance = db.all()

        _newBalances = ast.literal_eval(_newBalance)

        _newAddresses = []
        _currentAddresses = []

        for address in _newBalances:
            if 'senderAddress' in address:
                _newAddresses.append(address['senderAddress'])
        for address in allBalance:
            if 'senderAddress' in address:
                _currentAddresses.append(address['senderAddress'])

        existingAddress = (set(_newAddresses) & set(_currentAddresses))
        strExistingAddress = str(existingAddress)
        strExisting = strExistingAddress[1:-1]
        # print(allBalance ,'all'  , _newBalances , "new")

        for balance in _newBalances:
            #     print(balance , "bal",  allBalance,"all")
            if balance in allBalance:
                # print("balance ", balance['senderAddress'])

                if balance['senderAddress'] == strExisting:
                    print("ok")
                else:
                    print(balance['senderAddress'], strExisting)
                #     search = db.search(
                #         transactions.senderAddress == strExisting)
                #     # search['balance']
            else:
                print("balance else")
                db.insert(balance)

        # newBal = str(_newBalance)
        # newBalancer = ast.literal_eval(newBal)
        # newBalances = newBal[1:-1]
        # newBalance = ast.literal_eval(newBalances)
        # db2 = TinyDB(f"./{new_port}tempWalletBalance.db")
        # db2.insert(dict(newBalance))

        # for addresses in newBalancer:
        #     if 'senderAddress' in addresses:
        #         newAddresses.append(addresses['senderAddress'])

        # for currAddress in allBalance:
        #     if 'senderAddress' in currAddress:
        #         currAddresses.append(currAddress['senderAddress'])

        # existingAddress = (set(currAddresses) & set(newAddresses))
        # strExistingAddress = str(existingAddress)
        # strExisting = strExistingAddress[1:-1]

        # searchBalance = db2.search(
        #     transactions.senderAddress == str(strExisting))
        # print(db2.all(), "Hello")
        # print(searchBalance, "search")
        # print(newBalance , type(newBalance) , "ex")

        # if (existingAddress) != [] or None:
        #     if len(existingAddress) == 1:
        #         existingNewAddress = db.search(
        #             transactions.senderAddress == strExisting)
        #         for newBalanceAddress in newBalance:
        #             existing.append(
        #                 f"{newBalanceAddress['senderAddress']} , {newBalanceAddress['balance']}")

        #         searchBalance = db.search(
        #             transactions.senderAddress == str(strExisting))

        #         print(type(newBalance), newBalance, "temp")

        #     else:
        #         for x in existingAddress:
        #             existing.append(db.search(transactions.senderAddress == x))
        # else:
        #     db.insert({timeStamp: newBalance})

    def addNewPendingTransaction(_self, _transactions):

        new_port = newPort
        date = datetime.now()
        timeStamp = date.strftime("%c")

        db = TinyDB(f"./databaseTransaction/{new_port}pendingTransaction.db")

        transactions = Query()
        currentPendingTransaction = db.search(
            transactions.timeStamp == str(timeStamp))
        current = db.all()

        # transactions = _transactions[1:-1]

        currentTransactions = ast.literal_eval(_transactions)
        # newTransaction = dict(currentTransactions)

        for transaction in currentTransactions:
            # print(transaction , "transaction" , currentTransactions,"currentTransaction")
            if transaction in currentPendingTransaction:
                print("transaction =>", transaction)
            else:
                if transaction in current:
                    print("transaction exists")
                else:
                    db.insert(transaction)
                    print("currentransaction->", current)

    # def getValidatedTransactions(_self, _date):

    #     db = TinyDB('./wallet.db')
    #     date = getDateStamp()
    #     transaction = Query()

    #     trans = db.search(transaction.dateCreated == date)
    #     return str(trans)

    def getTransactions(_self, _senderWalletAddress):
        new_port = newPort
        db = TinyDB(f"./databaseTransaction/{new_port}pendingTransaction.db")
        date = getDateStamp()
        transaction = Query()

        trans = db.search(transaction.senderAddress == _senderWalletAddress)

        # print(str(trans))
        return jsonify(trans)

    def getBalance(_self, _senderWalletAddress):
        # print(newPort)
        new_port = newPort

        db2 = TinyDB(f"./{new_port}walletBalance.db")

        # db3 = TinyDB("./unspenTransactions.db")
        time = getTimeStamp()
        transaction = Query()

        userBalance = db2.search(
            transaction.senderAddress == _senderWalletAddress)

        # transactions = db.search(
        #     transaction.senderAddress == _senderWalletAddress)

        # print(transactions)
        if userBalance != None:
            if userBalance != "" or userBalance != []:

                try:
                    userBalanceDict = userBalance[-1]
                    return jsonify({'balance': float(userBalanceDict['balance'])})
                except:
                    return jsonify({'balance': 0})
            else:
                return jsonify({'balance': 0})
        else:
            return jsonify({'balance': 0})
        # if transactions != []:
        #     try:
        #         checkBalance = transactions[-1]

        #         newBalance = checkBalance['balance']
        #         # print("check", _senderWalletAddress)
        #         return(jsonify({'balance': newBalance}))
        #     except:
        #         return(jsonify({'balance': 0}))
        # else:
        #     try:

        #         unspentDict = unspent[-1]
        #         newBalance = unspentDict['balance']

        #         return(jsonify({'balance': newBalance}))
        #     except:
        #         return(jsonify({'balance': 0}))
