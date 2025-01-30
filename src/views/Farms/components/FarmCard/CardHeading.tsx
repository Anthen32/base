import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Tag, Flex, Image, Text } from '@pancakeswap-libs/uikit'
import { Farm } from 'state/types'

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  farmImage?: string
  farmImage2?: string
  otherExchange?: string
  isTokenOnly?: boolean
  tokenSymbol?: string
  farm: FarmWithStakedValue
}

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
  background: linear-gradient(-70deg, rgb(0, 255, 244), rgb(255, 0, 205));
  font-size: 12px;
  border-radius: 6px;
  border: 0px;
  height: 20px;
  padding: 0 10px;
  margin-top: 8px;
`
const IconsFarms = styled.div`
  padding: 10px;
  //background: rgba(71, 57, 128, 0.4);
`
const Title = styled.div`
  width: 240px;
  height: 10px;
`
const OExchange = styled.div`
  width: 365px;
  height: 0px;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  multiplier,
  farm,
  farmImage,
  farmImage2,
  tokenSymbol,
  otherExchange,
}) => {
  const TokenSimbol = farm.isTokenOnly ? `./images/farms/${farmImage2}.svg` : `./images/farms/${farmImage}.svg`
  const TokenSimbol2 = farm.isTokenOnly ? `./images/farms/null.svg` : `./images/farms/${tokenSymbol}.svg`
  return (
    <div>
      <IconsFarms>
        <Flex flexDirection="row" justifyContent="center" flexWrap="wrap" alignItems="top">
          <Image src={`${TokenSimbol}`} alt={tokenSymbol} width={32} height={32} marginRight={-18} />
          <Image src={`${TokenSimbol2}`} alt={tokenSymbol} width={32} height={32} marginLeft={0} />
          <Title>
            <Text color="#f09553" fontSize="14px">
              {lpLabel}
            </Text>
          </Title>
          <MultiplierTag variant="secondary">{multiplier}</MultiplierTag>
          <OExchange>
            <Text color="#dcdcdd" ml="5px" lineHeight="0" fontSize="12px">
              {otherExchange}
            </Text>{' '}
          </OExchange>
        </Flex>
      </IconsFarms>
    </div>
  )
}

export default CardHeading
