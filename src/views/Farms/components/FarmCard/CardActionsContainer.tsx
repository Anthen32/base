import React, { useMemo, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { provider as ProviderType } from 'web3-core'
import { getAddress } from 'utils/addressHelpers'
import { getBep20Contract } from 'utils/contractHelpers'
import { Button, Flex, Text, AutoRenewIcon } from '@pancakeswap-libs/uikit'
import { Farm } from 'state/types'
import { useFarmFromSymbol, useFarmUser, useToast, usePriceCakeBusd } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import useWeb3 from 'hooks/useWeb3'
import { useApprove } from 'hooks/useApprove'
import UnlockButton from 'components/UnlockButton'
import StakeAction from './StakeAction'
import HarvestAction from './HarvestAction'

const Action = styled.div`
  padding-top: 16px;
`
export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

interface FarmCardActionsProps {
  farm: FarmWithStakedValue
  provider?: ProviderType
  account?: string
  addLiquidityUrl?: string
  totalValue?: BigNumber

}

const CardActions: React.FC<FarmCardActionsProps> = ({ farm, account, addLiquidityUrl,totalValue }) => {
  const TranslateString = useI18n()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { pid, lpAddresses, isTokenOnly, tokenAddresses } = useFarmFromSymbol(farm.lpSymbol)
  const { allowance, tokenBalance, stakedBalance, earnings } = useFarmUser(pid)
  const lpAddress = getAddress(lpAddresses)
  const tokenAddress = getAddress(tokenAddresses)
  const lpName = farm.lpSymbol.toUpperCase()
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const web3 = useWeb3()
  const earnLabel = 'KYRIOS'
  const cakePrice = usePriceCakeBusd()

  const lpContract = useMemo(() => {
    if (isTokenOnly) {
      return getBep20Contract(tokenAddress, web3)
    }
    return getBep20Contract(lpAddress, web3)
  }, [lpAddress, web3, tokenAddress, isTokenOnly])

  const { onApprove } = useApprove(lpContract)
  const { toastSuccess, toastError } = useToast()

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas.')
        setRequestedApproval(false)
      } else {
        toastSuccess('Contract Enabled', `You can now stake ${lpName}.`)
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
      toastError('Error', e?.message)
    }
  }, [onApprove, toastSuccess, toastError, setRequestedApproval, lpName])
  
  let usdStaked = stakedBalance

  if (totalValue) {
    usdStaked = usdStaked.times(new BigNumber(totalValue).div(farm.lpStakedTotal))
  }

  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <StakeAction
        isTokenOnly={isTokenOnly}
        stakedBalance={stakedBalance}
        tokenBalance={tokenBalance}
        tokenDecimals={farm.tokenDecimals}
        tokenName={lpName}
        pid={pid}
        addLiquidityUrl={addLiquidityUrl}
        usdStaked={usdStaked}
        quoteTokenDecimals={farm.quoteTokenDecimals}
      />
    ) : (
      <Button
        isLoading={requestedApproval}
        endIcon={requestedApproval ? <AutoRenewIcon spin color="currentColor" /> : null}
        disabled={requestedApproval}
        onClick={handleApprove}
      >
        {requestedApproval ? TranslateString(800, 'Approving') : TranslateString(564, 'Approve')}
      </Button>
    )
  }

  return (
    <Action>
      <Flex>
        <Text textTransform="uppercase" color="secondary" fontSize="12px" pr="3px">
          {earnLabel}
        </Text>
        <Text textTransform="uppercase" color="textSubtle" fontSize="12px">
          {TranslateString(1072, 'Earned')}
        </Text>
      </Flex>
      <HarvestAction earnings={earnings} pid={pid} usdEarnings={cakePrice.multipliedBy(earnings.dividedBy(10 ** 18))} />
      <Flex>
        <Text textTransform="uppercase" color="secondary" fontSize="12px" pr="3px">
          {lpName}
        </Text>
        <Text textTransform="uppercase" color="textSubtle" fontSize="12px">
          {TranslateString(1074, 'Staked')}
        </Text>
      </Flex>
      {!account ? <UnlockButton mt="8px" /> : renderApprovalOrStakeButton()}
    </Action>
  )
}

export default CardActions
