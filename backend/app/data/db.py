from tinydb import TinyDB, Query, where
from hashlib import md5
import datetime


class User:

    # adding user
    def addUser(self, _user):
        db = TinyDB('./data/userCredential.dat')
        data = f'{_user}{str(datetime.datetime.now())}'
        _hash = md5()
        _hash.update(data.encode())

        try:
            db.insert(_user)
            db.update({'_id': _hash.hexdigest()})
            return str(_user)
        except:
            return 'Failed'

# checking user
    def checkUser(self, _user, _pass):
        db = TinyDB('./data/userCredential.dat')
        try:
            if len(db.search(where('username') == _user)) == 1 and len(db.search(where('password') == _pass)) == 1:
                return "Success"
            else:

                return "Failed"

        except:
            return 'Failed'

    def changePassword(self, _checkusername, _npassword):
        db = TinyDB('./data/userCredential.dat')
        try:
            userCredential = db.search(where('username') == _checkusername)

            for userc in userCredential:
                userc['password'] = _npassword
            db.write_back(userCredential)
            return 'Success'

        except:
            return 'Failed'
