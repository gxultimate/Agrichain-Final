from flask import Flask, request
from flask_socketio import SocketIO, send, emit
from time import sleep
from socketIO_client import SocketIO as socks_c, LoggingNamespace
import datetime
import json


def getTimeStamp():
    currentDT = datetime.datetime.now()
    return currentDT.strftime("%H:%M:00")


def getDateStamp():
    currentDT = datetime.datetime.now()
    return currentDT.strftime('%Y-%m-%d')


class Peer:

    def __init__(self):
        peerfile = open("peer_list.json", 'r')
        content = peerfile.read()
        peerList = json.loads(content)
        self.listOfInitialPeers = peerList
        self.listOfServers = []

# Connecting to Peers
    def connectToInitialPeers(self, ip, port, branch):
        for peer in self.listOfInitialPeers:
            # sleep(2)
            if ip != peer['ip'] or port != peer['port']:
                print(f"{getTimeStamp()} >> Connecting to {peer['branch']}")
                # sleep(2)
                try:
                    server = socks_c(
                        peer['ip'], peer['port'], LoggingNamespace, wait_for_connection=False)
                    print(f"{getTimeStamp()} >> Connected Successfully!")
                    self.addServer(server)

                    self.sendNodeDetails(server, ip, port, branch)
                    # sleep(1)
                except:
                    # sleep(1)
                    print(
                        f"{getTimeStamp()} >> Can't connect to {peer['branch']}")

# adding server on list
    def addServer(self, _server):
        self.listOfServers.append(_server)

# for handlemessage authentication
    def getServers(self):
        return self.listOfServers
# for reciprocate connection data

    def sendNodeDetails(self, server, ip, port, branch):
        server.send(f'%NODE%,{ip},{port},{branch}')

# reciprocate connection with other nodes
    def reciprocateConnection(self, ip, port, branch):
        sleep(3)
        try:
           
            server = socks_c(ip, port, LoggingNamespace,
                             wait_for_connection=False)
            print(f"{getTimeStamp()} >> Reciprocal Connection Successful!")
            self.addServer(server)
      
        except Exception as e:

          
            print(f"{getTimeStamp()} >> Can't connect to {branch}")
