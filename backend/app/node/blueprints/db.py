import tasho
from flask import jsonify
from peer_lib import getTimeStamp, getDateStamp
from unqlite import UnQLite
from tinydb import TinyDB, Query
# class Address:

#     def addNewAddress(_self, _address):

#         db = tasho.Database.open("/walletTransactions")

#         try:
#             tbl_address = db.table['walletAddresses']

#             tbl_address.insert({'walletAddress': _address})

#             return str(_address)
#         except:
#             return jsonify(_address, {'status': False})

#     def checkAddress(_self, _address):
#         db = tasho.Database.open("/walletAddresses")
#         tbl_address = db.table['addresses']
#         search = tbl_address.get(_address)

#         try:
#             if len(search['address']) >= 1:
#                 return jsonify({'status': True})
#         except:
#             return jsonify({'status': False})


class Transaction:

    def addValidatedTransaction(self, _transaction):

        # db = tasho.Database.open("./walletTransactions")
        # tbl_transactions = db.table['walletTransactions']\

        # _date = str(getDateStamp())
        # try:

        #     tbl_transactions.insert(_date, _transaction)
        #     search = tbl_transactions.get(_date)
        #     return jsonify({'status': search.dict})

        # except:
        #     return jsonify({'status': False})
        # db = UnQLite()
        # transaction = db.collection("transactions")

        # try:
        #     transaction.store(_transaction)

        #     print("printing", transaction.fetch(0))
        #     print("printing", transaction.fetch(1))
        #     return str(transaction.exists())
        # except:
        #     return jsonify({'status': False})

        db = TinyDB('./wallet.db')
        date = getDateStamp()
        db.insert(_transaction)
        transaction = Query()

        trans = db.search(transaction.dateCreated == date)
        return str(trans)

    def getValidatedTransactions(_self, _date):

        # db = tasho.Database.open("./walletTransactions")
        # tbl_transactions = db.table['walletTransactions']

        # search = tbl_transactions.get(_date)

        # try:
        #     if search != None:
        #         return str(search.dict)
        #     else:
        #         return str('No Transaction')
        # except:
        #     return jsonify({'status': False})

        # db = UnQLite()
        # date = getDateStamp()
        # transaction = db.collection("transactions")
        # try:
        #     results = {'1': transaction.fetch(1), '2': transaction.fetch(0)}

        #     # results = transaction.filter(
        #     #     lambda obj: obj['dateCreated'].startswith(f'{date}'))
        #     return jsonify(results)
        # except:
        #     return jsonify({'status': False})

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

        print(str(trans))
        return jsonify(trans)

    def getBalance(_self, _senderWalletAddress):

        db = TinyDB('./wallet.db')
        date = getDateStamp()
        transaction = Query()
        userBalance = 0

        transaction = db.search(
            transaction.senderAddress == _senderWalletAddress)

        for trans in transaction:
            if trans['amount'] != "":
                userBalance += int(trans['amount'])
        print(("myTrans", trans))
        print(userBalance)
        return(jsonify({'balance': userBalance}))
