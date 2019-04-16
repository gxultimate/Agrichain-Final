import tasho
from flask import jsonify


class Address:

    def addNewAddress(_self, _address):

        db = tasho.Database.open("../walletAddresses")

        try:
            tbl_address = db.table['walletAddresses']

            tbl_address.insert({'walletAddress': _address})

            return str(_address)
        except:
            return jsonify(_address, {'status': False})

    def addNewSignTransaction(_self, _signature):

        # db = tasho.Database.new("../walletTransactions")
        db = tasho.Database.open("../walletTransactions")
        try:
            tbl_address = db.table['walletTransactions']

            tbl_address.insert({'walletAddress': _signature})

            return str(_signature)

        except:
            return jsonify(_signature, {'status': False})

    def checkAddress(_self, _address):
        db = tasho.Database.open("./walletAddresses")
        tbl_address = db.table['addresses']
        search = tbl_address.get(_address)

        try:
            if len(search['address']) >= 1:
                return jsonify({'status': True})
        except:
            return jsonify({'status': False})
