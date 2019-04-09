from flask import Flask, request
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)


class WalletBalance(Resource):

    def get(self):
        return "walletBalance"

    def post(self):
        return "walletBalance"


class WalletTransaction(Resource):
    def get(self):
        return "walletBalance"

    def post(self):
        return "walletBalance"


if __name__ == "__main__":
    app.run(debug=True)
