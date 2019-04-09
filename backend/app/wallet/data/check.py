from tinydb import TinyDB, Query, where
import sys

db = TinyDB('userWallets.dat')

# print(db.all())
print(db.search(where('username') == 'Luminous13'))
# print(sys.path)