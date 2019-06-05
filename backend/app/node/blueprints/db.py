import tasho
from flask import jsonify, session, json
from peer_lib import getTimeStamp, getDateStamp
from unqlite import UnQLite
from tinydb import TinyDB, Query
import tempfile
from io import StringIO
import ast
from hashlib import sha256
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
                data2 = str("0")
                startingHash = sha256(data2.encode('utf8')).hexdigest()
                db3.insert({'index': 0 , 'previousHash':str(startingHash) , 'currentBlock': "" })

                db2.write_back(receiverBalance)

                return jsonify({'status': 'pending transaction'})
            else:
                db2.insert(
                    {'senderAddress': _senderAddress, 'balance': _balance, 'timeStamp': timeStamp})
                db2.insert(
                    {'senderAddress': _recipientAddress, 'balance': _amount ,  'timeStamp': timeStamp})

                db.insert({'timeStamp': timeStamp,
                           'transaction': _transaction})

                return jsonify({'status': 'pending new transaction '})
        else:

            db2.insert({'senderAddress': _senderAddress,
                        'balance': _balance, 'timeStamp': timeStamp})
            db2.insert(
                    {'senderAddress': _recipientAddress, 'balance': _amount,  'timeStamp': timeStamp})

            db.insert({'timeStamp': timeStamp, 'transaction': _transaction})
            return jsonify({'status': 'invalid'})



    def getPendingTransaction(_self):

        new_port = newPort

        db = TinyDB(f"./databaseTransaction/{new_port}pendingTransaction.db")

        date = datetime.now()
        dateTime = date.strftime("%c")
        timeStamp = date.strptime(dateTime, "%a %b %d %H:%M:%S %Y")
        currentTimeStamp = timeStamp + timedelta(minutes=5)
        endTime = timeStamp + timedelta(minutes=10)

        transactions = Query()
        currentPendingTransaction = db.search((transactions.timeStamp))
        filteredTransaction = []
        for pending in currentPendingTransaction:
    
            if date.strptime(pending['timeStamp'], "%a %b %d %H:%M:%S %Y") > timeStamp  :
                filteredTransaction.append(pending)
                return json.dumps(filteredTransaction)
               
            else:
                return json.dumps(currentPendingTransaction)

                    
    def getMiningJob(_self):

        new_port = newPort

        db = TinyDB(f"./databaseTransaction/{new_port}pendingTransaction.db")
        db2 = TinyDB(f"./databaseTransaction/{new_port}blockChain.db")
        date = datetime.now()
        dateTime = date.strftime("%c")
        timeStamp = date.strptime(dateTime, "%a %b %d %H:%M:%S %Y")
        currentTimeStamp = timeStamp + timedelta(minutes=5)
        endTime = timeStamp + timedelta(minutes=10)

        transactions = Query()
        currentPendingTransaction = db.search((transactions.timeStamp))
    
        filteredTransaction = []
        allBlock = db2.all()
        currentBlock = allBlock[-1]
        currentIndex  = currentBlock['index'] 
        currentPreviousHash  = currentBlock['previousHash']

        for pending in currentPendingTransaction:

            if date.strptime(pending['timeStamp'], "%a %b %d %H:%M:%S %Y") > timeStamp  :
                filteredTransaction.append(pending)
                pendingTransaction =  sha256(str(filteredTransaction).encode("utf8")).hexdigest()
                print(type(currentPreviousHash))
                print(type(pendingTransaction))
                miningJob = {"index":currentIndex , "previousHash": currentPreviousHash , "pendingTransaction": pendingTransaction}
                return json.dumps(miningJob)
                
            else:
                
                pendingTransaction = sha256(str(currentPendingTransaction).encode("utf8")).hexdigest()
                miningJob = {"index":currentIndex , "previousHash": currentPreviousHash , "pendingTransaction": pendingTransaction}
                return json.dumps(miningJob)



    def getWalletBalance(_self):

        new_port = newPort

        db = TinyDB(f"./databaseTransaction/{new_port}walletBalance.db")
        transactions = Query()
        date = datetime.now()
        dateTime = date.strftime("%c")
        timeStamp = date.strptime(dateTime, "%a %b %d %H:%M:%S %Y")
        currentTimeStamp = timeStamp + timedelta(minutes=5)
        endTime = timeStamp + timedelta(minutes=10)        
        filteredBalance = []
        currentBalance = db.search((transactions.timeStamp))

        for pending in currentBalance:
            if  date.strptime(pending['timeStamp'], "%a %b %d %H:%M:%S %Y") > timeStamp :
                filteredBalance.append(pending)
                # print("pending!" , filteredBalance , pending)
                return json.dumps(filteredBalance)
                
            else:
                # print("current!" , currentBalance)
                return json.dumps(currentBalance)


    def addNewWalletBalance(_self, _newBalance):
        new_port = newPort
        date = datetime.now()
        timeStamp = date.strftime("%c")
        db = TinyDB(f"./databaseTransaction/{new_port}walletBalance.db")
    
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
    
        for balance in _newBalances:

            if allBalance != []:    
                for oldBalance in allBalance:

                        balanceData = db.search(transactions.senderAddress == balance['senderAddress'])
                        search = db.search(   
                            transactions.senderAddress == balance['senderAddress'])
                        if len(balance) > 0 and search != []:
                            lastSearch = search[-1] 
                        
                            lastSearchDict = lastSearch['balance']
                            lastSearch['balance'] = float(balance['balance'])
                            db.write_back(search)
                    
                          
                        else:
                            print('newTrans on else')
                            db.insert(balance)
             
             
            else:
                print('newTransaction')
                db.insert(balance)
            
    
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
        try:    
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
        except:
          print("error")

   

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

        db2 = TinyDB(f"./databaseTransaction/{new_port}walletBalance.db")

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
