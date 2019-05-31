import datetime
import calendar
from flask import json, jsonify


def getDateStamp():
    currentDT = datetime.datetime.now()
    return currentDT.strftime('%Y,%m,%d')


def convertPercentage(input):
    return float(input.strip("%"))/100


def listToStringWithoutBrackets(list1):
    return str(list1).replace('[', "").replace(']', "")


class LoanCalculator:

    # parsedTermOfLoan = input("term: ")
    # parsedInitialAmount = input("initial amount: ")
    # parsedAmountToPay = input("amount to pay: ")
    # parsedBalancePayment = float(parsedInitialAmount) - float(parsedAmountToPay)
    # parsedInterests = input("interest: ")

    def getAmortization(_self, _parsedTermOfLoan, _parsedInitialAmount, parsedInterests, parsedCooperativeID):

        threeMonth = "3 months"
        sixMonth = "6 months"
        oneYears = "1 year"
        twoYear = "2 year"
        parsedTermOfLoan = listToStringWithoutBrackets(
            _parsedTermOfLoan)
        parsedThreeMonths = listToStringWithoutBrackets(
            threeMonth)

        parsedInterest = convertPercentage(parsedInterests)

        parsedInitialAmount = int(_parsedInitialAmount)

        threeMonths = 3
        sixMonths = 6
        oneYear = 12
        twoYears = 24
        dt = datetime.datetime.now()

        newDate = dt.date()

        addedDate = calendar.monthrange(newDate.year, newDate.month)[1]
        dueDate = []
        totalBalance = []
        totalInterest = []
        totalPrincipal = []

#
        if str(parsedTermOfLoan[1:-1]) == str(threeMonth):

            if 100000 <= int(parsedInitialAmount) >= 80000:

                for i in range(3):
                    dueDate.append(
                        newDate + datetime.timedelta(days=addedDate+addedDate*i))
                topCompute = parsedInterest * \
                    ((1 + parsedInterest) ** threeMonths)
                bottomCompute = ((1 + parsedInterest)**threeMonths - 1)
                totalCompute = topCompute/bottomCompute
                paymentPerMonth = float(parsedInitialAmount) * totalCompute

                totalBalance.append(
                    (float(parsedInitialAmount)-float(paymentPerMonth)))
                for x in range(threeMonths-2):
                    totalBalance.append(
                        (totalBalance[x] - float(paymentPerMonth)))

                totalInterest.append(
                    float(parsedInitialAmount) * parsedInterest)
                for x in range(threeMonths-1):
                    totalInterest.append((totalBalance[x] * parsedInterest))

                for x in range(threeMonths):
                    totalPrincipal.append(paymentPerMonth - totalInterest[x])
                amortization = {'dueDate': dueDate, 'balance': totalBalance,
                        'interest': totalInterest, 'principal': totalPrincipal, 'coopID': parsedCooperativeID}
                return json.dumps(amortization)

            elif 79000 <= int(parsedInitialAmount) >= 50000:
                print("wow")
                for i in range(3):
                    dueDate.append(
                        newDate + datetime.timedelta(days=addedDate+addedDate*i))
                topCompute = parsedInterest * \
                    ((1 + parsedInterest) ** threeMonths)
                bottomCompute = ((1 + parsedInterest)**threeMonths - 1)
                totalCompute = topCompute/bottomCompute
                paymentPerMonth = float(parsedInitialAmount) * totalCompute

                totalBalance.append(
                    (float(parsedInitialAmount)-float(paymentPerMonth)))
                for x in range(threeMonths-2):
                    totalBalance.append(
                        (totalBalance[x] - float(paymentPerMonth)))

                totalInterest.append(
                    float(parsedInitialAmount) * parsedInterest)
                for x in range(threeMonths-1):
                    totalInterest.append((totalBalance[x] * parsedInterest))

                for x in range(threeMonths):
                    totalPrincipal.append(paymentPerMonth - totalInterest[x])
                    amortization = {'dueDate': dueDate, 'balance': totalBalance,
                        'interest': totalInterest, 'principal': totalPrincipal, 'coopID': parsedCooperativeID}
                return json.dumps(amortization)

            elif 49000 <= int(parsedInitialAmount) >= 30000:

                for i in range(threeMonths):
                    dueDate.append(
                        newDate + datetime.timedelta(days=addedDate+addedDate*i))
                topCompute = parsedInterest * \
                    ((1 + parsedInterest) ** threeMonths)
                bottomCompute = ((1 + parsedInterest)**threeMonths - 1)
                totalCompute = topCompute/bottomCompute
                paymentPerMonth = float(parsedInitialAmount) * totalCompute

                totalBalance.append(
                    (float(parsedInitialAmount)-float(paymentPerMonth)))
                for x in range(threeMonths-2):
                    totalBalance.append(
                        (totalBalance[x] - float(paymentPerMonth)))

                totalInterest.append(
                    float(parsedInitialAmount) * parsedInterest)
                for x in range(threeMonths-1):
                    totalInterest.append((totalBalance[x] * parsedInterest))

                for x in range(threeMonths):
                    totalPrincipal.append(paymentPerMonth - totalInterest[x])
                mortization = {'dueDate': dueDate, 'balance': totalBalance,
                        'interest': totalInterest, 'principal': totalPrincipal, 'coopID': parsedCooperativeID}
                return json.dumps(amortization)

            elif 29000 <= int(parsedInitialAmount) >= 10000:

                for i in range(threeMonths):
                    dueDate.append(
                        newDate + datetime.timedelta(days=addedDate+addedDate*i))
                topCompute = parsedInterest * \
                    ((1 + parsedInterest) ** threeMonths)
                bottomCompute = ((1 + parsedInterest)**threeMonths - 1)
                totalCompute = topCompute/bottomCompute
                paymentPerMonth = float(parsedInitialAmount) * totalCompute

                totalBalance.append(
                    (float(parsedInitialAmount)-float(paymentPerMonth)))
                for x in range(threeMonths-2):
                    totalBalance.append(
                        (totalBalance[x] - float(paymentPerMonth)))

                totalInterest.append(
                    float(parsedInitialAmount) * parsedInterest)
                for x in range(threeMonths-1):
                    totalInterest.append((totalBalance[x] * parsedInterest))

                for x in range(threeMonths):
                    totalPrincipal.append(paymentPerMonth - totalInterest[x])
                amortization = {'dueDate': dueDate, 'balance': totalBalance,
                        'interest': totalInterest, 'principal': totalPrincipal, 'coopID': parsedCooperativeID}
                return json.dumps(amortization)

            elif 9000 <= int(parsedInitialAmount) >= 100:

                for i in range(threeMonths):
                    dueDate.append(
                        newDate + datetime.timedelta(days=addedDate+addedDate*i))
                topCompute = parsedInterest * \
                    ((1 + parsedInterest) ** threeMonths)
                bottomCompute = ((1 + parsedInterest)**threeMonths - 1)
                totalCompute = topCompute/bottomCompute
                paymentPerMonth = float(parsedInitialAmount) * totalCompute

                totalBalance.append(
                    (float(parsedInitialAmount)-float(paymentPerMonth)))

                for x in range(threeMonths-2):
                    totalBalance.append(
                        (totalBalance[x] - float(paymentPerMonth)))

                totalInterest.append(
                    float(parsedInitialAmount) * parsedInterest)
                for x in range(threeMonths-1):
                    totalInterest.append((totalBalance[x] * parsedInterest))

                for x in range(threeMonths):
                    totalPrincipal.append(paymentPerMonth - totalInterest[x])

                amortization = {'dueDate': dueDate, 'balance': totalBalance,
                        'interest': totalInterest, 'principal': totalPrincipal, 'coopID': parsedCooperativeID}
                return json.dumps(amortization)

        elif(str(parsedTermOfLoan[1:-1]) == str(sixMonth)):
            parsedInterest = convertPercentage(parsedInterests)
            if 100000 <= int(parsedInitialAmount) >= 80000:
                for i in range(sixMonths):
                    dueDate.append(
                        newDate + datetime.timedelta(days=addedDate+addedDate*i))
                topCompute = parsedInterest * \
                    ((1 + parsedInterest) ** sixMonths)
                bottomCompute = ((1 + parsedInterest)**sixMonths - 1)
                totalCompute = topCompute/bottomCompute
                paymentPerMonth = float(parsedInitialAmount) * totalCompute

                totalBalance.append(
                    (float(parsedInitialAmount)-float(paymentPerMonth)))
                for x in range(sixMonths-2):
                    totalBalance.append(
                        (totalBalance[x] - float(paymentPerMonth)))

                totalInterest.append(
                    float(parsedInitialAmount) * parsedInterest)
                for x in range(sixMonths-1):
                    totalInterest.append((totalBalance[x] * parsedInterest))

                for x in range(sixMonths):
                    totalPrincipal.append(paymentPerMonth - totalInterest[x])
                amortization = {'dueDate': dueDate, 'balance': totalBalance,
                        'interest': totalInterest, 'principal': totalPrincipal, 'coopID': parsedCooperativeID}
                return json.dumps(amortization)
            elif 79000 <= int(parsedInitialAmount) >= 50000:
                for i in range(sixMonths):
                    dueDate.append(
                        newDate + datetime.timedelta(days=addedDate+addedDate*i))
                topCompute = parsedInterest * \
                    ((1 + parsedInterest) ** sixMonths)
                bottomCompute = ((1 + parsedInterest)**sixMonths - 1)
                totalCompute = topCompute/bottomCompute
                paymentPerMonth = float(parsedInitialAmount) * totalCompute

                totalBalance.append(
                    (float(parsedInitialAmount)-float(paymentPerMonth)))
                for x in range(sixMonths):
                    totalBalance.append(
                        (totalBalance[x] - float(paymentPerMonth)))

                totalInterest.append(
                    float(parsedInitialAmount) * parsedInterest)
                for x in range(sixMonths-1):
                    totalInterest.append((totalBalance[x] * parsedInterest))

                for x in range(sixMonths):
                    totalPrincipal.append(paymentPerMonth - totalInterest[x])
                amortization = {'dueDate': dueDate, 'balance': totalBalance,
                        'interest': totalInterest, 'principal': totalPrincipal, 'coopID': parsedCooperativeID}
                return json.dumps(amortization)

            elif 49000 <= int(parsedInitialAmount) >= 30000:
                for i in range(sixMonths):
                    dueDate.append(
                        newDate + datetime.timedelta(days=addedDate+addedDate*i))
                topCompute = parsedInterest * \
                    ((1 + parsedInterest) ** sixMonths)
                bottomCompute = ((1 + parsedInterest)**sixMonths - 1)
                totalCompute = topCompute/bottomCompute
                paymentPerMonth = float(parsedInitialAmount) * totalCompute

                totalBalance.append(
                    (float(parsedInitialAmount)-float(paymentPerMonth)))
                for x in range(sixMonths-2):
                    totalBalance.append(
                        (totalBalance[x] - float(paymentPerMonth)))

                totalInterest.append(
                    float(parsedInitialAmount) * parsedInterest)
                for x in range(sixMonths-1):
                    totalInterest.append((totalBalance[x] * parsedInterest))

                for x in range(sixMonths):
                    totalPrincipal.append(paymentPerMonth - totalInterest[x])

                amortization = {'dueDate': dueDate, 'balance': totalBalance,
                        'interest': totalInterest, 'principal': totalPrincipal, 'coopID': parsedCooperativeID}
                return json.dumps(amortization)

            elif 29000 <= int(parsedInitialAmount) >= 10000:
                for i in range(sixMonths):
                    dueDate.append(
                        newDate + datetime.timedelta(days=addedDate+addedDate*i))
                topCompute = parsedInterest * \
                    ((1 + parsedInterest) ** sixMonths)
                bottomCompute = ((1 + parsedInterest)**sixMonths - 1)
                totalCompute = topCompute/bottomCompute
                paymentPerMonth = float(parsedInitialAmount) * totalCompute

                totalBalance.append(
                    (float(parsedInitialAmount)-float(paymentPerMonth)))
                for x in range(sixMonths):
                    totalBalance.append(
                        (totalBalance[x] - float(paymentPerMonth)))

                totalInterest.append(
                    float(parsedInitialAmount) * parsedInterest)
                for x in range(sixMonths-1):
                    totalInterest.append((totalBalance[x] * parsedInterest))

                for x in range(sixMonths):
                    totalPrincipal.append(paymentPerMonth - totalInterest[x])
                amortization = {'dueDate': dueDate, 'balance': totalBalance,
                        'interest': totalInterest, 'principal': totalPrincipal , 'coopID': parsedCooperativeID}
                return json.dumps(amortization)

            elif 9000 <= int(parsedInitialAmount) >= 100:
                for i in range(sixMonths):
                    dueDate.append(
                        newDate + datetime.timedelta(days=addedDate+addedDate*i))

                topCompute = parsedInterest * ((1 + parsedInterest) ** sixMonths)
                bottomCompute = ((1 + parsedInterest)**sixMonths - 1)
                totalCompute = topCompute/bottomCompute
                paymentPerMonth = float(parsedInitialAmount) * totalCompute

                totalBalance.append(
                    (float(parsedInitialAmount)-float(paymentPerMonth)))

                for x in range(sixMonths):
                    totalBalance.append((totalBalance[x] - float(paymentPerMonth)))

                totalInterest.append(float(parsedInitialAmount) * parsedInterest)
                for x in range(sixMonths-1):
                    totalInterest.append((totalBalance[x] * parsedInterest))

                for x in range(sixMonths):
                    totalPrincipal.append(paymentPerMonth - totalInterest[x])

                amortization = {'dueDate': dueDate, 'balance': totalBalance,
                        'interest': totalInterest, 'principal': totalPrincipal , 'coopID': parsedCooperativeID}
                return json.dumps(amortization)

        elif str(parsedTermOfLoan[1:-1]) == str(oneYears):
            parsedInterest = convertPercentage(parsedInterests)
            if 100000 <= int(parsedInitialAmount) >= 8000:
                for i in range(oneYear):
                    dueDate.append(
                        newDate + datetime.timedelta(days=addedDate+addedDate*i))
                topCompute = parsedInterest * ((1 + parsedInterest) ** oneYear)
                bottomCompute = ((1 + parsedInterest)**oneYear - 1)
                totalCompute = topCompute/bottomCompute
                paymentPerMonth = float(parsedInitialAmount) * totalCompute

                totalBalance.append(
                    (float(parsedInitialAmount)-float(paymentPerMonth)))
                for x in range(oneYear-2):
                    totalBalance.append((totalBalance[x] - float(paymentPerMonth)))

                totalInterest.append(float(parsedInitialAmount) * parsedInterest)
                for x in range(oneYear-1):
                    totalInterest.append((totalBalance[x] * parsedInterest))

                for x in range(oneYear):
                    totalPrincipal.append(paymentPerMonth - totalInterest[x])
                amortization = {'dueDate': dueDate, 'balance': totalBalance,
                        'interest': totalInterest, 'principal': totalPrincipal , 'coopID': parsedCooperativeID}
                return json.dumps(amortization)
            elif 79000 <= int(parsedInitialAmount) >= 50000:
                for i in range(oneYear):
                    dueDate.append(
                        newDate + datetime.timedelta(days=addedDate+addedDate*i))
                topCompute = parsedInterest * ((1 + parsedInterest) ** oneYear)
                bottomCompute = ((1 + parsedInterest)**oneYear - 1)
                totalCompute = topCompute/bottomCompute
                paymentPerMonth = float(parsedInitialAmount) * totalCompute

                totalBalance.append(
                    (float(parsedInitialAmount)-float(paymentPerMonth)))
                for x in range(oneYear):
                    totalBalance.append((totalBalance[x] - float(paymentPerMonth)))

                totalInterest.append(float(parsedInitialAmount) * parsedInterest)
                for x in range(oneYear-1):
                    totalInterest.append((totalBalance[x] * parsedInterest))

                for x in range(oneYear):
                    totalPrincipal.append(paymentPerMonth - totalInterest[x])
                amortization = {'dueDate': dueDate, 'balance': totalBalance,
                        'interest': totalInterest, 'principal': totalPrincipal , 'coopID': parsedCooperativeID}
                return json.dumps(amortization)

            elif 49000 <= int(parsedInitialAmount) >= 30000:
                for i in range(oneYear):
                    dueDate.append(
                        newDate + datetime.timedelta(days=addedDate+addedDate*i))
                topCompute = parsedInterest * ((1 + parsedInterest) ** oneYear)
                bottomCompute = ((1 + parsedInterest)**oneYear - 1)
                totalCompute = topCompute/bottomCompute
                paymentPerMonth = float(parsedInitialAmount) * totalCompute

                totalBalance.append(
                    (float(parsedInitialAmount)-float(paymentPerMonth)))
                for x in range(oneYear-2):
                    totalBalance.append((totalBalance[x] - float(paymentPerMonth)))

                totalInterest.append(float(parsedInitialAmount) * parsedInterest)
                for x in range(oneYear-1):
                    totalInterest.append((totalBalance[x] * parsedInterest))

                for x in range(oneYear):
                    totalPrincipal.append(paymentPerMonth - totalInterest[x])
                amortization = {'dueDate': dueDate, 'balance': totalBalance,
                        'interest': totalInterest, 'principal': totalPrincipal , 'coopID': parsedCooperativeID}
                return json.dumps(amortization)


            elif 29000 <= int(parsedInitialAmount) >= 10000:
                for i in range(oneYear):
                    dueDate.append(
                        newDate + datetime.timedelta(days=addedDate+addedDate*i))
                topCompute = parsedInterest * ((1 + parsedInterest) ** oneYear)
                bottomCompute = ((1 + parsedInterest)**oneYear - 1)
                totalCompute = topCompute/bottomCompute
                paymentPerMonth = float(parsedInitialAmount) * totalCompute

                totalBalance.append(
                    (float(parsedInitialAmount)-float(paymentPerMonth)))
                for x in range(oneYear):
                    totalBalance.append((totalBalance[x] - float(paymentPerMonth)))

                totalInterest.append(float(parsedInitialAmount) * parsedInterest)
                for x in range(oneYear-1):
                    totalInterest.append((totalBalance[x] * parsedInterest))

                for x in range(oneYear):
                    totalPrincipal.append(paymentPerMonth - totalInterest[x])
                mortization = {'dueDate': dueDate, 'balance': totalBalance,
                        'interest': totalInterest, 'principal': totalPrincipal , 'coopID': parsedCooperativeID}
                return json.dumps(amortization)

            elif 9000 <= int(parsedInitialAmount) >= 100:
                for i in range(oneYear):
                    dueDate.append(
                        newDate + datetime.timedelta(days=addedDate+addedDate*i))

                topCompute = parsedInterest * ((1 + parsedInterest) ** oneYear)
                bottomCompute = ((1 + parsedInterest)**oneYear - 1)
                totalCompute = topCompute/bottomCompute
                paymentPerMonth = float(parsedInitialAmount) * totalCompute

                totalBalance.append(
                    (float(parsedInitialAmount)-float(paymentPerMonth)))

                for x in range(oneYear):
                    totalBalance.append((totalBalance[x] - float(paymentPerMonth)))

                totalInterest.append(float(parsedInitialAmount) * parsedInterest)
                for x in range(oneYear-1):
                    totalInterest.append((totalBalance[x] * parsedInterest))

                for x in range(oneYear):
                    totalPrincipal.append(paymentPerMonth - totalInterest[x])

                amortization = {'dueDate': dueDate, 'balance': totalBalance,
                        'interest': totalInterest, 'principal': totalPrincipal , 'coopID': parsedCooperativeID}
                return json.dumps(amortization)

        elif str(parsedTermOfLoan[1:-1]) == str(twoYear):
            parsedInterest = convertPercentage(parsedInterests)
            if 100000 <= int(parsedInitialAmount) >= 8000:
                for i in range(twoYears):
                    dueDate.append(
                        newDate + datetime.timedelta(days=addedDate+addedDate*i))
                topCompute = parsedInterest * ((1 + parsedInterest) ** twoYears)
                bottomCompute = ((1 + parsedInterest)**twoYears - 1)
                totalCompute = topCompute/bottomCompute
                paymentPerMonth = float(parsedInitialAmount) * totalCompute

                totalBalance.append(
                    (float(parsedInitialAmount)-float(paymentPerMonth)))
                for x in range(twoYears-2):
                    totalBalance.append((totalBalance[x] - float(paymentPerMonth)))

                totalInterest.append(float(parsedInitialAmount) * parsedInterest)
                for x in range(twoYears-1):
                    totalInterest.append((totalBalance[x] * parsedInterest))

                for x in range(twoYears):
                    totalPrincipal.append(paymentPerMonth - totalInterest[x])
                amortization = {'dueDate': dueDate, 'balance': totalBalance,
                        'interest': totalInterest, 'principal': totalPrincipal , 'coopID': parsedCooperativeID}
                return json.dumps(amortization)

            elif 79000 <= int(parsedInitialAmount) >= 50000:
                for i in range(twoYears):
                    dueDate.append(
                        newDate + datetime.timedelta(days=addedDate+addedDate*i))
                topCompute = parsedInterest * ((1 + parsedInterest) ** twoYears)
                bottomCompute = ((1 + parsedInterest)**twoYears - 1)
                totalCompute = topCompute/bottomCompute
                paymentPerMonth = float(parsedInitialAmount) * totalCompute

                totalBalance.append(
                    (float(parsedInitialAmount)-float(paymentPerMonth)))
                for x in range(twoYears):
                    totalBalance.append((totalBalance[x] - float(paymentPerMonth)))

                totalInterest.append(float(parsedInitialAmount) * parsedInterest)
                for x in range(twoYears-1):
                    totalInterest.append((totalBalance[x] * parsedInterest))

                for x in range(twoYears):
                    totalPrincipal.append(paymentPerMonth - totalInterest[x])
                amortization = {'dueDate': dueDate, 'balance': totalBalance,
                        'interest': totalInterest, 'principal': totalPrincipal , 'coopID': parsedCooperativeID}
                return json.dumps(amortization)


            elif 49000 <= int(parsedInitialAmount) >= 30000:
                for i in range(twoYears):
                    dueDate.append(
                        newDate + datetime.timedelta(days=addedDate+addedDate*i))
                topCompute = parsedInterest * ((1 + parsedInterest) ** twoYears)
                bottomCompute = ((1 + parsedInterest)**twoYears - 1)
                totalCompute = topCompute/bottomCompute
                paymentPerMonth = float(parsedInitialAmount) * totalCompute

                totalBalance.append(
                    (float(parsedInitialAmount)-float(paymentPerMonth)))
                for x in range(twoYears-2):
                    totalBalance.append((totalBalance[x] - float(paymentPerMonth)))

                totalInterest.append(float(parsedInitialAmount) * parsedInterest)
                for x in range(twoYears-1):
                    totalInterest.append((totalBalance[x] * parsedInterest))

                for x in range(twoYears):
                    totalPrincipal.append(paymentPerMonth - totalInterest[x])
                amortization = {'dueDate': dueDate, 'balance': totalBalance,
                        'interest': totalInterest, 'principal': totalPrincipal , 'coopID': parsedCooperativeID}
                return json.dumps(amortization)


            elif 29000 <= int(parsedInitialAmount) >= 10000:
                for i in range(twoYears):
                    dueDate.append(
                        newDate + datetime.timedelta(days=addedDate+addedDate*i))
                topCompute = parsedInterest * ((1 + parsedInterest) ** twoYears)
                bottomCompute = ((1 + parsedInterest)**twoYears - 1)
                totalCompute = topCompute/bottomCompute
                paymentPerMonth = float(parsedInitialAmount) * totalCompute

                totalBalance.append(
                    (float(parsedInitialAmount)-float(paymentPerMonth)))
                for x in range(twoYears):
                    totalBalance.append((totalBalance[x] - float(paymentPerMonth)))

                totalInterest.append(float(parsedInitialAmount) * parsedInterest)
                for x in range(twoYears-1):
                    totalInterest.append((totalBalance[x] * parsedInterest))

                for x in range(twoYears):
                    totalPrincipal.append(paymentPerMonth - totalInterest[x])
                amortization = {'dueDate': dueDate, 'balance': totalBalance,
                        'interest': totalInterest, 'principal': totalPrincipal , 'coopID': parsedCooperativeID}
                return json.dumps(amortization)


            elif 9000 <= int(parsedInitialAmount) >= 100:
                for i in range(twoYears):
                    dueDate.append(
                        newDate + datetime.timedelta(days=addedDate+addedDate*i))

                topCompute = parsedInterest * ((1 + parsedInterest) ** twoYears)
                bottomCompute = ((1 + parsedInterest)**twoYears - 1)
                totalCompute = topCompute/bottomCompute
                paymentPerMonth = float(parsedInitialAmount) * totalCompute

                totalBalance.append(
                    (float(parsedInitialAmount)-float(paymentPerMonth)))

                for x in range(twoYears):
                    totalBalance.append((totalBalance[x] - float(paymentPerMonth)))

                totalInterest.append(float(parsedInitialAmount) * parsedInterest)
                for x in range(twoYears-1):
                    totalInterest.append((totalBalance[x] * parsedInterest))

                for x in range(twoYears):
                    totalPrincipal.append(paymentPerMonth - totalInterest[x])
                amortization = {'dueDate': dueDate, 'balance': totalBalance,
                        'interest': totalInterest, 'principal': totalPrincipal , 'coopID': parsedCooperativeID}
                return json.dumps(amortization)

