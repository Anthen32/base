import React from 'react'
import { Card, CardBody, Text } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import { usePriceCakeBusd } from '../../../state/hooks'

const StyledCakePriceHome = styled(Card)`
  background: none;
  border: 0px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  margin-top: 50px;
`
const CakePriceHome = () => {
  const totalSupply = useTotalSupply()
  const cakePrice = usePriceCakeBusd()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getCakeAddress()))
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0)
  const marketCap = cakePrice.times(circSupply)

  return (
    <StyledCakePriceHome>
      <CardBody>
        <CardValue
          color="#df4c21"
          fontSize="24px"
          fontWeight="700"
          value={getBalanceNumber(marketCap)}
          decimals={0}
          prefix="$"
        />
        <Text textTransform="uppercase" textAlign="center" color="#c3c6d2" mt="12px" fontSize="13px">
          Market Cap
        </Text>
      </CardBody>
    </StyledCakePriceHome>
  )
}

export default CakePriceHome
