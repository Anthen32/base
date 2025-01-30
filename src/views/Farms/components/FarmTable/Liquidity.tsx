import React from 'react'
import styled from 'styled-components'
import { Text } from '@pancakeswap-libs/uikit'

export interface LiquidityProps {
  liquidity: number
}

const LiquidityWrapper = styled.div`
  min-width: 110px;
  font-weight: 600;
  text-align: right;

  ${({ theme }) => theme.mediaQueries.sm} {
    text-align: left;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-left: 14px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    svg {
      margin-left: 0;
    }
  }
`

const Liquidity: React.FunctionComponent<LiquidityProps> = ({ liquidity }) => {
  const displayLiquidity = liquidity
    ? `$${Number(liquidity).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : 'Loading...'

  return (
    <Container>
      <Text fontSize="13px" color="#fff">
        {displayLiquidity}
      </Text>
    </Container>
  )
}

export default Liquidity
