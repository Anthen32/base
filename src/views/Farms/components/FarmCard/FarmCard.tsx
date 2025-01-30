import React, { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Flex, Text, Skeleton } from '@pancakeswap-libs/uikit'
import { communityFarms } from 'config/constants'
import { Farm } from 'state/types'
import { provider as ProviderType } from 'web3-core'
import useI18n from 'hooks/useI18n'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { QuoteToken } from 'config/constants/types'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
  liquidity?: BigNumber
  earnings?: BigNumber
  usdStaked: BigNumber
  totalValue?: BigNumber
  farm: FarmWithStakedValue
}

const StyledCardAccent = styled.div`
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -2;
  --angle: 0deg;
  border: 3.5px solid;
  /* This will work but yield a wrong result: */
  border-image: linear-gradient(var(--angle), rgb(0, 255, 244), rgb(255, 0, 205)) 1;
  animation: 2s rotate linear infinite;
}

@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes rotate {
  to {
    --angle: 360deg;
  }
}


  `

const FCard = styled.div`
  align-self: baseline;
  background: #1c1b1c;
  border-radius: 0.4rem;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0px;
  position: relative;
  text-align: center;
  position: relative;
  border: 1px solid rgb(71, 57, 128);
  transition: background-color 300ms ease-out 0s;
  overflow: hidden;
  width: 100%;
  z-index: 2;
`

const Divider = styled.div`
  background-color: #3d2f23;
  height: 1px;
  margin: 0px auto;
  width: 100%;
  z-index: -3;
`
const CardBody = styled.div`
  padding: 10px;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

interface FarmCardProps {
  farm: FarmWithStakedValue
  removed: boolean
  cakePrice?: BigNumber
  bnbPrice?: BigNumber
  ethPrice?: BigNumber
  quickPrice?: BigNumber
  provider?: ProviderType
  account?: string
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, removed, cakePrice, bnbPrice, ethPrice, quickPrice, account }) => {
  const TranslateString = useI18n()

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const isCommunityFarm = communityFarms.includes(farm.tokenSymbol)
  // We assume the token name is coin pair + lp e.g. KYRIOS-BNB LP, LINK-BNB LP,
  // NAR-KYRIOS LP. The images should be cake-bnb.svg, link-bnb.svg, nar-cake.svg
  const farmImage = farm.isTokenOnly ? farm.tokenSymbol.toLowerCase() : farm.quoteTokenSymbol.toLowerCase()
  const farmImage2 = farm.lpSymbol.toLowerCase()
  const totalValue: BigNumber = useMemo(() => {
    if (!farm.lpTotalInQuoteToken) {
      return null
    }
    if (farm.quoteTokenSymbol === QuoteToken.WFTM) {
      return bnbPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.KYRIOS) {
      return cakePrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.QUICK) {
      return quickPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.WETH) {
      return ethPrice.times(farm.lpTotalInQuoteToken)
    }
    return farm.lpTotalInQuoteToken
  }, [bnbPrice, cakePrice, quickPrice, ethPrice, farm.lpTotalInQuoteToken, farm.quoteTokenSymbol])

  const totalValueFormated = totalValue
    ? `$${Number(totalValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('KYRIOS', 'KYRIOS')
  const earnLabel = farm.dual ? farm.dual.earnLabel : 'KYRIOS'
  const farmAPY =
    farm.apy &&
    farm.apy.times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  const depositFee = farm.depositFeeBP || 0
  const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses } = farm
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  return (
    <div>
      <FCard>
        {farm.tokenSymbol === 'KYRIOS' && <StyledCardAccent />}
        <CardHeading
          lpLabel={lpLabel}
          multiplier={farm.multiplier}
          farm={farm}
          isTokenOnly={farm.isTokenOnly}
          isCommunityFarm={isCommunityFarm}
          farmImage={farmImage}
          farmImage2={farmImage2}
          tokenSymbol={farm.tokenSymbol}
          otherExchange={farm.otherExchange}
        />
        <Divider />
        <CardBody>
          {!removed && (
            <Flex justifyContent="space-between" alignItems="center">
              <Text>{TranslateString(736, 'APR')}:</Text>
              <Text style={{ display: 'flex', alignItems: 'center' }}>
                {farm.apy ? (
                  <>
                    <ApyButton
                      lpLabel={lpLabel}
                      addLiquidityUrl={addLiquidityUrl}
                      cakePrice={cakePrice}
                      apy={farm.apy}
                    />
                    {farmAPY}%
                  </>
                ) : (
                  <Skeleton height={24} width={80} />
                )}
              </Text>
            </Flex>
          )}
          <Flex justifyContent="space-between">
            <Text>{TranslateString(318, 'Earn')}:</Text>
            <Text color="#f09553">{earnLabel}</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text>Deposit Fee:</Text>
            <Text>{depositFee}%</Text>
          </Flex>

          <CardActionsContainer
            farm={farm}
            account={account}
            addLiquidityUrl={addLiquidityUrl}
            totalValue={totalValue}
          />
        </CardBody>
        <Divider />

        <ExpandingWrapper expanded={showExpandableSection}>
          <DetailsSection
            removed={removed}
            isTokenOnly={farm.isTokenOnly}
            bscScanAddress={
              farm.isTokenOnly
                ? `https://ftmscan.com/address/${farm.tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
                : `https://ftmscan.com/address/${farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]}`
            }
            totalValueFormated={totalValueFormated}
            lpLabel={lpLabel}
            quoteTokenAdresses={quoteTokenAdresses}
            quoteTokenSymbol={quoteTokenSymbol}
            tokenAddresses={tokenAddresses}
            otherExchange={farm.otherExchange}
          />
        </ExpandingWrapper>
        <ExpandableSectionButton
          onClick={() => setShowExpandableSection(!showExpandableSection)}
          expanded={showExpandableSection}
        />
      </FCard>
    </div>
  )
}

export default FarmCard
