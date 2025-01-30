import React from 'react'
import { Card, CardBody, Flex, Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
// import BigNumber from 'bignumber.js/bignumber'

import { getBalanceNumber } from 'utils/formatBalance'
import { useBurnedBalance } from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'

const StyledCakeStats = styled(Card)`
  background: none;
  border: 0px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  margin-top: 50px;
`

const CakeBurned = () => {
  const burnedBalance = getBalanceNumber(useBurnedBalance(getCakeAddress()))

  return (
    <StyledCakeStats>
      <CardBody>
        <Flex mt="2px" display="inline-flex" justifyContent="center">
          <CardValue
            fontSize="24px"
            color="#ffb300"
            value={burnedBalance}
            decimals={0}
            lineHeight="1"
            fontWeight="700"
          />
        </Flex>
        <Text textTransform="uppercase" textAlign="center" color="#c3c6d2" mt="12px" fontSize="13px">
          Kyrios Burned
        </Text>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeBurned
