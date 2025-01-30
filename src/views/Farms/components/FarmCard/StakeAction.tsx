import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, Text, IconButton, AddIcon, MinusIcon, useModal } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import useStake from 'hooks/useStake'
import useUnstake from 'hooks/useUnstake'
import { getBalanceNumber, getCorrectedNumber } from 'utils/formatBalance'
import DepositModal from '../DepositModal'
import WithdrawModal from '../WithdrawModal'

interface FarmCardActionsProps {
  isTokenOnly?: boolean
  stakedBalance?: BigNumber
  tokenBalance?: BigNumber
  tokenDecimals?: number
  tokenName?: string
  pid?: number
  addLiquidityUrl?: string
  decimal?: number
  usdStaked: BigNumber
  quoteTokenDecimals: number
  fixstake?: string
}

const IconButtonWrapper = styled.div`
  display: flex;
  svg {
    width: 20px;
  }
`
const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 12px;
  align: left;
  display: inline;
`

const SciNumber = styled.div`
  display: inline;
  white-space: nowrap;
  overflow: hidden;
  justify-content: center;
  align-items: baseline;
  white-space: pre;
  font-size: 12px;
`

const StakeAction: React.FC<FarmCardActionsProps> = ({
  isTokenOnly,
  stakedBalance,
  tokenBalance,
  tokenDecimals,
  tokenName,
  pid,
  decimal,
  addLiquidityUrl,
  usdStaked,
  quoteTokenDecimals,
}) => {
  const TranslateString = useI18n()
  let ducktape = 18
  if (tokenName === 'BTC') {
    ducktape = 8
  }
  else if (tokenName === 'USDC') {
    ducktape = 6
  }
  else if (tokenName === 'USDT') {
    ducktape = 6
  }
  const { onStake } = useStake(pid, ducktape)
  const { onUnstake } = useUnstake(pid)

  const rawStakedBalance = getBalanceNumber(stakedBalance, tokenDecimals)
  const correctedStakeBalance = parseFloat(rawStakedBalance.toPrecision(4))
  const displayBalance = getCorrectedNumber(correctedStakeBalance)

  const rawDisplayUsd = getBalanceNumber(usdStaked, isTokenOnly ? tokenDecimals : quoteTokenDecimals)
  // const correctedDisplayUsd = parseFloat(rawDisplayUsd.toPrecision(4));
  const correctedDisplayUsd = rawDisplayUsd
  const displayUSD = getCorrectedNumber(correctedDisplayUsd)

  const [onPresentDeposit] = useModal(
    <DepositModal
      isTokenOnly={isTokenOnly}
      max={tokenBalance}
      onConfirm={onStake}
      tokenName={tokenName}
      tokenDecimals={tokenDecimals}
      addLiquidityUrl={addLiquidityUrl}
      pid={pid}
    />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      isTokenOnly={isTokenOnly}
      max={stakedBalance}
      onConfirm={onUnstake}
      tokenName={tokenName}
      tokenDecimals={tokenDecimals}
    />,
  )

  const renderStakingButtons = () => {
    return rawStakedBalance === 0 ? (
      <Button onClick={onPresentDeposit}>{TranslateString(999, 'Stake')}</Button>
    ) : (
      <IconButtonWrapper>
        <IconButton variant="tertiary" onClick={onPresentWithdraw} mr="6px">
          <MinusIcon color="primary" width="14px" />
        </IconButton>
        <IconButton variant="tertiary" onClick={onPresentDeposit}>
          <AddIcon color="primary" width="14px" />
        </IconButton>
      </IconButtonWrapper>
    )
  }

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Text color={correctedStakeBalance === 0 ? '#30294e' : '#f09553'}>
        <SciNumber>
          {displayBalance}
          {correctedStakeBalance < 1e-5 && correctedStakeBalance > 0 ? (
            <Label>
              {'  '}e{correctedStakeBalance.toExponential(2).split('e')[1].toLocaleString()}
            </Label>
          ) : null}{' '}
        </SciNumber>{' '}
        <SciNumber>
          {usdStaked.gt(0) ? (
            <Label>
              ( ${displayUSD}
              {correctedDisplayUsd < 1e-5 && correctedDisplayUsd > 0 ? (
                <Label>
                  {'  '}e{correctedDisplayUsd.toExponential(2).split('e')[1].toLocaleString()}
                </Label>
              ) : null}{' '}
              )
            </Label>
          ) : null}
        </SciNumber>
      </Text>
      {renderStakingButtons()}
    </Flex>
  )
}

export default StakeAction
