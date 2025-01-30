import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Text } from '@pancakeswap-libs/uikit'
// import { useGetStats } from 'hooks/api'
import { useTotalValue } from '../../../state/hooks'
import CardValue from './CardValue'

const StyledTotalValueLockedCard = styled(Card)`
  background: none;
  border: 0px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  margin-top: 50px;
`

const TotalValueLockedCard = () => {
  const totalValue = useTotalValue()

  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <CardValue
          fontWeight="700"
          fontSize="24px"
          color="#b154f0"
          textAlign="center"
          value={totalValue.toNumber()}
          prefix="$"
          decimals={2}
        />
        <Text textTransform="uppercase" textAlign="center" color="#c3c6d2" mt="12px" fontSize="13px">
          Total Value Locked
        </Text>
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
