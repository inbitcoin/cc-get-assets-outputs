var assetIdencoder = require('cc-assetid-encoder')
var _ = require('lodash')

module.exports = function (raw_transaction) {
  var transaction_data = JSON.parse(JSON.stringify(raw_transaction))
  var ccdata = transaction_data.ccdata[0]
  var assets = []
  if (ccdata.type === 'issuance') {
    console.log('issuance !')
    var opts = {
      'cc_data': [{
        type: 'issuance',
        lockStatus: ccdata.lockStatus,
        divisibility: ccdata.divisibility,
        aggregationPolicy: ccdata.aggregationPolicy
      }],
      'vin': [{
        txid: transaction_data.vin[0].txid,
        vout: transaction_data.vin[0].vout
      }]
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
      lockStatus: ccdata.lockStatus,
      aggregationPolicy: ccdata.aggregationPolicy
    })
  }

  var payments = ccdata.payments
  if (!transfer(assets, payments, transaction_data)) {
    // transfer failed. transfer all assets in inputs to last output, aggregate those possible
    assets.length = 0
    raw_transaction.overflow = transaction_data.overflow
    transferToLastOutput(assets, transaction_data.vin, transaction_data.vout.length - 1)
  }

  return assets
}

// returns true if succeeds to apply payments to the given assets array, false if runs into an invalid payment
function transfer (assets, payments, transaction_data) {
  var _payments = _.cloneDeep(payments)
  var _inputs = _.cloneDeep(transaction_data.vin)
  var currentInputIndex = 0
  var currentAssetIndex = 0
  var payment
  var currentAsset
  var currentAmount
  for (var i = 0; i < _payments.length; i++) {
    payment = _payments[i]
    if (!isPaymentSimple(payment)) {
      return false
    }

    if (payment.input >= transaction_data.vin.length) {
      return false
    }

    if (payment.output >= transaction_data.vout.length) {
      return false
    }

    if (currentInputIndex < payment.input) {
      currentInputIndex = payment.input
      currentAssetIndex = 0
    }

    if (!_inputs[currentInputIndex].assets || !_inputs[currentInputIndex].assets || !_inputs[currentInputIndex].assets[currentAssetIndex]) {
      transaction_data.overflow = true
      return false
    }

    currentAsset = _inputs[currentInputIndex].assets[currentAssetIndex]
    currentAmount = Math.min(payment.amount, currentAsset.amount)

    assets[payment.output] = assets[payment.output] || []
    assets[payment.output].push({
      assetId: currentAsset.assetId,
      amount: currentAmount,
      issueTxid: currentAsset.issueTxid,
      divisibility: currentAsset.divisibility,
      lockStatus: currentAsset.lockStatus,
      aggregationPolicy: currentAsset.aggregationPolicy
    })
    currentAsset.amount -= currentAmount
    payment.amount -= currentAmount
    if (currentAsset.amount === 0) {
      currentAssetIndex++
    }

    if (payment.amount === 0) {
      continue
    }

    while (currentAssetIndex < _inputs[currentInputIndex].assets.length && payment.amount > 0) {
      currentAsset = _inputs[currentInputIndex].assets[currentAssetIndex]
      // check if THERE IS a next asset in assets array (in the same input OR the next one), and whether it is of the same assetId and aggregatable
      if (!currentAsset) {
        // no next asset in same input, try with the next input
        currentAssetIndex = 0
        currentInputIndex++
        continue
      }

      if (currentAsset.assetId !== _inputs[payment.input].assets[currentAssetIndex - 1].assetId ||
          currentAsset.aggregationPolicy !== 'aggregatable') {
        transaction_data.overflow = true
        return false
      }
      currentAmount = Math.min(payment.amount, currentAsset.amount)
      assets[payment.output][assets[payment.output].length - 1].amount += currentAmount
      currentAsset.amount -= currentAmount
      payment.amount -= currentAmount
      if (currentAsset.amount === 0) {
        currentAssetIndex++
      }
    }

    if (payment.amount > 0) {
      // did not satisfy payment
      transaction_data.overflow = true
      return false
    }
  }

  // finished paying explicit payments, transfer all assets with remaining amount from inputs to last output. aggregate if possible.
  transferToLastOutput(assets, _inputs, transaction_data.vout.length - 1)

  return true
}

// transfer all positive amount assets from inputs to last output. aggregate if possible.
function transferToLastOutput (assets, inputs, lastOutputIndex) {
  var assetsToTransfer = []
  inputs.forEach(function (input) {
    assetsToTransfer = _.concat(assetsToTransfer, input.assets)
  })
  var assetsIndexes = {}
  var lastOutputAssets = []
  assetsToTransfer.forEach(function (asset, index) {
    if (asset.aggregationPolicy === 'aggregatable' && (typeof assetsIndexes[asset.assetId] !== 'undefined')) {
      lastOutputAssets[assetsIndexes[asset.assetId]].amount += asset.amount
    } else if (asset.amount > 0) {
      if (typeof assetsIndexes[asset.assetId] === 'undefined') {
        assetsIndexes[asset.assetId] = lastOutputAssets.length
      }
      lastOutputAssets.push({
        assetId: asset.assetId,
        amount: asset.amount,
        issueTxid: asset.issueTxid,
        divisibility: asset.divisibility,
        lockStatus: asset.lockStatus,
        aggregationPolicy: asset.aggregationPolicy
      })
    }
  })

  assets[lastOutputIndex] = _.concat((assets[lastOutputIndex] || []), lastOutputAssets)
}

function isPaymentSimple (payment) {
  return (!payment.range && !payment.percent)
}
