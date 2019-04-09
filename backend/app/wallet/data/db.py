from tinydb import TinyDB, Query, where
from hashlib import md5
import datetime
import tasho

from flask import jsonify


class User:

    # adding user
    def addUser(self, walletAddr, _privateKey, _publicKey, _name, _coop, _address, _contact, _username, _pass, _rpass):

        db = tasho.Database.open('./data/walletUser')
        data = f'{walletAddr,_privateKey,_publicKey,_name, _coop,_address, _contact, _username, _pass, _rpass }{str(datetime.datetime.now())}'
        _hash = md5()
        _hash.update(data.encode())

        try:
            tbl_user = db.table['walletUser']

            tbl_user.insert(_username, {'id': _hash.hexdigest(), 'privateKey': _privateKey, 'publicKey': _publicKey, 'walletAddress': walletAddr, 'fullName': _name, 'coopName': _coop, 'currentAddress': _address,
                                        'contactNum':  _contact, 'userName': _username, 'password': _pass, 'repeatPassword': _rpass})

            return str(walletAddr)
        except:
            return 'Failed'

# checking user
    def checkUser(self, _user, _pass):
        db = tasho.Database.open('./data/walletUser')
        tbl_user = db.table['walletUser']
        search = tbl_user.get(_user)
        try:

            if len(search['userName']) > 1 and len(search['password']) > 1:
                userData = search.dict

                return jsonify(userData)
            else:
                print(len(search['userName']))
                return "Failed"

        except:
            return 'Failed'

    def changePassword(self, _checkusername, _npassword):
        db = tasho.Database.open('./data/walletUser')
        tbl_user = db.table['walletUser']
        search = tbl_user.get(_checkusername)
        try:
            if len(search['userName']) != 0:
                search['password'] = _npassword

                return "Success"

        except:
            return "Failed"

    def checkName(self, _fullname):
        db = TinyDB('./data/userCredential.dat')
        try:
            if len(db.search(where('fullName') == _fullname)) >= 1:
                return "Sucess"
            else:
                return "Failed in if"
        except:
            return 'Failed'
