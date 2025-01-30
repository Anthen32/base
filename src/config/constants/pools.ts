import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
    {
        sousId: 0,
        tokenName: 'USDC',
        stakingTokenName: QuoteToken.KYRIOS,
        stakingTokenAddress: '0xdbf8a44f447cf6fa300fa84c2aac381724b0c6dd',
        contractAddress: {
        250: '0x5fab8961b9627a62def14f39bb6c4f9ed3a05278',
        },
        poolCategory: PoolCategory.EARN,
        projectLink: 'https://info.spookyswap.finance/token/0x04068da6c83afcfa0e13ba15a6696662335d5b75',
        projectScan: 'https://ftmscan.com/address/0x5fab8961b9627a62def14f39bb6c4f9ed3a05278',
        harvest: true,
        tokenPerBlock: '1',
        sortOrder: 1,
         isFinished: false,
         tokenDecimals: 6,
         
      },
      {
        sousId: 0,
        tokenName: 'WFTM',
        stakingTokenName: QuoteToken.KYRIOS,
        stakingTokenAddress: '0xdbf8a44f447cf6fa300fa84c2aac381724b0c6dd',
        contractAddress: {
        250: '0x2a936b098201c3e17ab96916339f70c37b33efc4',
        },
        poolCategory: PoolCategory.EARN,
        projectLink: 'https://info.spookyswap.finance/token/0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
        projectScan: 'https://ftmscan.com/address/0x2a936b098201c3e17ab96916339f70c37b33efc4',
        harvest: true,
        tokenPerBlock: '1',
        sortOrder: 1,
         isFinished: false,
         tokenDecimals: 6,
         
      },
]

export default pools
