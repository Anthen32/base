import React from 'react'
import { Text, Flex } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import useAllEarnings from 'hooks/useAllEarnings'
import { usePriceCakeBusd } from 'state/hooks'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const CakeHarvestBalance = () => {
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const allEarnings = useAllEarnings()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)
  const earningsBusd = new BigNumber(earningsSum).multipliedBy(usePriceCakeBusd()).toNumber()

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
    <Flex>
      <CardValue color="#f09553" fontSize="13px" value={earningsSum} lineHeight="2" />
      <Text ml="6px" mt="6px" lineHeight="1" color="textSubtle">
        <CardBusdValue value={earningsBusd} />
      </Text>
    </Flex>
  )
}

export default CakeHarvestBalance
