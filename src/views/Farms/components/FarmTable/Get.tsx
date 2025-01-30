import React from 'react'
import styled from 'styled-components'
import { Address } from 'config/constants/types'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import Tooltip from '../Tooltip/Tooltip'

export interface GetProps {
  otherExchange?: string
  addLiquidityUrl?: string
  tokenAddresses: Address
  isTokenOnly?: boolean
  quoteTokenAdresses?: Address
  quoteTokenSymbol?: string
  get: string
  label: string
}

const Container = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  width: 100px;
`
const Button = styled.button`
  color: #cf783d;
  font-size: 13px;
  padding: 0.56em 1em;
  border: 1px solid #cf783d;
  background-color: #ffffff0f;
  border-radius: 2px;
  width: 100%;
  transition: background-color 0.2s;

  &:hover:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled):not(:active) {
    opacity: 0.65;
    border: 1px solid #cf783d;
    color: #cf783d;

  }

  &:active:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled) {
    opacity: 0.85;
  }
`

const Get: React.FC<GetProps> = ({
  isTokenOnly,
  quoteTokenAdresses,
  quoteTokenSymbol,
  tokenAddresses,
  otherExchange,
  label,
}) => {
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })

  let externalLink = isTokenOnly
    ? `https://spookyswap.finance/swap?outputCurrency=${tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
    : `https://spookyswap.finance/add/${liquidityUrlPathParts}`

  if (otherExchange === 'SushiSwap') {
    externalLink = isTokenOnly
      ? `https://app.sushi.com/swap?outputCurrency=${tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
      : `https://app.sushi.com/add/${liquidityUrlPathParts}`
  }
  if (otherExchange === 'SpiritSwap') {
    externalLink = isTokenOnly
      ? `https://swap.spiritswap.finance/#/swap/${tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
      : `https://swap.spiritswap.finance/#/add/${liquidityUrlPathParts}`
  }
  return (
    <Container>
      <Tooltip 
                content={
                  <div>
Get {label} on Spookyswap
                  </div>
                }
                >
      <Button as="a" href={externalLink}>
        SPOOKYSWAP
      </Button>
      </Tooltip>
    </Container>
  )
}

export default Get
