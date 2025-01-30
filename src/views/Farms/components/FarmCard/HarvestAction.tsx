import React, { useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Text, AutoRenewIcon } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { useToast } from 'state/hooks'
import { useHarvest } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'
import useStake from '../../../../hooks/useStake'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
  usdEarnings: BigNumber
}

const BalanceAndCompound = styled.div`
  display: inline;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 12px;
  margin-left:5px;
`
const EarnLabel = styled.div`
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  justify-content: center;
  align-items: baseline;
  white-space: pre;
  font-size: 12px;
`
const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid, usdEarnings }) => {
  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const { onStake } = useStake(pid, 18)

  const rawEarningsBalance = getBalanceNumber(earnings)
  const displayBalance = rawEarningsBalance.toLocaleString()
  const { toastSuccess, toastError } = useToast()

  const harvestFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
      toastSuccess('Success', `You harvested ${displayBalance} KYRIOS.`)
    } catch (e) {
      console.error(e)
      toastError('Error', e?.message)
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward, toastSuccess, toastError, displayBalance])

  const compoundFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onStake(rawEarningsBalance.toString())
      toastSuccess('Success', `You have compounded ${displayBalance} KYRIOS.`)
    } catch (e) {
      console.error(e)
      toastError('Error', e?.message)
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onStake, toastSuccess, toastError, rawEarningsBalance,displayBalance])

  return (
    <Flex mb="8px" justifyContent="space-between" alignItems="center">
      <Text color={rawEarningsBalance === 0 ? '#30294e' : '#f09553'}>
        <EarnLabel>
          {displayBalance}
          {rawEarningsBalance === 0 ? null : <Label>(${usdEarnings.toFixed(2)})</Label>}
        </EarnLabel>
      </Text>
      <BalanceAndCompound>
        {pid === 9 ? (
          // {false ?
          <Button
            size="xs"
            disabled={rawEarningsBalance === 0 || pendingTx}
            endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
            marginBottom="5px"
            onClick={compoundFarms}
          >
            {TranslateString(999, 'Compound')}
          </Button>
        ) : null}
        <Button
          size="xs"
          ml="10px"
          disabled={rawEarningsBalance === 0 || pendingTx}
          endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
          onClick={harvestFarms}
        >
          {TranslateString(562, 'Harvest')}
        </Button>
      </BalanceAndCompound>
    </Flex>
  )
}

export default HarvestAction
