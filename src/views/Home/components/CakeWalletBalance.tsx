import React from 'react'
import { Text, Flex } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceCakeBusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'


const CakeWalletBalance = () => {
  const TranslateString = useI18n()
  const cakeBalance = useTokenBalance(getCakeAddress())
  const busdBalance = new BigNumber(getBalanceNumber(cakeBalance)).multipliedBy(usePriceCakeBusd()).toNumber()
  const { account } = useWeb3React()

  if (!account) {
    return (
      <Flex>
      <Text color="textSubtle" style={{ lineHeight: '28px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
      </Flex>
    )
  }

  return (
    <>
    <Flex>
      <CardValue color="#f09553" value={getBalanceNumber(cakeBalance)} decimals={3} fontSize="13px"  lineHeight="2"/>
      <Text ml="6px" mt="6px" lineHeight="1" color="textSubtle"><CardBusdValue value={busdBalance} /></Text>
    </Flex>
    </>
  )
}

export default CakeWalletBalance
