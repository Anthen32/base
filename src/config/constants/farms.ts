import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'KYRIOS / USDC',
    decimals: 18,
    otherExchange: 'SpookySwap',
    lpAddresses: {
      250: '0x2AC4490F3584BBe9d4A88E2b848c50602Dc3125c',
    },
    tokenSymbol: 'KYRIOS',
    tokenAddresses: {
      250: '0xdbf8a44f447cf6fa300fa84c2aac381724b0c6dd',
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'KYRIOS / FTM',
    decimals: 18,
    otherExchange: 'SpookySwap',
    lpAddresses: {
      250: '0x2a70115f335757234D6bf8aCb763a2A32ff1fE2f',
    },
    tokenSymbol: 'WFTM',
    tokenAddresses: {
      250: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
    },
    quoteTokenSymbol: QuoteToken.KYRIOS,
    quoteTokenAdresses: contracts.cake,
  },
  {
    pid: 2,
    risk: 5,
    lpSymbol: 'WETH / FTM',
    decimals: 18,
    otherExchange: 'SpookySwap',
    lpAddresses: {
      250: '0xf0702249f4d3a25cd3ded7859a165693685ab577',
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      250: '0x74b23882a30290451A17c44f4F05243b6b58C76d',
    },
    quoteTokenSymbol: QuoteToken.WFTM,
    quoteTokenAdresses: contracts.wftm,
  },
  {
    pid: 3,
    risk: 5,
    lpSymbol: 'USDC / FTM',
    decimals: 18,
    otherExchange: 'SpookySwap',
    lpAddresses: {
      250: '0x2b4c76d0dc16be1c31d4c1dc53bf9b45987fc75c',
    },
    tokenSymbol: 'WFTM',
    tokenAddresses: {
      250: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },
  {
    pid: 4,
    risk: 2,
    lpSymbol: 'LINK / FTM',
    otherExchange: 'SpookySwap',
    decimals: 18,
    lpAddresses: {
      250: '0x89d9bc2f2d091cfbfc31e333d6dc555ddbc2fd29',
    },
    tokenSymbol: 'LINK',
    tokenAddresses: {
      250: '0xb3654dc3d10ea7645f8319668e8f54d2574fbdc8',
    },
    quoteTokenSymbol: QuoteToken.WFTM,
    quoteTokenAdresses: contracts.wftm,
  },
  {
    pid: 5,
    risk: 5,
    lpSymbol: 'BOO / FTM',
    decimals: 18,
    otherExchange: 'SpookySwap',
    lpAddresses: {
      250: '0xec7178f4c41f346b2721907f5cf7628e388a7a58',
    },
    tokenSymbol: 'BOO',
    tokenAddresses: {
      250: '0x841fad6eae12c286d1fd18d1d525dffa75c7effe',
    },
    quoteTokenSymbol: QuoteToken.WFTM,
    quoteTokenAdresses: contracts.wftm,
  },
  {
    pid: 6,
    risk: 5,
    lpSymbol: 'WBTC / FTM',
    otherExchange: 'SpookySwap',
    decimals: 18,
    lpAddresses: {
      250: '0xfdb9ab8b9513ad9e419cf19530fee49d412c3ee3',
    },
    tokenSymbol: 'WBTC',
    tokenAddresses: {
      250: '0x321162Cd933E2Be498Cd2267a90534A804051b11',
    },
    quoteTokenSymbol: QuoteToken.WFTM,
    quoteTokenAdresses: contracts.wftm,
  },
  {
    pid: 7,
    risk: 2,
    lpSymbol: 'DAI / FTM',
    otherExchange: 'SpookySwap',
    decimals: 18,
    lpAddresses: {
      250: '0xe120ffbda0d14f3bb6d6053e90e63c572a66a428',
    },
    tokenSymbol: 'DAI',
    tokenAddresses: {
      250: '0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e',
    },
    quoteTokenSymbol: QuoteToken.WFTM,
    quoteTokenAdresses: contracts.wftm,
  },
  {
    pid: 8,
    risk: 2,
    lpSymbol: 'USDT / FTM',
    otherExchange: 'SpookySwap',
    decimals: 18,
    lpAddresses: {
      250: '0x5965e53aa80a0bcf1cd6dbdd72e6a9b2aa047410',
    },
    tokenSymbol: 'USDT',
    tokenAddresses: {
      250: '0x049d68029688eabf473097a2fc38ef61633a3c7a',
    },
    quoteTokenSymbol: QuoteToken.WFTM,
    quoteTokenAdresses: contracts.wftm,
  },

  // POOLS




  {
    pid: 9,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'KYRIOS',
    decimals: 18,
    otherExchange: 'SpookySwap',
    lpAddresses: {
      250: '0x2AC4490F3584BBe9d4A88E2b848c50602Dc3125c', // USDC POOL
    },
    tokenSymbol: 'KYRIOS',
    tokenAddresses: {
      250: '0xdbf8a44f447cf6fa300fa84c2aac381724b0c6dd',
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },
  {
    pid: 10,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'WFTM',
    decimals: 18,
    otherExchange: 'SpookySwap',
    lpAddresses: {
      250: '0x2b4c76d0dc16be1c31d4c1dc53bf9b45987fc75c', // WFTM-USDC
    },
    tokenSymbol: 'WFTM',
    tokenAddresses: {
      250: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83', // WFTM CONTRACT
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },
  {
    pid: 11,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'TOMB',
    decimals: 18,
    otherExchange: 'SpookySwap',
    lpAddresses: {
      250: '0x596ad49f6da172be82286441bae6111848eea050', // WFTM-USDC
    },
    tokenSymbol: 'TOMB',
    tokenAddresses: {
      250: '0x6c021ae822bea943b2e66552bde1d2696a53fbb7', // CONTRACT
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },
  {
    pid: 12,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'TSHARE',
    decimals: 18,
    otherExchange: 'SpookySwap',
    lpAddresses: {
      250: '0x2fb6f65cbf624aa06207ef93c881bd61f9f9c6c9', // WFTM-USDC
    },
    tokenSymbol: 'TSHARE',
    tokenAddresses: {
      250: '0x4cdf39285d7ca8eb3f090fda0c069ba5f4145b37', // CONTRACT
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },
  {
    pid: 13,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'MIM',
    otherExchange: 'SpookySwap',
    decimals: 8,
    lpAddresses: {
      250: '0x3c9ad6268065e425085f11ab8ea803973be6bcf3', // LP-USDC
    },
    tokenSymbol: 'MIM',
    tokenAddresses: {
      250: '0x82f0b8b456c1a451378467398982d4834b6829c1', //  CONTRACT
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },
  {
    pid: 14,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'ETH',
    otherExchange: 'SpookySwap',
    decimals: 18,
    lpAddresses: {
      250: '0xa572bdf049382f1f98f9a430788dadd51a303969', // WETH-USDC
    },
    tokenSymbol: 'WETH',
    tokenAddresses: {
      250: '0x74b23882a30290451A17c44f4F05243b6b58C76d', // WETH CONTRACT
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },
  {
    pid: 15,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'BOO',
    decimals: 18,
    otherExchange: 'SpookySwap',
    lpAddresses: {
      250: '0xf8cb2980120469d79958151daa45eb937c6e1ed6', // WFTM-USDC
    },
    tokenSymbol: 'BOO',
    tokenAddresses: {
      250: '0x841fad6eae12c286d1fd18d1d525dffa75c7effe', // WFTM CONTRACT
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },
  {
    pid: 16,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'DAI',
    otherExchange: 'SpookySwap',
    decimals: 18,
    lpAddresses: {
      250: '0x484237bc35cA671302d19694c66d617142FBC235', // DAI-USDC
    },
    tokenSymbol: 'DAI',
    tokenAddresses: {
      250: '0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e', // DAI CONTRACT
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },
  {
    pid: 17,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'BTC',
    otherExchange: 'SpookySwap',
    decimals: 8,
    lpAddresses: {
      250: '0xd92206379bd8203ac38225af006bb96bf1f12412', // LP-USDC
    },
    tokenSymbol: 'WBTC',
    tokenAddresses: {
      250: '0x321162cd933e2be498cd2267a90534a804051b11', //  CONTRACT
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },
  {
    pid: 18,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'USDT',
    otherExchange: 'SpookySwap',
    decimals: 8,
    lpAddresses: {
      250: '0xfdef392adc84607135c24ca45de5452d77aa10de', // LP-USDC
    },
    tokenSymbol: 'USDT',
    tokenAddresses: {
      250: '0x049d68029688eabf473097a2fc38ef61633a3c7a', //  CONTRACT
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },
  {
    pid: 19,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'USDC',
    otherExchange: 'SpookySwap',
    decimals: 6,
    lpAddresses: {
      250: '0x2b4c76d0dc16be1c31d4c1dc53bf9b45987fc75c', // LP-USDC
    },
    tokenSymbol: 'USDC',
    tokenAddresses: {
      250: '0x04068da6c83afcfa0e13ba15a6696662335d5b75', //  CONTRACT
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },
]



export default farms
