/* eslint-env mocha */
var path = require('path')
var get_assets_outputs = require(path.join(__dirname, '../index.js'))
var assert = require('assert')

var issuanceTx = {
  'vin': [
    {
      'txid': '41f2d95cd99f7e60f207c65d9f7b286d45135cef77770335ea627d58ba22759a',
      'vout': 0,
      'assets': []
    },
    {
      'txid': '7ae25768d901a24d892bb68fb3eae9322858620d9664bb4afa84f5b68d2322ea',
      'vout': 0,
      'assets': []
    }
  ],
  'vout': [
    {
      'value': 3000,
      'n': 0
    },
    {
      'value': 0,
      'n': 1
    },
    {
      'value': 7000,
      'n': 2
    }
  ],
  'ccdata': [
    {
      'payments': [
        {
          'input': 0,
          'amount': 10,
          'output': 0,
          'range': false,
          'percent': false
        },
        {
          'input': 0,
          'amount': 6,
          'output': 0,
          'range': false,
          'percent': false
        },
        {
          'input': 0,
          'amount': 7,
          'output': 1,
          'range': false,
          'percent': false
        }
      ],
      'protocol': 17219,
      'version': 2,
      'type': 'issuance',
      'lockStatus': false,
      'aggregationPolicy': 'dispersed',
      'amount': 25,
      'multiSig': []
    }
  ]
}

var transferTx = {
  'vin': [
    {
      'txid': '41f2d95cd99f7e60f207c65d9f7b286d45135cef77770335ea627d58ba22759a',
      'vout': 0,
      'assets': [
        {
          'assetId': 'A',
          'amount': 10,
          'issueTxid': 'b7d00fcac7b5525c540b89b9e0829075b75f5b34a7a9608f49d743ce476bf6b6',
          'divisibility': 0,
          'lockStatus': false,
          'aggregationPolicy': 'aggregatable'
        },
        {
          'assetId': 'A',
          'amount': 5,
          'issueTxid': 'b7d00fcac7b5525c540b89b9e0829075b75f5b34a7a9608f49d743ce476bf6b6',
          'divisibility': 0,
          'lockStatus': false,
          'aggregationPolicy': 'aggregatable'
        }
      ]
    },
    {
      'txid': '7ae25768d901a24d892bb68fb3eae9322858620d9664bb4afa84f5b68d2322ea',
      'vout': 0,
      'assets': [
        {
          'assetId': 'A',
          'amount': 6,
          'issueTxid': 'b7d00fcac7b5525c540b89b9e0829075b75f5b34a7a9608f49d743ce476bf6b6',
          'divisibility': 0,
          'lockStatus': false,
          'aggregationPolicy': 'aggregatable'
        }
      ]
    }
  ],
  'vout': [
    {
      'value': 3000,
      'n': 0
    },
    {
      'value': 0,
      'n': 1
    },
    {
      'value': 7000,
      'n': 2
    }
  ],
  'ccdata': [
    {
      'payments': [
        {
          'input': 0,
          'amount': 10,
          'output': 0,
          'range': false,
          'percent': false
        },
        {
          'input': 0,
          'amount': 5,
          'output': 0,
          'range': false,
          'percent': false
        },
        {
          'input': 1,
          'amount': 4,
          'output': 2,
          'range': false,
          'percent': false
        }
      ],
      'protocol': 17219,
      'version': 1,
      'type': 'transfer',
      'multiSig': [
      ]
    }
  ]
}

it('Issuance - should transfer the correct amounts, split according to payments', function (done) {
  var res = get_assets_outputs(issuanceTx)
  console.log(JSON.stringify(res, null, 2))
  assert.equal(Array.isArray(res), true)
  assert.equal(res.length, 3)
  assert.equal(Array.isArray(res[0]), true)
  assert.equal(res[0].length, 2)
  assert.equal(res[0][0].amount, 10)
  assert.equal(res[0][1].amount, 6)
  assert.equal(Array.isArray(res[1]), true)
  assert.equal(res[1].length, 1)
  assert.equal(res[1][0].amount, 7)
  assert.equal(Array.isArray(res[2]), true)
  assert.equal(res[2].length, 1)
  assert.equal(res[2][0].amount, 2)
  done()
})

it('Issuance - should transfer entire amount to last output when overflow in total amount in payments', function (done) {
  issuanceTx.ccdata[0].payments = [
    {
      'input': 0,
      'amount': 100,
      'output': 0,
      'range': false,
      'percent': false
    }
  ]
  var res = get_assets_outputs(issuanceTx)
  console.log(JSON.stringify(res, null, 2))
  assert.equal(Array.isArray(res), true)
  assert.equal(res.length, 3)
  assert.equal(res[2].length, 1)
  assert.equal(res[2][0].amount, 25)
  assert.equal(issuanceTx.overflow, true)
  done()
})

it('Issuance - should transfer entire amount to last output there is overflow in total amount, even when first payments can be satisfied', function (done) {
  issuanceTx.ccdata[0].payments = [
    {
      'input': 0,
      'amount': 10,
      'output': 0,
      'range': false,
      'percent': false
    },
    {
      'input': 0,
      'amount': 90,
      'output': 0,
      'range': false,
      'percent': false
    }
  ]
  var res = get_assets_outputs(issuanceTx)
  console.log(JSON.stringify(res, null, 2))
  assert.equal(Array.isArray(res), true)
  assert.equal(res.length, 3)
  assert.equal(res[0], null)
  assert.equal(res[1], null)
  assert.equal(res[2].length, 1)
  assert.equal(res[2][0].amount, 25)
  done()
})

it('Transfer - should transfer the correct amounts, split according to payments (even when asset is aggregatable)', function (done) {
  var res = get_assets_outputs(transferTx)
  console.log(JSON.stringify(res, null, 2))
  assert.equal(Array.isArray(res), true)
  assert.equal(res.length, 3)
  assert.equal(res[0].length, 2)
  assert.equal(res[0][0].amount, 10)
  assert.equal(res[0][1].amount, 5)
  assert.equal(res[2].length, 2)
  assert.equal(res[2][0].amount, 4)
  assert.equal(res[2][1].amount, 2)
  done()
})

it('Transfer - should transfer the entire amount to last output, when there is an overflow in total amount. If assets are aggregatable - should aggregate them together.', function (done) {
  transferTx.ccdata[0].payments = [
    {
      'input': 0,
      'amount': 100,
      'output': 0,
      'range': false,
      'percent': false
    }
  ]
  var res = get_assets_outputs(transferTx)
  console.log(JSON.stringify(res, null, 2))
  assert.equal(Array.isArray(res), true)
  assert.equal(res.length, 3)
  assert.equal(Array.isArray(res[2]), true)
  assert.equal(res[2].length, 1)
  assert.equal(res[2][0].amount, 21)
  assert.equal(issuanceTx.overflow, true)
  done()
})

it('Transfer - should transfer correct amounts, when there is an overflow to the same aggregatable assetId asset with a different input', function (done) {
  transferTx.ccdata[0].payments = [
    {
      'input': 0,
      'amount': 10,
      'output': 0,
      'range': false,
      'percent': false
    },
    {
      'input': 0,
      'amount': 10, // that's an overflow, but to the same aggregatable asset-id within the next input
      'output': 2,
      'range': false,
      'percent': false
    }
  ]
  var res = get_assets_outputs(transferTx)
  console.log(JSON.stringify(res, null, 2))
  assert.equal(Array.isArray(res), true)
  assert.equal(res.length, 3)
  assert.equal(Array.isArray(res[0]), true)
  assert.equal(res[0].length, 1)
  assert.equal(res[0][0].amount, 10)
  assert.equal(Array.isArray(res[2]), true)
  assert.equal(res[2].length, 2)
  assert.equal(res[2][0].amount, 10) // aggregate
  assert.equal(res[2][1].amount, 1)  // change - we keep it separated because we respect the payment
  done()
})

it('Transfer - should transfer correct amounts, when there is an overflow to the same aggregatable assetId asset within the same input', function (done) {
  transferTx.ccdata[0].payments = [
    {
      'input': 0,
      'amount': 13, // that's an overflow, but to the same aggregatable asset-id within the same input
      'output': 0,
      'range': false,
      'percent': false
    },
    {
      'input': 0,
      'amount': 2,
      'output': 2,
      'range': false,
      'percent': false
    },
    {
      'input': 1,
      'amount': 5,
      'output': 2,
      'range': false,
      'percent': false
    }
  ]
  var res = get_assets_outputs(transferTx)
  console.log(JSON.stringify(res, null, 2))
  assert.equal(Array.isArray(res), true)
  assert.equal(res.length, 3)
  assert.equal(Array.isArray(res[0]), true)
  assert.equal(res[0].length, 1)
  assert.equal(res[0][0].amount, 13)
  assert.equal(Array.isArray(res[2]), true)
  assert.equal(res[2].length, 3)
  assert.equal(res[2][0].amount, 2)
  assert.equal(res[2][1].amount, 5)
  assert.equal(res[2][2].amount, 1)  // change - we keep it separated because we respect the payment
  done()
})

it('Transfer - should transfer the entire amount to last output, when there is an overflow in total amount. If assets are NOT aggregatable - should keep them separated.', function (done) {
  transferTx.ccdata[0].payments = [
    {
      'input': 0,
      'amount': 100,
      'output': 0,
      'range': false,
      'percent': false
    }
  ]
  transferTx.vin.forEach(function (vin) {
    vin.assets.forEach(function (asset) {
      asset.aggregationPolicy = 'dispersed'
    })
  })
  var res = get_assets_outputs(transferTx)
  console.log(JSON.stringify(res, null, 2))
  assert.equal(Array.isArray(res), true)
  assert.equal(res.length, 3)
  assert.equal(Array.isArray(res[2]), true)
  assert.equal(res[2].length, 3)
  assert.equal(res[2][0].amount, 10)
  assert.equal(res[2][1].amount, 5)
  assert.equal(res[2][2].amount, 6)
  done()
})

it('Transfer - should transfer the entire amount to last output, when there is an overflow to another asset which is not aggregatable with the previous asset.', function (done) {
  transferTx.ccdata[0].payments = [
    {
      'input': 0,
      'amount': 13, // that's an overflow
      'output': 0,
      'range': false,
      'percent': false
    },
    {
      'input': 0,
      'amount': 2,
      'output': 2,
      'range': false,
      'percent': false
    },
    {
      'input': 1,
      'amount': 6,
      'output': 2,
      'range': false,
      'percent': false
    }
  ]
  var res = get_assets_outputs(transferTx)
  console.log(JSON.stringify(res, null, 2))
  assert.equal(transferTx.overflow, true)
  assert.equal(Array.isArray(res), true)
  assert.equal(res.length, 3)
  assert.equal(Array.isArray(res[2]), true)
  assert.equal(res[2].length, 3)
  assert.equal(res[2][0].amount, 10)
  assert.equal(res[2][1].amount, 5)
  assert.equal(res[2][2].amount, 6)
  done()
})

it('Transfer - should not have overflow with payment with amount 0', function (done) {
  transferTx.ccdata[0].payments = [
    {
      'input': 0,
      'amount': 10,
      'output': 0,
      'range': false,
      'percent': false
    },
    {
      'input': 0,
      'amount': 5,
      'output': 2,
      'range': false,
      'percent': false
    },
    {
      'input': 1,
      'amount': 6,
      'output': 2,
      'range': false,
      'percent': false
    },
    {
      'input': 1,
      'amount': 0,
      'output': 2,
      'range': false,
      'percent': false
    }
  ]
  var res = get_assets_outputs(transferTx)
  console.log(JSON.stringify(res, null, 2))
  assert.equal(transferTx.overflow, false)
  assert.equal(Array.isArray(res), true)
  assert.equal(res.length, 3)
  assert.equal(Array.isArray(res[0]), true)
  assert.equal(res[0].length, 1)
  assert.equal(res[0][0].amount, 10)
  assert.equal(Array.isArray(res[2]), true)
  assert.equal(res[2].length, 2)
  assert.equal(res[2][0].amount, 5)
  assert.equal(res[2][1].amount, 6)
  done()
})

it('Transfer - should transfer entire amount to last output when there is a payment to a non existing output', function (done) {
  transferTx.ccdata[0].payments = [
    {
      'input': 0,
      'amount': 10,
      'output': 0,
      'range': false,
      'percent': false
    },
    {
      'input': 0,
      'amount': 5,
      'output': 2,
      'range': false,
      'percent': false
    },
    {
      'input': 1,
      'amount': 6,
      'output': 2,
      'range': false,
      'percent': false
    },
    {
      'input': 1,
      'amount': 0,
      'output': 3,
      'range': false,
      'percent': false
    }
  ]
  var res = get_assets_outputs(transferTx)
  console.log(JSON.stringify(res, null, 2))
  assert.equal(transferTx.overflow, true)
  assert.equal(Array.isArray(res), true)
  assert.equal(res.length, 3)
  assert.equal(Array.isArray(res[2]), true)
  assert.equal(res[2].length, 3)
  assert.equal(res[2][0].amount, 10)
  assert.equal(res[2][1].amount, 5)
  assert.equal(res[2][2].amount, 6)
  done()
})

it('Transfer - should transfer remaining amounts to last output', function (done) {
  var tx = {
    'vin': [
      {
        'txid': '41f2d95cd99f7e60f207c65d9f7b286d45135cef77770335ea627d58ba22759a',
        'vout': 0,
        'assets': [
          {
            'assetId': 'A',
            'amount': 10,
            'issueTxid': 'b7d00fcac7b5525c540b89b9e0829075b75f5b34a7a9608f49d743ce476bf6b6',
            'divisibility': 0,
            'lockStatus': false,
            'aggregationPolicy': 'aggregatable'
          }
        ]
      },
      {
        'txid': 'ebb435529b45d9843d17ce61f95002ad675da9d2cef708dd2f858de47f7fb236',
        'vout': 0,
        'assets': [
          {
            'assetId': 'B',
            'amount': 5,
            'issueTxid': '63522845d294ee9b0188ae5cac91bf389a0c3723f084ca1025e7d9cdfe481ce1',
            'divisibility': 0,
            'lockStatus': false,
            'aggregationPolicy': 'aggregatable'
          }
        ]
      },
      {
        'txid': '7ae25768d901a24d892bb68fb3eae9322858620d9664bb4afa84f5b68d2322ea',
        'vout': 0,
        'assets': [
          {
            'assetId': 'C',
            'amount': 6,
            'issueTxid': 'e79fc1dad370e628614702f048edc8e98829cf8ea8f6615db19f992b1be92e44',
            'divisibility': 0,
            'lockStatus': false,
            'aggregationPolicy': 'aggregatable'
          }
        ]
      }
    ],
    'vout': [
      {
        'value': 3000,
        'n': 0
      },
      {
        'value': 0,
        'n': 1
      },
      {
        'value': 7000,
        'n': 2
      }
    ],
    'ccdata': [
      {
        'payments': [
          {
            'input': 0,
            'amount': 0,
            'output': 0,
            'range': false,
            'percent': false
          },
          {
            'input': 1,
            'amount': 0,
            'output': 0,
            'range': false,
            'percent': false
          },
          {
            'input': 2,
            'amount': 4,
            'output': 0,
            'range': false,
            'percent': false
          }
        ],
        'protocol': 17219,
        'version': 1,
        'type': 'transfer',
        'multiSig': [
        ]
      }
    ]
  }
  var res = get_assets_outputs(tx)
  console.log(JSON.stringify(res, null, 2))
  assert.equal(tx.overflow, false)
  assert.equal(Array.isArray(res), true)
  assert.equal(res.length, 3)
  assert.equal(Array.isArray(res[0]), true)
  assert.equal(res[0].length, 1)
  assert.equal(res[0][0].amount, 4)
  assert.equal(Array.isArray(res[2]), true)
  assert.equal(res[2].length, 3)
  assert.equal(res[2][0].amount, 10)
  assert.equal(res[2][0].assetId, 'A')
  assert.equal(res[2][1].amount, 5)
  assert.equal(res[2][1].assetId, 'B')
  assert.equal(res[2][2].amount, 2)
  assert.equal(res[2][2].assetId, 'C')
  done()
})
