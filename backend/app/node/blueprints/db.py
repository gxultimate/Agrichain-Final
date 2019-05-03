import tasho
from flask import jsonify
from peer_lib import getTimeStamp, getDateStamp
from unqlite import UnQLite
from tinydb import TinyDB, Query


class Transaction:

    def addValidatedTransaction(self, _transaction, _senderAddress, _recipientAddress, _balance, _totalAmount, _amount):

        db = TinyDB('./wallet.db')
        db2 = TinyDB('./pendingTransaction.db')
        date = getDateStamp()

        transaction = Query()
        amount = 0

        currentTransaction = db.search(
            transaction.senderAddress == _senderAddress)

        check_address = db.search(
            transaction.senderAddress == _recipientAddress)

        check_address_dict = check_address[-1]

        currentTransaction_dict = currentTransaction[-1]

        recipientBalance = check_address_dict['balance']
        if int(_balance) > int(_totalAmount):
            newBalance = int(_balance) - int(_amount)
            addAmount = int(recipientBalance) + int(_amount)

            _transaction['balance'] = newBalance

            check_address_dict['balance'] = addAmount

            db.write_back(check_address)

            db.insert(_transaction)
            db2.insert(_transaction)

            # print("new Balance", newBalance)
            # print("new Balance", _transaction)
            return jsonify({"newTransaction": _transaction})
        else:
            return jsonify({"invalidTransaction": False})

    def getPendingTransaction(_self, _transactions):

        db = TinyDB('./pendingTransaction.db')
        date = getDateStamp()
        transactions = Query()
        currentPendingTransaction = db.search(transactions.dateCreated == date)
        print("currentPending", currentPendingTransaction)

        return str(currentPendingTransaction)

    def addNewPendingTransaction(_self, _transactions, date):

        db = TinyDB('./pendingTransaction.db')
        date = getDateStamp()
        transactions = Query()
        currentPendingTransaction = db.search(transactions.dateCreated == date)

        if _transactions in currentPendingTransaction:
            return str('No new Pending Transaction')

        else:
            return str(f"{date}>>{currentPendingTransaction}")

    def getValidatedTransactions(_self, _date):

        db = TinyDB('./wallet.db')
        date = getDateStamp()
        transaction = Query()

        trans = db.search(transaction.dateCreated == date)
        return str(trans)

    def getTransactions(_self, _senderWalletAddress):

        db = TinyDB('./wallet.db')
        date = getDateStamp()
        transaction = Query()

        trans = db.search(transaction.senderAddress == _senderWalletAddress)

        # print(str(trans))
        return jsonify(trans)

    def getBalance(_self, _senderWalletAddress):

        db = TinyDB('./wallet.db')
        date = getDateStamp()
        transaction = Query()
        userBalance = 0
        userTotalAmount = 0
        transactions = db.search(
            transaction.senderAddress == _senderWalletAddress)
        try:
            checkBalance = transactions[-1]

            newBalance = checkBalance['balance']
            # print("check", _senderWalletAddress)
            return(jsonify({'balance': newBalance}))
        except:
            return(jsonify({'balance': 0}))

    def receiveTransaction(_self, _senderWalletAddress):
        db = TinyDB("./wallet.db")

        date = getDateStamp()
        transaction = Query()

        myTransaction = db.search(transaction.to == _senderWalletAddress)

        myExactRecipientDict = myTransaction[-1]
        myExactRecipientBalance = myExactRecipientDict['balance']
        myExactSenderAmount = myExactRecipientDict['trueAmount']

        myExchange = db.search(transaction.senderAddress ==
                               myExactRecipientDict['senderAddress'])
        myExchangeTransactionDict = myExchange[-1]
        myExchangeRecipient = myExchangeTransactionDict['senderAddress']

        search = db.search(transaction.senderAddress ==
                           myExchangeRecipient)

        firstSearch = search[-1]
        lastSearch = search[-2]

        if firstSearch['balance'] != lastSearch['balance']:
            myExactRecipientTrueBalance = int(
                myExactRecipientBalance) + int(myExactSenderAmount)

            answer = lastSearch['balance'] + myExactRecipientTrueBalance
            db.write_back(search)
        else:

            # print(lastSearch)

            return (jsonify({'balance': answer}))
