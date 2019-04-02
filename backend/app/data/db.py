from tinydb import TinyDB, Query, where
from hashlib import md5
import datetime

from flask import jsonify


class User:

    # adding user
    def addUser(self, walletAddr, _name, _coop, _address, _contact, _username, _pass, _rpass):
        db = TinyDB('./data/userCredential.dat')
        data = f'{walletAddr,_name, _coop,_address, _contact, _username, _pass, _rpass }{str(datetime.datetime.now())}'
        _hash = md5()
        _hash.update(data.encode())

        try:
            db.insert({'id': _hash.hexdigest(), 'walletAddress': walletAddr, 'fullName': _name, 'coopName': _coop, 'currentAddress': _address,
                       'contactNum':  _contact, 'userName': _username, 'password': _pass, 'repeatPassword': _rpass})

            return str(walletAddr)
        except:
            return 'Failed'

# checking user
    def checkUser(self, _user, _pass):
        db = TinyDB('./data/userCredential.dat')
        try:
            if len(db.search(where('userName') == _user)) == 1 and len(db.search(where('password') == _pass)) == 1:
                userData = db.get(where("userName") == _user)

                return jsonify(userData)
            else:
                return "Failed"

        except:
            return 'Failed'

    def changePassword(self, _checkusername, _npassword):
        db = TinyDB('./data/userCredential.dat')
        try:
            userCredential = db.search(where('userName') == _checkusername)

            for userc in userCredential:
                userc['passWord'] = _npassword
            db.write_back(userCredential)
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
