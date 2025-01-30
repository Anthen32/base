import React, { useState, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { Button, useModal, Link, Text, AutoRenewIcon, Flex } from '@pancakeswap-libs/uikit'
import UnlockButton from 'components/UnlockButton'
import { useWeb3React } from '@web3-react/core'
import { useFarmUser, useToast } from 'state/hooks'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import useI18n from 'hooks/useI18n'
import { useApprove } from 'hooks/useApprove'
import { getAddress } from 'utils/addressHelpers'
import { getBep20Contract } from 'utils/contractHelpers'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { getBalanceNumber, getCorrectedNumber } from 'utils/formatBalance'
import useStake from 'hooks/useStake'
import useUnstake from 'hooks/useUnstake'
import useWeb3 from 'hooks/useWeb3'

import DepositModal from '../../DepositModal'
import WithdrawModal from '../../WithdrawModal'
import { ActionContainer, ActionTitles, ActionContent, Earned, Title, Subtle } from './styles'

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 12px;
  align: left;
  display: inline;
`

const SciNumber = styled.div`
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  justify-content: center;
  align-items: baseline;
  white-space: pre;
`
const Staked: React.FunctionComponent<FarmWithStakedValue> = ({
  pid,
  isTokenOnly,
  lpSymbol,
  lpAddresses,
  quoteTokenAdresses,
  quoteTokenSymbol,
  tokenAddresses,
  otherExchange,
  tokenDecimals,
}) => {
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { allowance, tokenBalance, stakedBalance } = useFarmUser(pid)
  let ducktape = 18
  if (lpSymbol === 'BTC') {
    ducktape = 8
  } else if (lpSymbol === 'USDC') {
    ducktape = 6
  } else if (lpSymbol === 'USDT') {
    ducktape = 6
  }
  const { onStake } = useStake(pid, ducktape)
  const { onUnstake } = useUnstake(pid)
  const web3 = useWeb3()

  const isApproved = account && allowance && allowance.isGreaterThan(0)

  const lpAddress = lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`
  const rawStakedBalance = getBalanceNumber(tokenBalance, tokenDecimals)
  const correctedStakeBalance = parseFloat(rawStakedBalance.toFixed(2))
  const displayBalance = getCorrectedNumber(correctedStakeBalance)
  const tokenAddress = getAddress(tokenAddresses)

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
  const [onPresentDeposit] = useModal(
    <DepositModal
      isTokenOnly={isTokenOnly}
      max={tokenBalance}
      onConfirm={onStake}
      tokenName={lpSymbol}
      addLiquidityUrl={addLiquidityUrl}
      tokenDecimals={tokenDecimals}
      pid={pid}
    />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal isTokenOnly={isTokenOnly} max={stakedBalance} onConfirm={onUnstake} tokenName={lpSymbol} />,
  )

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
        toastSuccess('Done', `Contract ${lpSymbol} authorized.`)
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
      toastError('Error', e?.message)
    }
  }, [onApprove, toastSuccess, toastError, setRequestedApproval, lpSymbol])

  if (!account) {
    return (
      <ActionContainer>
        <ActionTitles>
          <Flex justifyContent="space-between">
            <Text ml="5px" mt="-3px" color="#f09553" fontSize="12px">
              IN WALLET:
            </Text>
            <Text ml="5px" mt="-3px" color="#f09553" fontSize="12px">
              {displayBalance}
            </Text>
          </Flex>
          <Flex justifyContent="flex-end">
            <Link fontWeight="400" fontSize="12px" href={externalLink}>
              <Text fontSize="11px" color="#7f7f7f">
                {' '}
                Get {lpSymbol}
              </Text>
            </Link>{' '}
          </Flex>
        </ActionTitles>
        <DepositModal
          isTokenOnly={isTokenOnly}
          max={tokenBalance}
          onConfirm={onStake}
          tokenName={lpSymbol}
          addLiquidityUrl={addLiquidityUrl}
          tokenDecimals={tokenDecimals}
          pid={pid}
        />
      </ActionContainer>
    )
  }

  if (isApproved) {
    if (rawStakedBalance) {
      return (
        <ActionContainer>
          <ActionTitles>
          <Flex justifyContent="space-between">
            <Text ml="5px" mt="-3px" color="#f09553" fontSize="12px">
              IN WALLET:
            </Text>
              <Text ml="5px" mt="-3px" color="#f09553" fontSize="12px">
                <SciNumber>
                  {displayBalance}
                  {correctedStakeBalance < 1e-5 && correctedStakeBalance > 0 ? (
                    <Label>
                      e{correctedStakeBalance.toExponential(2).split('e')[1].toLocaleString()}
                    </Label>
                  ) : null}
                </SciNumber>
              </Text>
            </Flex>
            <Flex justifyContent="flex-end">
            <Link fontWeight="400" fontSize="12px" href={externalLink}>
              <Text fontSize="11px" color="#7f7f7f">
                {' '}
                Get {lpSymbol}
              </Text>
            </Link>{' '}
          </Flex>
          </ActionTitles>
          <DepositModal
            isTokenOnly={isTokenOnly}
            max={tokenBalance}
            onConfirm={onStake}
            tokenName={lpSymbol}
            addLiquidityUrl={addLiquidityUrl}
            tokenDecimals={tokenDecimals}
            pid={pid}
          />
        </ActionContainer>
      )
    }

    return (
      <ActionContainer>
        <ActionTitles>
          <Flex justifyContent="space-between">
            <Text ml="5px" mt="-3px" color="#f09553" fontSize="12px">
              IN WALLET:
            </Text>
            <Text ml="5px" mt="-3px" color="#f09553" fontSize="12px">
              {displayBalance}
            </Text>
          </Flex>
          <Flex justifyContent="flex-end">
            <Link fontWeight="400" fontSize="12px" href={externalLink}>
              <Text fontSize="11px" color="#7f7f7f">
                {' '}
                Get {lpSymbol}
              </Text>
            </Link>{' '}
          </Flex>
        </ActionTitles>
        <DepositModal
          isTokenOnly={isTokenOnly}
          max={tokenBalance}
          onConfirm={onStake}
          tokenName={lpSymbol}
          addLiquidityUrl={addLiquidityUrl}
          tokenDecimals={tokenDecimals}
          pid={pid}
        />
      </ActionContainer>
    )
  }

  return (
    <ActionContainer>
      <ActionTitles>
        <Flex justifyContent="space-between">
          <Text ml="5px" mt="-3px" color="#f09553" fontSize="12px">
            IN WALLET:
          </Text>
          <Text ml="5px" mt="-3px" color="#f09553" fontSize="12px">
            {displayBalance}
          </Text>
        </Flex>
        <Flex justifyContent="flex-end">
          <Link fontWeight="400" fontSize="12px" href={externalLink}>
            <Text fontSize="11px" color="#7f7f7f">
              {' '}
              Get {lpSymbol}
            </Text>
          </Link>{' '}
        </Flex>
      </ActionTitles>
      <ActionTitles>
        <Text mt="25px" fontSize="12px" color="#7f7f7f">
          AUTHORIZE CONTRACT
        </Text>
        <Text mb="25px" fontSize="12px">
          Please authorize contract to start earning.
        </Text>
      </ActionTitles>
      <ActionContent>
        <Button
          mt="14px"
          width="100%"
          variant="secondary"
          isLoading={requestedApproval}
          endIcon={requestedApproval ? <AutoRenewIcon spin color="currentColor" /> : null}
          disabled={requestedApproval}
          onClick={handleApprove}
        >
          {requestedApproval ? TranslateString(800, '') : TranslateString(564, 'Authorize Contract')}
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default Staked
