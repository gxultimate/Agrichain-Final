from tinydb import TinyDB, Query, where
from hashlib import md5
import datetime
import tasho
from flask import jsonify


class User:

    # adding user
    def addUser(self, cooperativeID, walletAddr, _privateKey, _publicKey, _name, _coop, _address, _contact, _username, _pass, _rpass,  _contactNoOffice, _residence, _occupation,  _membershipType, _placeOfAssignment, _position, _monthlyBasicSalary, _avenueMonthlyTakeHomePay,  _totalMonthlyStatutoryDeductions, _totalMonthlyNonStatutoryDeductions, userRole):

        db = tasho.Database.open('./data/walletUser')
        tbl_user = db.table['walletUser']
        data = f'{walletAddr,_privateKey,_publicKey,_name, _coop,_address, _contact, _username, _pass, _rpass }{str(datetime.datetime.now())}'
        _hash = md5()
        _hash.update(data.encode())
        try:
            search = tbl_user.get(_username)
            if search is not None:

                return jsonify({'status': False})
            else:
                tbl_user.insert(_username, {'id': _hash.hexdigest(), 'privateKey': _privateKey, 'publicKey': _publicKey, 'walletAddress': walletAddr, 'fullName': _name, 'coopName': _coop, 'currentAddress': _address,
                                            'contactNum':  _contact, 'userName': _username, 'password': _pass,
                                            'contactNoOffice': _contactNoOffice, 'residence': _residence,
                                            'repeatPassword': _rpass,
                                            'membershipType': _membershipType,
                                            'occupation': _occupation,
                                            'placeOfAssignment': _placeOfAssignment, 'position': _position, 'monthlyBasicSalary': _monthlyBasicSalary, 'avenueMonthlyTakeHomePay': _avenueMonthlyTakeHomePay,  'totalMonthlyStatutoryDeductions': _totalMonthlyStatutoryDeductions, 'totalMonthlyNonStatutoryDeductions': _totalMonthlyNonStatutoryDeductions,
                                            'cooperativeID': cooperativeID,
                                            'userRole': userRole
                                            })

            return jsonify({'status': True})
        except:
            return jsonify({'status': False})

# checking user
    def checkUser(self, _user, _pass):

        db = tasho.Database.open('./data/walletUser')
        tbl_user = db.table['walletUser']
        search = tbl_user.get(_user)

        try:

            if search['userName'] is not None and search['password'] is not None:

                userData = search.dict
                return jsonify(userData)
            else:
                return "Failed"

        except:
            return 'FailedAgain'

    def changePassword(self, _checkusername, _npassword):
        db = tasho.Database.open('./data/walletUser')
        tbl_user = db.table['walletUser']
        search = tbl_user.get(_checkusername)
        try:
            if len(search['userName']) != 0:
                search['password'] = _npassword
                search.save()

                return "Success"

        except:
            return "Failed"
