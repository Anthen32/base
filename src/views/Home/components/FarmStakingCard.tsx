import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Flex, Card, Button, Text, AutoRenewIcon } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import { useToast } from 'state/hooks'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import CakeHarvestBalance from './CakeHarvestBalance'

const StyledFarmStakingCard = styled(Card)`
  height: 150px;
  border-radius: 0.4rem;
  border: 0px solid #3d2f23;
  border-left: 0px solid #3d2f23;
  border-top-left-radius: 0rem;
  border-bottom-left-radius: 0rem;
  background: #1c1b1c;
  transition: background-color 300ms ease-out 0s;
`

const CardFarms = styled.div`
  margin: 10px;
  img {
    margin-right: 3px;
    border-radius: 20%;
  }
`
const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))
  const { toastSuccess, toastError } = useToast()

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
      toastSuccess('Success', `You harvest correctly.`)
    } catch (e) {
      console.error(e)
      toastError('Error', e?.message)
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward, toastSuccess, toastError])

  return (
    <StyledFarmStakingCard>
      <CardFarms>
        <Flex mb="8px" alignItems="center" justifyContent="center">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAIAAABt+uBvAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDYwLCAyMDIwLzA1LzEyLTE2OjA0OjE3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTAyLTE2VDIwOjQwOjA1LTA2OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wMi0xN1QwODowMDozNy0wNjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMi0wMi0xN1QwODowMDozNy0wNjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1ZjVlNDczNS05OWIxLWU1NDItYWZlYS04OTVkNDI2ZmM2YjUiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyNWE1NTYxZi1hNGYzLTFlNDktYTFlMi05MjllODBhZThjMGMiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0YTY1YTU2NS1lZDc4LWFjNDgtOTA3Ni1mOWYwY2RjYjM1ZmQiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjRhNjVhNTY1LWVkNzgtYWM0OC05MDc2LWY5ZjBjZGNiMzVmZCIgc3RFdnQ6d2hlbj0iMjAyMi0wMi0xNlQyMDo0MDowNS0wNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo1ZjVlNDczNS05OWIxLWU1NDItYWZlYS04OTVkNDI2ZmM2YjUiIHN0RXZ0OndoZW49IjIwMjItMDItMTdUMDg6MDA6MzctMDY6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4MZy1gAAAV2klEQVR42sWd+XcWxRKGYdxFSQABMSISjRBljwiKoAEXFNSjuHCOy9F/TgWPwRC4CggqILKDSMCAoOxgUKO4L3Af80rZ9jaTxXv7h+9M5uvp6a6peuut6povxX/+tbYy1lasWNHW1rb8YmttbX3rYlvW3ezgzTffbGlpsZNq6s+nLm/rbowZ3kgT6PsqigH93S5cbN6Z8+fPe1+Fx7Q//vhDnzp5/mJzr3UPwj9tQO9M71rRj3Ip/faC09w1mwjsk87n/9kQmScpbzRd1XeJ+AK6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
"
            alt="Kyrios"
            width="10%"
          />{' '}
        </Flex>
        <Flex alignContent="center" justifyContent="center">
          <Text color="#7f7f7f" fontSize="12px">
            TOTAL EARNED:
          </Text>
        </Flex>
        <Flex alignContent="center" justifyContent="center">
          <CakeHarvestBalance />
        </Flex>
        <Flex alignContent="center" justifyContent="center">
          {account ? (
            <Button
              mt="6px"
              id="harvest-all"
              isLoading={pendingTx}
              endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
              width="100%"
            >
              {pendingTx
                ? TranslateString(548, `Harvest from (${balancesWithValue.length}) Pools/Farms`)
                : TranslateString(532, `Harvest All`)}
            </Button>
          ) : (
            <UnlockButton mt="4px" width="100%" />
          )}
        </Flex>
      </CardFarms>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
