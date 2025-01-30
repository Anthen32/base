import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import UnlockButton from 'components/UnlockButton'
import { Button, AutoRenewIcon } from '@pancakeswap-libs/uikit'
import ModalActions from 'components/ModalActions'
import { useFarmUser, useToast } from 'state/hooks'
import ModalInput from 'components/ModalInput'
import useI18n from 'hooks/useI18n'
import { getFullDisplayBalance } from 'utils/formatBalance'
import Tooltip from './Tooltip/Tooltip'

interface DepositModalProps {
  isTokenOnly: boolean
  max: BigNumber
  onConfirm: (amount: string, decimals: number) => void
  onDismiss?: () => void
  tokenName?: string
  addLiquidityUrl?: string
  decimal?: number
  tokenDecimals?: number
  pid:number
}

const DepositModal: React.FC<DepositModalProps> = ({
  isTokenOnly,
  pid,
  max,
  onConfirm,
  onDismiss,
  tokenName = '',
  addLiquidityUrl,
  tokenDecimals = 18,
}) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max, isTokenOnly ? tokenDecimals : undefined)
  }, [max, isTokenOnly, tokenDecimals])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )
  const { toastSuccess, toastError } = useToast()

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])
  
  const { allowance } = useFarmUser(pid)

  const isApproved = account && allowance && allowance.isGreaterThan(0)


  const stakeFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onConfirm(val, isTokenOnly ? tokenDecimals : undefined)
      toastSuccess('Done', `You deposit ${val} ${tokenName}.`)
    } catch (e) {
      console.error(e)
      toastError('Error', e?.message)
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onConfirm, toastSuccess, toastError, tokenName, val, isTokenOnly, tokenDecimals])

  if (!account) {
    return (
      <div>
        <ModalInput
          value={val}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={fullBalance}
          symbol={tokenName}
          addLiquidityUrl={addLiquidityUrl}
        />
        <ModalActions>
            <UnlockButton mt="1px" width="100%" />
        </ModalActions>
      </div>
    )
  }


  
  return (
    <div>
      <ModalInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
        addLiquidityUrl={addLiquidityUrl}
      />
      <ModalActions>
        <Tooltip
          content={
            <div>
              {TranslateString(999, `Deposit your ${tokenName} and start earning.`)}
              <br />
              {TranslateString(999, `Pending KYRIOS will be harvested.`)}
            </div>
          }
        >
          <Button
            width="100%"
            endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
            isLoading={pendingTx}
            onClick={stakeFarms}
            disabled={pendingTx || new BigNumber(val).isNaN() || new BigNumber(val).isLessThanOrEqualTo(0)}
          >
            {pendingTx ? TranslateString(800, '') : TranslateString(564, 'Deposit to Pool')}
          </Button>
        </Tooltip>
      </ModalActions>
    </div>
  )
}


export default DepositModal
