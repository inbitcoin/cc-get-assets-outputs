/* eslint-env mocha */
var path = require('path')
var get_assets_outputs = require(path.join(__dirname, '../index.js'))
var assert = require('assert')

var issuanceTx = {
  'hex': '010000000a9a7522ba587d62ea35037777ef5c13456d287b9f5dc607f2607e9fd95cd9f24100000000fc0047304402203898c91af2ef07206ee8242054b9e423ae2c5dd3854372fefda3252937343662022071ee4b1f4ca507ecf1b0bf0eb5753668a7d239a798ee01732c4070c24f394e1d01473044022035bf8d952c173f6484e822a1f2b26dc70848d67c520a3d586b0cfd092480cd7e0220212cc711330495ceeb366cc04b28cb00453c68ce81e9972e57a7fa522f799527014c69522103f03db1c1869f64f21726371a76020dec22cf7b4d1de3d134df5d7101b9e4cbd92103457e2638d26b7e2abca0c016a7fd63389a51b89b1b128acecb4d2ba232c8a6762102a8de9bd8da4d3d3382a818139c17c549fe36c91552a182cf605ee68c0c31bfdb53aeffffffffea22238db6f584fa4abb64960d62582832e9eab38fb62b894da201d96857e27a00000000fdfe00004830450221009a6bdc30ba2aa0e62eb1a462876a2ecb3e7dd72fb8ef1fb1c3beb0c56050c1640220631dbd3ebad7036a283f68630d126d01ae4765fcaa877c78f8dc35754d0800480148304502210093e19611e41d5827514586dab57d6f610476fa814f9b8ea631ae82da662ea27b02205dbd4c9b086a46a8d643595d1c285d6c0b59705b33cb64dac7735421c5fda0e0014c69522103f03db1c1869f64f21726371a76020dec22cf7b4d1de3d134df5d7101b9e4cbd92103457e2638d26b7e2abca0c016a7fd63389a51b89b1b128acecb4d2ba232c8a6762102a8de9bd8da4d3d3382a818139c17c549fe36c91552a182cf605ee68c0c31bfdb53aeffffffff26d29e0a1d8484cbf706d4e395f0b42211ef18ea68540d5e2bb0e96fe464723600000000fdfe0000483045022100886d62824b9ebdf0bf9fa446bd197dea45f4f5dc4ad9fd1cce0666d287210321022007297009b8902101d1839bac42ec0a2ac3343d908789bfacb205f29fef336fe601483045022100c19efba41cfe459e0f1677994f4dc8b4d21107d655f37ad0c38d8ac5a1d35a5d02204a09e8876e2f74089c6d2a8161edd223e1f9ba716b14509b86f05b3976b4f84a014c69522103f03db1c1869f64f21726371a76020dec22cf7b4d1de3d134df5d7101b9e4cbd92103457e2638d26b7e2abca0c016a7fd63389a51b89b1b128acecb4d2ba232c8a6762102a8de9bd8da4d3d3382a818139c17c549fe36c91552a182cf605ee68c0c31bfdb53aeffffffff13bf14bf25141263d5ca48203e23d5828f8b0b777a92c0d4655337fc1bf1547000000000fdfd00004730440220224ca533c0b55915931130bc0c6c02379ea8595ff59a714d963199488a8c74e202204489f4c3ae85f93a2583edae946c3c73c7e0e6c90c30ca203818d2b00bfe26bb01483045022100e86e4effe022433b193a062893d1aea54972c2c93a717e8a91ddabe4f570fa7002201c95004130a15529925c0f29ee444ffa7ea6de66f0d2f2406466c0ea337295be014c69522103f03db1c1869f64f21726371a76020dec22cf7b4d1de3d134df5d7101b9e4cbd92103457e2638d26b7e2abca0c016a7fd63389a51b89b1b128acecb4d2ba232c8a6762102a8de9bd8da4d3d3382a818139c17c549fe36c91552a182cf605ee68c0c31bfdb53aeffffffffce2536eefff2f4a6e4559e0d76c86c93bb85166eb3f9d3ab6a4a3787f1a4d74400000000fdfe0000483045022100d400b7ed580321e96060ab31a53f290ea2178c090f53e86e4106b22fdc82b4ee022021de977b6d61852d554d7ac318f57b07c7708f68b95d3a498bb5fa5b3ea0cc7a01483045022100f0c4e68cee21fdca11a0531bb8837e0f938a7aea6369abeb11235572d4ffd8f10220222d00f14c70805e0d4a7da3428948ef83cf8c03e2e428e3d8a1b85829972704014c69522103f03db1c1869f64f21726371a76020dec22cf7b4d1de3d134df5d7101b9e4cbd92103457e2638d26b7e2abca0c016a7fd63389a51b89b1b128acecb4d2ba232c8a6762102a8de9bd8da4d3d3382a818139c17c549fe36c91552a182cf605ee68c0c31bfdb53aeffffffff8b19d5bc4d859270e5401db2b06a79741d88748d9f9572d8e98bb7ab6e95b31d00000000fc004730440220013c30d2675c41698df4d450fc72b7d762dd7e6620589f4bfae0e70b1bf36ba702203bb08cff3dc4133e9baaa6af6c31fbc53508e9de217b0f269bff32c96883aa090147304402201defc085af74a48b79646450f8d7c57d8e01b03f0b7357225617b625d4a48c5a02200636e0704a395a280930b57a3c66a274fb11e4703287146f8a4d283d7a7d88e4014c69522103f03db1c1869f64f21726371a76020dec22cf7b4d1de3d134df5d7101b9e4cbd92103457e2638d26b7e2abca0c016a7fd63389a51b89b1b128acecb4d2ba232c8a6762102a8de9bd8da4d3d3382a818139c17c549fe36c91552a182cf605ee68c0c31bfdb53aefffffffffc662e086f2c6a5dab817ff8d7c22bfa4c80a3b86461b5099e5a919c94d5223a00000000fdfe0000483045022100819cb2794ff0d4352f4dfcb4235aede345c54056a18d44d3926c08a393b5513902207de180b94223a2f4098ec676cd3a3cc37aa0dc67251f5ce68e1cdc819835c1fa0148304502210093ae5cd27eec0aa349f8e9363f679d8e438ea653d46ee17b0a06f699db5abcf802200511018d6dd2958b8c52b29dc32d363caad1bc8c799eea4372cde798fb0b93ee014c69522103f03db1c1869f64f21726371a76020dec22cf7b4d1de3d134df5d7101b9e4cbd92103457e2638d26b7e2abca0c016a7fd63389a51b89b1b128acecb4d2ba232c8a6762102a8de9bd8da4d3d3382a818139c17c549fe36c91552a182cf605ee68c0c31bfdb53aefffffffff947846c87ce44b3aa9c20cbd87ac8cb90d09c838858ec86bf6675df1b480a9800000000fc00463043022029ceb783827e69eec01b3f4a9801a940f60f48e64d530a7073026a1a3980b87b021f2ce5497fe80119a6a329863ddfd0599ad7fbbfe01165bde548912bf8147c0c01483045022100a835fb1ef0177253aec639af57f00453e63d0ff59c15d406f30d91e6b4fd34e802207546255d48a5b078778ad662b0bd98551b51f1f8fe04a564c901c6e67ea55e89014c69522103f03db1c1869f64f21726371a76020dec22cf7b4d1de3d134df5d7101b9e4cbd92103457e2638d26b7e2abca0c016a7fd63389a51b89b1b128acecb4d2ba232c8a6762102a8de9bd8da4d3d3382a818139c17c549fe36c91552a182cf605ee68c0c31bfdb53aeffffffff3165892b61279c02af41abbdfc24190e7b07a8ce7f34ab444c523b415c7c3e8800000000fdfd00004730440220178db71447e23e649dcc79b13d58c8870f654e2450a3630ed5d777efb2865a5402204858728494b18f22e67911f98eb1161161328fe49337b73d6ecd53e72e8a14b001483045022100c4ff109a9a2a13bfff89db297d060e9a446a81632d84cc50eaf1e629006a2cfc02206847cfa8ac5dfd46b6978de63582573e2eea1c41f147743d43cac685b2a03153014c69522103f03db1c1869f64f21726371a76020dec22cf7b4d1de3d134df5d7101b9e4cbd92103457e2638d26b7e2abca0c016a7fd63389a51b89b1b128acecb4d2ba232c8a6762102a8de9bd8da4d3d3382a818139c17c549fe36c91552a182cf605ee68c0c31bfdb53aeffffffff6e94a60a411079007ffa999bcb7a86d578f4f276c78faa8be74229556c082f6c00000000fdfe0000483045022100f89e4bb79c0b4edff44cd1f63ffddc81b1fc91daf072380fb7fd215c0c9e0e8002205d1ce303a595230601a772c317f4be14871f287c954387cf48615a88a9dad4c2014830450221009ba94db659e003f57820066773bba1cb1d6b22fcb0299f1574d23770b2ec51d5022023d77aa3e9c11d945bb2cc39ac987613fb2be85c0a40ffd23318dae845b88171014c69522103f03db1c1869f64f21726371a76020dec22cf7b4d1de3d134df5d7101b9e4cbd92103457e2638d26b7e2abca0c016a7fd63389a51b89b1b128acecb4d2ba232c8a6762102a8de9bd8da4d3d3382a818139c17c549fe36c91552a182cf605ee68c0c31bfdb53aeffffffff03b80b00000000000017a914027ef0e2a14e64c697ac0b1680de04af59129e9a870000000000000000206a1e43430115802051800d800a80201280262080201280205380018020220001581b00000000000017a914fa135b738fa62e20890c6e90e70193c909774a898700000000',
  'txid': 'bb661ac5d48702490487532980eb7020e10972db1ab0bc2d6a5631dcaaeefaa4',
  'version': 1,
  'vin': [
    {
      'txid': '41f2d95cd99f7e60f207c65d9f7b286d45135cef77770335ea627d58ba22759a',
      'vout': 0,
      'previousOutput': {
        'asm': 'OP_DUP OP_HASH160 5424f10f899beb7de612babe7f00fbbd192368eb OP_EQUALVERIFY OP_CHECKSIG',
        'hex': '76a9145424f10f899beb7de612babe7f00fbbd192368eb88ac',
        'reqSigs': 1,
        'type': 'pubkeyhash',
        'addresses': [
          'moBsJvCvPBhXLTESWzEptxFfufGi6R79p6'
        ]
      },
      'assets': [],
      'value': 3000,
      'fixed': true
    },
    {
      'txid': '7ae25768d901a24d892bb68fb3eae9322858620d9664bb4afa84f5b68d2322ea',
      'vout': 0,
      'assets': [],
      'value': 3000,
      'fixed': true
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
  'blockheight': 402564,
  'colored': true,
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
  'hex': '010000000a9a7522ba587d62ea35037777ef5c13456d287b9f5dc607f2607e9fd95cd9f24100000000fc0047304402203898c91af2ef07206ee8242054b9e423ae2c5dd3854372fefda3252937343662022071ee4b1f4ca507ecf1b0bf0eb5753668a7d239a798ee01732c4070c24f394e1d01473044022035bf8d952c173f6484e822a1f2b26dc70848d67c520a3d586b0cfd092480cd7e0220212cc711330495ceeb366cc04b28cb00453c68ce81e9972e57a7fa522f799527014c69522103f03db1c1869f64f21726371a76020dec22cf7b4d1de3d134df5d7101b9e4cbd92103457e2638d26b7e2abca0c016a7fd63389a51b89b1b128acecb4d2ba232c8a6762102a8de9bd8da4d3d3382a818139c17c549fe36c91552a182cf605ee68c0c31bfdb53aeffffffffea22238db6f584fa4abb64960d62582832e9eab38fb62b894da201d96857e27a00000000fdfe00004830450221009a6bdc30ba2aa0e62eb1a462876a2ecb3e7dd72fb8ef1fb1c3beb0c56050c1640220631dbd3ebad7036a283f68630d126d01ae4765fcaa877c78f8dc35754d0800480148304502210093e19611e41d5827514586dab57d6f610476fa814f9b8ea631ae82da662ea27b02205dbd4c9b086a46a8d643595d1c285d6c0b59705b33cb64dac7735421c5fda0e0014c69522103f03db1c1869f64f21726371a76020dec22cf7b4d1de3d134df5d7101b9e4cbd92103457e2638d26b7e2abca0c016a7fd63389a51b89b1b128acecb4d2ba232c8a6762102a8de9bd8da4d3d3382a818139c17c549fe36c91552a182cf605ee68c0c31bfdb53aeffffffff26d29e0a1d8484cbf706d4e395f0b42211ef18ea68540d5e2bb0e96fe464723600000000fdfe0000483045022100886d62824b9ebdf0bf9fa446bd197dea45f4f5dc4ad9fd1cce0666d287210321022007297009b8902101d1839bac42ec0a2ac3343d908789bfacb205f29fef336fe601483045022100c19efba41cfe459e0f1677994f4dc8b4d21107d655f37ad0c38d8ac5a1d35a5d02204a09e8876e2f74089c6d2a8161edd223e1f9ba716b14509b86f05b3976b4f84a014c69522103f03db1c1869f64f21726371a76020dec22cf7b4d1de3d134df5d7101b9e4cbd92103457e2638d26b7e2abca0c016a7fd63389a51b89b1b128acecb4d2ba232c8a6762102a8de9bd8da4d3d3382a818139c17c549fe36c91552a182cf605ee68c0c31bfdb53aeffffffff13bf14bf25141263d5ca48203e23d5828f8b0b777a92c0d4655337fc1bf1547000000000fdfd00004730440220224ca533c0b55915931130bc0c6c02379ea8595ff59a714d963199488a8c74e202204489f4c3ae85f93a2583edae946c3c73c7e0e6c90c30ca203818d2b00bfe26bb01483045022100e86e4effe022433b193a062893d1aea54972c2c93a717e8a91ddabe4f570fa7002201c95004130a15529925c0f29ee444ffa7ea6de66f0d2f2406466c0ea337295be014c69522103f03db1c1869f64f21726371a76020dec22cf7b4d1de3d134df5d7101b9e4cbd92103457e2638d26b7e2abca0c016a7fd63389a51b89b1b128acecb4d2ba232c8a6762102a8de9bd8da4d3d3382a818139c17c549fe36c91552a182cf605ee68c0c31bfdb53aeffffffffce2536eefff2f4a6e4559e0d76c86c93bb85166eb3f9d3ab6a4a3787f1a4d74400000000fdfe0000483045022100d400b7ed580321e96060ab31a53f290ea2178c090f53e86e4106b22fdc82b4ee022021de977b6d61852d554d7ac318f57b07c7708f68b95d3a498bb5fa5b3ea0cc7a01483045022100f0c4e68cee21fdca11a0531bb8837e0f938a7aea6369abeb11235572d4ffd8f10220222d00f14c70805e0d4a7da3428948ef83cf8c03e2e428e3d8a1b85829972704014c69522103f03db1c1869f64f21726371a76020dec22cf7b4d1de3d134df5d7101b9e4cbd92103457e2638d26b7e2abca0c016a7fd63389a51b89b1b128acecb4d2ba232c8a6762102a8de9bd8da4d3d3382a818139c17c549fe36c91552a182cf605ee68c0c31bfdb53aeffffffff8b19d5bc4d859270e5401db2b06a79741d88748d9f9572d8e98bb7ab6e95b31d00000000fc004730440220013c30d2675c41698df4d450fc72b7d762dd7e6620589f4bfae0e70b1bf36ba702203bb08cff3dc4133e9baaa6af6c31fbc53508e9de217b0f269bff32c96883aa090147304402201defc085af74a48b79646450f8d7c57d8e01b03f0b7357225617b625d4a48c5a02200636e0704a395a280930b57a3c66a274fb11e4703287146f8a4d283d7a7d88e4014c69522103f03db1c1869f64f21726371a76020dec22cf7b4d1de3d134df5d7101b9e4cbd92103457e2638d26b7e2abca0c016a7fd63389a51b89b1b128acecb4d2ba232c8a6762102a8de9bd8da4d3d3382a818139c17c549fe36c91552a182cf605ee68c0c31bfdb53aefffffffffc662e086f2c6a5dab817ff8d7c22bfa4c80a3b86461b5099e5a919c94d5223a00000000fdfe0000483045022100819cb2794ff0d4352f4dfcb4235aede345c54056a18d44d3926c08a393b5513902207de180b94223a2f4098ec676cd3a3cc37aa0dc67251f5ce68e1cdc819835c1fa0148304502210093ae5cd27eec0aa349f8e9363f679d8e438ea653d46ee17b0a06f699db5abcf802200511018d6dd2958b8c52b29dc32d363caad1bc8c799eea4372cde798fb0b93ee014c69522103f03db1c1869f64f21726371a76020dec22cf7b4d1de3d134df5d7101b9e4cbd92103457e2638d26b7e2abca0c016a7fd63389a51b89b1b128acecb4d2ba232c8a6762102a8de9bd8da4d3d3382a818139c17c549fe36c91552a182cf605ee68c0c31bfdb53aefffffffff947846c87ce44b3aa9c20cbd87ac8cb90d09c838858ec86bf6675df1b480a9800000000fc00463043022029ceb783827e69eec01b3f4a9801a940f60f48e64d530a7073026a1a3980b87b021f2ce5497fe80119a6a329863ddfd0599ad7fbbfe01165bde548912bf8147c0c01483045022100a835fb1ef0177253aec639af57f00453e63d0ff59c15d406f30d91e6b4fd34e802207546255d48a5b078778ad662b0bd98551b51f1f8fe04a564c901c6e67ea55e89014c69522103f03db1c1869f64f21726371a76020dec22cf7b4d1de3d134df5d7101b9e4cbd92103457e2638d26b7e2abca0c016a7fd63389a51b89b1b128acecb4d2ba232c8a6762102a8de9bd8da4d3d3382a818139c17c549fe36c91552a182cf605ee68c0c31bfdb53aeffffffff3165892b61279c02af41abbdfc24190e7b07a8ce7f34ab444c523b415c7c3e8800000000fdfd00004730440220178db71447e23e649dcc79b13d58c8870f654e2450a3630ed5d777efb2865a5402204858728494b18f22e67911f98eb1161161328fe49337b73d6ecd53e72e8a14b001483045022100c4ff109a9a2a13bfff89db297d060e9a446a81632d84cc50eaf1e629006a2cfc02206847cfa8ac5dfd46b6978de63582573e2eea1c41f147743d43cac685b2a03153014c69522103f03db1c1869f64f21726371a76020dec22cf7b4d1de3d134df5d7101b9e4cbd92103457e2638d26b7e2abca0c016a7fd63389a51b89b1b128acecb4d2ba232c8a6762102a8de9bd8da4d3d3382a818139c17c549fe36c91552a182cf605ee68c0c31bfdb53aeffffffff6e94a60a411079007ffa999bcb7a86d578f4f276c78faa8be74229556c082f6c00000000fdfe0000483045022100f89e4bb79c0b4edff44cd1f63ffddc81b1fc91daf072380fb7fd215c0c9e0e8002205d1ce303a595230601a772c317f4be14871f287c954387cf48615a88a9dad4c2014830450221009ba94db659e003f57820066773bba1cb1d6b22fcb0299f1574d23770b2ec51d5022023d77aa3e9c11d945bb2cc39ac987613fb2be85c0a40ffd23318dae845b88171014c69522103f03db1c1869f64f21726371a76020dec22cf7b4d1de3d134df5d7101b9e4cbd92103457e2638d26b7e2abca0c016a7fd63389a51b89b1b128acecb4d2ba232c8a6762102a8de9bd8da4d3d3382a818139c17c549fe36c91552a182cf605ee68c0c31bfdb53aeffffffff03b80b00000000000017a914027ef0e2a14e64c697ac0b1680de04af59129e9a870000000000000000206a1e43430115802051800d800a80201280262080201280205380018020220001581b00000000000017a914fa135b738fa62e20890c6e90e70193c909774a898700000000',
  'txid': 'bb661ac5d48702490487532980eb7020e10972db1ab0bc2d6a5631dcaaeefaa4',
  'version': 1,
  'vin': [
    {
      'txid': '41f2d95cd99f7e60f207c65d9f7b286d45135cef77770335ea627d58ba22759a',
      'vout': 0,
      'assets': [
        {
          'assetId': 'UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          'amount': 10,
          'issueTxid': 'b7d00fcac7b5525c540b89b9e0829075b75f5b34a7a9608f49d743ce476bf6b6',
          'divisibility': 0,
          'lockStatus': false,
          'aggregationPolicy': 'aggregatable'
        },
        {
          'assetId': 'UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          'amount': 5,
          'issueTxid': 'b7d00fcac7b5525c540b89b9e0829075b75f5b34a7a9608f49d743ce476bf6b6',
          'divisibility': 0,
          'lockStatus': false,
          'aggregationPolicy': 'aggregatable'
        }
      ],
      'value': 3000,
      'fixed': true
    },
    {
      'txid': '7ae25768d901a24d892bb68fb3eae9322858620d9664bb4afa84f5b68d2322ea',
      'vout': 0,
      'assets': [
        {
          'assetId': 'UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          'amount': 6,
          'issueTxid': 'b7d00fcac7b5525c540b89b9e0829075b75f5b34a7a9608f49d743ce476bf6b6',
          'divisibility': 0,
          'lockStatus': false,
          'aggregationPolicy': 'aggregatable'
        }
      ],
      'value': 3000,
      'fixed': true
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
  'blockheight': 402564,
  'colored': true,
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

it('Transfer - should transfer the entire amount to last output, when there is an overflow in total amount. If assets are NOT aggregatable - should keep them separated.', function (done) {
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
  transferTx.payments = [
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
  assert.equal(Array.isArray(res), true)
  assert.equal(res.length, 3)
  assert.equal(Array.isArray(res[2]), true)
  assert.equal(res[2].length, 3)
  assert.equal(res[2][0].amount, 10)
  assert.equal(res[2][1].amount, 5)
  assert.equal(res[2][2].amount, 6)
  done()
})

