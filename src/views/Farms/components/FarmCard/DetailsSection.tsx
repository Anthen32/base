import React from 'react'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { Text, Flex, Link, LinkExternal } from '@pancakeswap-libs/uikit'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { Address } from 'config/constants/types'

export interface ExpandableSectionProps {
  isTokenOnly?: boolean
  bscScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  quoteTokenAdresses?: Address
  quoteTokenSymbol?: string
  otherExchange?: string
  addLiquidityUrl?: string
  tokenAddresses: Address
}

const Wrapper = styled.div`
  padding-top: 24px;
  padding: 8px;
  background: #3d2f2380;
  z-index: -2;
  
`

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;

  svg {
    padding-left: 4px;
    height: 18px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  isTokenOnly,
  bscScanAddress,
  removed,
  totalValueFormated,
  lpLabel,
  quoteTokenAdresses,
  quoteTokenSymbol,
  tokenAddresses,
  otherExchange,
}) => {
  const TranslateString = useI18n()

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
    <Wrapper>
      <Flex justifyContent="space-between">
        <Text>{TranslateString(316, 'Stake')}:</Text>
        <StyledLinkExternal href={externalLink}>{lpLabel}</StyledLinkExternal>
      </Flex>
      {!removed && (
        <Flex justifyContent="space-between">
          <Text>{TranslateString(23, 'Total Liquidity')}:</Text>
          <Text>{totalValueFormated}</Text>
        </Flex>
      )}
      <Flex justifyContent="flex-start">
        <Link external href={bscScanAddress} bold={false}>
          {TranslateString(356, 'View on FTMScan')}
        </Link>
      </Flex>
    </Wrapper>
  )
}

export default DetailsSection
