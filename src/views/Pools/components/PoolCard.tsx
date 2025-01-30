import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import {
  Button,
  IconButton,
  useModal,
  AddIcon,
  Image,
  Flex,
  Text,
  Tag,
  AutoRenewIcon,
  MinusIcon,
} from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import UnlockButton from 'components/UnlockButton'
import Label from 'components/Label'
import { useERC20 } from 'hooks/useContract'
import { useSousApprove } from 'hooks/useApprove'
import useI18n from 'hooks/useI18n'
import { useSousStake } from 'hooks/useStake'
import { useSousUnstake } from 'hooks/useUnstake'
import { getBalanceNumber } from 'utils/formatBalance'
import { getPoolApy } from 'utils/apy'
import { useSousHarvest } from 'hooks/useHarvest'
import Balance from 'components/Balance'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import { Pool } from 'state/types'
import { useGetApiPrice, useToast } from 'state/hooks'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import CompoundModal from './CompoundModal'
import CardTitle from './CardTitle'
import Card from './Card'
import OldSyrupTitle from './OldSyrupTitle'
import HarvestButton from './HarvestButton'
import CardFooter from './CardFooter'

interface HarvestProps {
  pool: Pool
}

const PoolCard: React.FC<HarvestProps> = ({ pool }) => {
  const {
    sousId,
    image,
    tokenName,
    stakingTokenName,
    stakingTokenAddress,
    stakingTokenDecimals,
    projectLink,
    projectScan,
    harvest,
    tokenDecimals,
    poolCategory,
    totalStaked,
    startBlock,
    endBlock,
    isFinished,
    userData,
    stakingLimit,
  } = pool
  // Pools using native BNB behave differently than pools using a token
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const TranslateString = useI18n()
  const stakingTokenContract = useERC20(stakingTokenAddress)
  const { account } = useWeb3React()
  const { onApprove } = useSousApprove(stakingTokenContract, sousId)
  const { onStake } = useSousStake(sousId, isBnbPool)
  const { onUnstake } = useSousUnstake(sousId)
  const { onReward } = useSousHarvest(sousId, isBnbPool)

  // APY
  const rewardTokenPrice = useGetApiPrice(tokenName)
  const stakingTokenPrice = useGetApiPrice(stakingTokenName)
  const apy = getPoolApy(
    stakingTokenPrice,
    rewardTokenPrice,
    getBalanceNumber(pool.totalStaked, stakingTokenDecimals),
    parseFloat(pool.tokenPerBlock),
  )

  const [requestedApproval, setRequestedApproval] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)

  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const earnings = new BigNumber(userData?.pendingReward || 0)

  const isOldSyrup = stakingTokenName === QuoteToken.SYRUP
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const needsApproval = !accountHasStakedBalance && !allowance.toNumber() && !isBnbPool
  const isCardActive = isFinished && accountHasStakedBalance
  const earned = getBalanceNumber(earnings, tokenDecimals)
  const bal = new BigNumber(earnings).toNumber()

  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(tokenDecimals))
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingLimit && stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance}
      onConfirm={onStake}
      tokenName={stakingLimit ? `${stakingTokenName} (${stakingLimit} max)` : stakingTokenName}
      stakingTokenDecimals={stakingTokenDecimals}
    />,
  )

  const [onPresentCompound] = useModal(
    <CompoundModal earnings={earnings} onConfirm={onStake} tokenName={stakingTokenName} />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={onUnstake}
      tokenName={stakingTokenName}
      stakingTokenDecimals={stakingTokenDecimals}
    />,
  )
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
        toastSuccess('Done', `Contract ${stakingTokenName} authorized.`)
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
      toastError('Error', e?.message)
    }
  }, [onApprove, toastSuccess, toastError, setRequestedApproval, stakingTokenName])

  const harvestPools = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
      toastSuccess('Done', `You harvested ${earned} ${tokenName}`)
    } catch (e) {
      console.error(e)
      toastError('Error', e?.message)
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward, toastSuccess, toastError, earned, tokenName])

  return (
    <Card isActive={isCardActive} isFinished={isFinished && sousId !== 0}>
      <StyledCardAccent />
      {isFinished && sousId !== 0 && <PoolFinishedSash />}
      <Flex mr="2px" ml="10px" alignItems="center">
        <Image
          src={`/ico/${image || tokenName}.jpg`}
          width={38}
          height={38}
          alt={tokenName}
          mt="15px"
          mb="10px"
          ml="25px"
        />
        <CardTitle isFinished={isFinished && sousId !== 0}>
          {isOldSyrup && '[OLD]'} {tokenName}
          <Text color="#dcdcdd" mt="6px" lineHeight="0" fontSize="12px">
            Stake {stakingTokenName}
          </Text>
        </CardTitle>
        <RewardsTag variant="secondary">{poolCategory}</RewardsTag>
      </Flex>
      <Divider />
      <div style={{ paddingLeft: '200px', paddingRight: '200px' }}>
        <StakedContainer>
          <Image
            src={`/ico/${image || stakingTokenName}.jpg`}
            width={24}
            height={24}
            alt={tokenName}
            mt="15px"
            mb="0px"
            ml="0px"
          />

        <Balance
          fontSize="12px"
          isDisabled={isFinished}
          value={getBalanceNumber(stakedBalance, stakingTokenDecimals)}
        />
        <Text color='#434343'>{TranslateString(384, `${stakingTokenName} STAKED`)}</Text>
          <Image
            src={`/ico/${image || tokenName}.jpg`}
            width={24}
            height={24}
            alt={tokenName}
            mt="15px"
            mb="0px"
            ml="50px"
          />
        {!isOldSyrup ? (
          <BalanceAndCompound>
            <Balance decimals={5} value={getBalanceNumber(earnings, tokenDecimals)} isDisabled={isFinished} />
            {sousId === 100 && account && harvest && (
              <HarvestButton
                disabled={!earnings.toNumber() || pendingTx}
                text={pendingTx ? TranslateString(999, 'Compounding') : TranslateString(704, 'Compound')}
                onClick={onPresentCompound}
              />
            )}
          </BalanceAndCompound>
        ) : (
          <OldSyrupTitle hasBalance={accountHasStakedBalance} />
        )}
<Text color='#434343'><Label isFinished={isFinished && sousId !== 0} />{tokenName} EARNED</Text>
        <Flex justifyContent="center" alignContent="center" mt="10px">
          {account &&
            harvest &&
            !isOldSyrup &&
            (needsApproval ? null : (
              <Button
                mt="8px"
                variant="primary"
                width="80%"
                disabled={!earnings.toNumber() || pendingTx}
                endIcon={pendingTx ? <AutoRenewIcon spin color="primary" /> : null}
                onClick={harvestPools}
                ml="4px"
              >
                {pendingTx ? TranslateString(800, '') : TranslateString(564, `Harvest ${tokenName}`)}
              </Button>
            ))}
        </Flex>
        </StakedContainer>
        <StyledCardActions>
          {!account && <UnlockButton width="80%" mt="-7px" />}
          {account &&
            (needsApproval && !isOldSyrup ? (
              <div style={{ flex: 1 }}>
                <Button
                  mt="-10px"
                  width="80%"
                  variant="secondary"
                  isLoading={requestedApproval}
                  endIcon={requestedApproval ? <AutoRenewIcon spin color="currentColor" /> : null}
                  disabled={requestedApproval}
                  onClick={handleApprove}
                >
                  {requestedApproval ? TranslateString(800, '') : TranslateString(564, `Authorize ${stakingTokenName}`)}
                </Button>
              </div>
            ) : (
              <>
                <IconButton
                  scale="sm"
                  ml="4px"
                  mr="1px"
                  variant="success"
                  disabled={stakedBalance.eq(new BigNumber(0)) || pendingTx}
                  onClick={
                    isOldSyrup
                      ? async () => {
                          setPendingTx(true)
                          await onUnstake('0', stakingTokenDecimals)
                          setPendingTx(false)
                        }
                      : onPresentWithdraw
                  }
                >
                  <MinusIcon color="white" width="16px" />
                </IconButton>
                <StyledActionSpacer />
                {!isOldSyrup && (
                  <IconButton
                    scale="sm"
                    ml="4px"
                    mr="1px"
                    variant="success"
                    disabled={isFinished && sousId !== 0}
                    onClick={onPresentDeposit}
                  >
                    <AddIcon color="white" width="16px" />
                  </IconButton>
                )}
              </>
            ))}
        </StyledCardActions>
      </div>
      <CardFooter
        projectLink={projectLink}
        projectScan={projectScan}
        decimals={stakingTokenDecimals}
        totalStaked={totalStaked}
        startBlock={startBlock}
        endBlock={endBlock}
        isFinished={isFinished}
        poolCategory={poolCategory}
      />
    </Card>
  )
}

const PoolFinishedSash = styled.div`
  background-image: url('/images/pool-finished-sash.svg');
  background-position: top right;
  background-repeat: not-repeat;
  height: 135px;
  position: absolute;
  right: -24px;
  top: -24px;
  width: 135px;
`

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
  width: 100%;
  box-sizing: border-box;
`

const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
`

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 140px;
  font-size: 12px;
  color: #7f7f7f;
  max-width: 400px;
`
const StakedContainer = styled.div`
display: flex;
align-items: self-end;
justify-content: space-between;
 margin-left: 140px;
  font-size: 12px;
  color: #7f7f7f;
  max-width: 400px;
  margin-top:10px;
  margin-bottom:30px;

`
const EarnContainer = styled.div`
  align-items: center;
  margin-left: 140px;
  font-size: 12px;
  color: #7f7f7f;
  max-width: 400px;
`
const StyledCardAccent = styled.div`
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -2;
  --angle: 0deg;
  border: 3px solid;
  /* This will work but yield a wrong result: */
  border-image: linear-gradient(var(--angle), #ffac49,#d32d29) 1;
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
const Divider = styled.div`
  background-color: #3d2f23;
  height: 1px;
  margin: 0px auto;
  width: 100%;
  z-index: -3;
`
const RewardsTag = styled(Tag)`
  margin-left: 0px;
  margin-right: 30px;
  background: linear-gradient(-70deg, #ffac49, #d32d29);
  font-size: 12px;
  border-radius: 6px;
  border: 0px;
  height: 20px;
  padding: 0 10px;
  margin-top: 8px;
`
export default PoolCard
