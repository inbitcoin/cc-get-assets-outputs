var assetIdencoder = require('cc-assetid-encoder')

module.exports = function (raw_transaction) {
  var transaction_data = JSON.parse(JSON.stringify(raw_transaction))
  var ccdata = transaction_data.ccdata[0]
  var assets = []
  // var issuedassetid = null
  /*var encodeItem = { assetid: 0, iputindex: 0, amountleft: 0 }*/
  // is it an issuece
  var empty_issuance = ccdata.type === 'issuance' && !ccdata.amount
  if (ccdata.type === 'issuance') {
    // logger.debug('issuance!')
    var opts = {
      'cc_data': [{
        type: 'issuance',
        lockStatus: ccdata.lockStatus,
        divisibility: ccdata.divisibility
      }],
      'vin': [{'txid': transaction_data.vin[0].txid, 'vout': transaction_data.vin[0].vout }]
    }
    if (!opts.cc_data[0].lockStatus) {
      opts.vin[0].address = transaction_data.vin[0].previousOutput.addresses[0]
    }
    transaction_data.vin[0].assets = transaction_data.vin[0].assets || []
    transaction_data.vin[0].assets.unshift({
      assetId: assetIdencoder(opts),
      amount: ccdata.amount,
      issueTxid: transaction_data.txid,
      divisibility: ccdata.divisibility,
      lockStatus: ccdata.lockStatus && ccdata.noRules
    })
    // console.log(transaction_data.vin[0].assets)
  }

  var paymentIndex = 0
  transaction_data.vin.forEach(function (prevOutput, currentIndex) {
    var overflow = 0
    prevOutput.assets = prevOutput.assets || []
    prevOutput.assets.forEach(function (asset, assetIndex) {
      var currentAmount = 0
      var currentPayment = {}

      // console.log(paymentIndex + " < " + ccdata.payments.length + " "  )
      for (var i = paymentIndex;
        i < ccdata.payments.length
        && (currentAmount <= asset.amount)
        && ccdata.payments[i].input <= currentIndex; paymentIndex++, i++) {
        currentPayment = ccdata.payments[i]
        var actualAmount = overflow ? overflow : currentPayment.amount
        overflow = 0
        // console.log("checking for asset with amount at: " + currentPayment.output + "  " + currentPayment.amount)
        if (isPaymentSimple(currentPayment)) {
          // console.log("paymet is simple")
          if (isInOutputsScope(currentPayment.output, transaction_data.vout)) {
            // console.log("output in scope")
            if (!assets[currentPayment.output]) assets[currentPayment.output] = []
            // console.log("found and asset with amount at: " + currentPayment.output + "  " +actualAmount)

            // console.log(ccdata.payments)
            assets[currentPayment.output].push({
              assetId: asset.assetId,
              amount: (actualAmount + currentAmount > asset.amount) ? (asset.amount - currentAmount) : actualAmount,
              issueTxid: asset.issueTxid,
              divisibility: asset.divisibility,
              lockStatus: asset.lockStatus
            })
            currentAmount += actualAmount
          }
        } else if (isPaymentRange(currentPayment)) {
          // currentPayment.output
        }
      }
      // check leftovers and throw them to the last aoutput
      if (currentAmount < asset.amount) {
        // console.log("found change ")
        if (isPaymentSimple(currentPayment)) {
          if (!assets[transaction_data.vout.length - 1]) { // put chnage in last output
            assets[transaction_data.vout.length - 1] = []
          }
          assets[transaction_data.vout.length - 1].push({
            assetId: asset.assetId,
            amount: asset.amount - currentAmount,
            issueTxid: asset.issueTxid,
            divisibility: asset.divisibility,
            lockStatus: asset.lockStatus
          })
        }
      }
   // set overflow so we take the next asset if we need to
      if (currentAmount > asset.amount) {
        overflow = currentAmount - asset.amount
        paymentIndex--
      }
      else overflow = 0
    })
    if (overflow) {
      raw_transaction.overflow = true
    }
  }) // prev_outputs.forEach
  assets = assets.map(function (output_assets) {
    return output_assets.filter(function (asset) { return asset.amount > 0 || empty_issuance})
  })
  return assets
}

function isPaymentSimple (payment) {
  return (!payment.range && !payment.percent)
}

function isPaymentRange (payment) {
  return payment.range
}

function isInOutputsScope (i, vout) {
  return i <= vout.length - 1
}
