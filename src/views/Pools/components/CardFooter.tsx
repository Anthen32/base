import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import { ChevronDown, ChevronUp } from 'react-feather'
import Balance from 'components/Balance'
import { CommunityTag, CoreTag, BinanceTag } from 'components/Tags'
import useBlock from 'hooks/useBlock'
import { PoolCategory } from 'config/constants/types'
import { Flex } from '@pancakeswap-libs/uikit'

const tags = {
  [PoolCategory.BINANCE]: BinanceTag,
  [PoolCategory.CORE]: CoreTag,
  [PoolCategory.EARN]: CommunityTag,
}

interface Props {
  projectLink: string
  projectScan: string
  decimals: number
  totalStaked: BigNumber
  startBlock: number
  endBlock: number
  isFinished: boolean
  poolCategory: PoolCategory
}

const StyledFooter = styled.div<{ isFinished: boolean }>`
  background: #bed5ff0d;
  border-radius: 0.4rem;
  padding: 16px;
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 20px;
`

const Details = styled.div`
  margin-top: 4px;
  padding: 8px;
`

const Row = styled.div`
  align-items: center;
  display: flex;
`
const Label = styled.div`
  color: #cf783d;
  font-size: 13px;
`
const TokenLink = styled.a`
  font-size: 13px;
  text-decoration: none;
  color: #7f7f7f;
`

const CardFooter: React.FC<Props> = ({
  projectLink,
  projectScan,
  decimals,
  totalStaked,
  isFinished,
  startBlock,
  endBlock,
  poolCategory,
}) => {
  const block = useBlock()
  const [isOpen, setIsOpen] = useState(false)
  const TranslateString = useI18n()
  const Icon = isOpen ? ChevronUp : ChevronDown

  const handleClick = () => setIsOpen(!isOpen)
  const Tag = tags[poolCategory]

  const blocksUntilStart = Math.max(startBlock - block, 0)
  const blocksRemaining = Math.max(endBlock - block, 0)

  return (
    <StyledFooter isFinished={isFinished}>
      <Details>
        <Flex justifyContent="space-between">
          <Label>Total Staked:</Label>
          <Balance fontSize="12px" isDisabled={isFinished} value={getBalanceNumber(totalStaked, decimals)} />
        </Flex>
        <Flex justifyContent="space-between">
          <Label>Current Block:</Label>
          <Balance fontSize="12px" isDisabled={isFinished} value={block} decimals={0} />
        </Flex>
        {blocksUntilStart > 0 && (
          <Flex justifyContent="space-between">
            <Label>Rewards Start (Blocks):</Label>
            <Balance fontSize="12px" isDisabled={isFinished} value={blocksUntilStart} decimals={0} />
          </Flex>
        )}
        {blocksUntilStart === 0 && blocksRemaining > 0 && (
          <Flex justifyContent="space-between">
            <Label>Rewards End (Blocks):</Label>
            <Balance fontSize="12px" isDisabled={isFinished} value={blocksRemaining} decimals={0} />
          </Flex>
        )}
        <Flex mt="0px" justifyContent="space-between">
          <TokenLink href={projectScan} target="_blank">
            {TranslateString(412, 'View on Explorer')}
          </TokenLink>
        </Flex>
        <Flex mt="4px" justifyContent="space-between">
        <TokenLink href={projectLink} target="_blank">
            {TranslateString(412, 'Spooky Info')}
          </TokenLink>
          </Flex>
      </Details>
    </StyledFooter>
  )
}

export default React.memo(CardFooter)
