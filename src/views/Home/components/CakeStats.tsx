import React from 'react'
import { Card, CardBody, Flex, Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
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

const CakeStats = () => {
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getCakeAddress()))
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0

  return (
    <StyledCakeStats>
      <CardBody>
        <Flex mt="2px" display="inline-flex" justifyContent="center">
          <CardValue
            color="#1de3eb"
            fontWeight="700"
            fontSize="24px"
            value={cakeSupply}
            decimals={0}
            lineHeight="1"
          />
        </Flex>
        <Text textTransform="uppercase" textAlign="center" color="#c3c6d2" mt="12px" fontSize="13px">
          Total Supply
        </Text>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
