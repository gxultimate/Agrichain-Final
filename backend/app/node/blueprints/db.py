import tasho
from flask import jsonify
from peer_lib import getTimeStamp, getDateStamp


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

    def addValidatedTransactions(self, _transaction):

        db = tasho.Database.open("./walletTransactions")
        tbl_transactions = db.table['walletTransactions']
        _date = str(getDateStamp())
        try:

            tbl_transactions.insert(_date, _transaction)
            search = tbl_transactions.get(_date)
            return jsonify({'status': search.dict})

        except:
            return jsonify({'status': False})

    def getValidatedTransaction(_self, _date):

        db = tasho.Database.open("./walletTransactions")
        tbl_transactions = db.table['walletTransactions']
        # _date = str(getDateStamp())
        search = tbl_transactions.get(_date)

        try:
            return str(search.dict)
        except:
            return jsonify({'status': False})
