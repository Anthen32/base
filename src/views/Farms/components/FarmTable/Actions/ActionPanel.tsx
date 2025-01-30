import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { LinkExternal, Text, Link, Tag, Flex } from '@pancakeswap-libs/uikit'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { communityFarms } from 'config/constants'
import QueueAnim from 'rc-queue-anim'

import HarvestAction from './HarvestAction'
import StakedAction from './StakedAction'
import UnStakedAction from './UnStaked'
import Apr, { AprProps } from '../Apr'
import Fee, { FeeProps } from '../Fee'
import Multiplier, { MultiplierProps } from '../Multiplier'
import Liquidity, { LiquidityProps } from '../Liquidity'

export interface ActionPanelProps {
  apr: AprProps
  fee: FeeProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  details: FarmWithStakedValue
  otherExchange?: string
}

const Container = styled.div`
  background: #1c1b1c;
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  padding: 24px;
  margin-top: -22px;
  border-left:1px solid #3d2f23;
  border-right:1px solid #3d2f23;
  margin-left:-1px;
  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: column;
    padding: 16px 32px;
    margin-top: -22px;
    width: 100.2%;
  }
  @media only screen and (max-width:  967px) { 
    width: 100.2%;
    @media only screen and (max-width:  799px) { 
      width: 100.3%;
      @media only screen and (max-width:  533px) { 
        width: 100.5%;
        @media only screen and (max-width:  333px) { 
          width: 100.6%;
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
  margin-left: 8px;
`

const StyledLink = styled(Link)`
  font-weight: 400;
`

const StakeContainer = styled.div`
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  display: flex;
  justify-content: space-between;
  font-size: 13px;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
  }
`

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 16px;
  }

  > div {
    height: 24px;
    padding: 0 6px;
    font-size: 14px;
    margin-right: 4px;

    svg {
      width: 14px;
    }
  }
`

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1.5px solid #ffffff0f;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
  }
`

const InfoContainer = styled.div`
  background-color: #bed5ff0d;
  border-radius: 0.4rem;
  padding: 16px;
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: column;
    align-items: flex-start;
    flex-grow: 1;
    flex-basis: 0;
  }
`

const ValueContainer = styled.div`
  display: block;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0px;
`

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({ details, apr, multiplier, liquidity, fee }) => {
  const farm = details

  const TranslateString = useI18n()
  const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses, tokenSymbol, dual, isTokenOnly, otherExchange } = farm
  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('KyriosToken', '')
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })
  const lpAddress = farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const isCommunityFarm = communityFarms.includes(tokenSymbol)

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
  const info = isTokenOnly
    ? `https://info.spookyswap.finance/token/${tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
    : `https://info.spookyswap.finance/pair/${lpAddress}`

  const bsc = isTokenOnly
    ? `https://ftmscan.com/address/${tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
    : `https://ftmscan.com/address/${lpAddress}`

  return (
    <div>
      <QueueAnim type="alpha" delay={0} duration={200}>
        <div key="1">
          <Container>
            <ActionContainer>
              <StakedAction {...farm} />
              <UnStakedAction {...farm} />
              <HarvestAction {...farm} />
            </ActionContainer>
          </Container>
        </div>
      </QueueAnim>
      <QueueAnim type="alpha" delay={40} duration={500}>
        <div key="1">
          <InfoContainer>
            <ValueContainer>
              <ValueWrapper>
                <Text>{TranslateString(999, 'Fee')}</Text>
                <Fee {...fee} />
              </ValueWrapper>
              <ValueWrapper>
                <Text>{TranslateString(736, 'APR')}</Text>
                <Apr {...apr} />
              </ValueWrapper>
              <ValueWrapper>
                <Text>{TranslateString(999, 'Multiplier')}</Text>
                <Multiplier {...multiplier} />
              </ValueWrapper>
              <ValueWrapper>
                <Text>{TranslateString(999, 'Total Liquidity:')}</Text>
                <Liquidity {...liquidity} />
              </ValueWrapper>
            </ValueContainer>

            <StakeContainer>
              Stake:
              <StyledLinkExternal href={externalLink}>{lpLabel}</StyledLinkExternal>
            </StakeContainer>
            <StakeContainer>
              Earn:
              <Text ml="8px" color="#7f7f7f">
                KYRIOS
              </Text>
            </StakeContainer>
            <StyledLink href={bsc} external>
              {TranslateString(999, 'View on Explorer')}
            </StyledLink>
            <StyledLink href={info} external>
              {TranslateString(999, 'Spooky Info')}
            </StyledLink>
          </InfoContainer>
        </div>
      </QueueAnim>
    </div>
  )
}

export default ActionPanel
