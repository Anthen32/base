import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, AutoRenewIcon } from '@pancakeswap-libs/uikit'
import { useToast } from 'state/hooks'
import ModalActions from 'components/ModalActions'
import ModalInput from 'components/ModalInput'
import useI18n from 'hooks/useI18n'
import { getFullDisplayBalance } from 'utils/formatBalance'
import Tooltip from './Tooltip/Tooltip'

interface WithdrawModalProps {
  isTokenOnly: boolean
  max: BigNumber
  onConfirm: (amount: string, decimals: number) => void
  onDismiss?: () => void
  tokenName?: string
  tokenDecimals?: number
  addLiquidityUrl?: string
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
  isTokenOnly,
  onConfirm,
  onDismiss,
  max,
  tokenName = '',
  tokenDecimals = 18,
  addLiquidityUrl,
}) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
  const harvestbalance = val.toLocaleString()
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


  const unstakeFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onConfirm(val, isTokenOnly ? tokenDecimals : undefined)
      toastSuccess('Done', `Your withdraw ${val} ${tokenName}.`)
    }catch (e) {
      console.error(e)
      toastError('Error', e?.message)
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onConfirm,toastSuccess,toastError,tokenName, val, isTokenOnly,tokenDecimals])

  return (
    <div>
      <ModalInput
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        value={val}
        max={fullBalance}
        symbol={tokenName}
        addLiquidityUrl={addLiquidityUrl}
      />
      <ModalActions>
          <Button
          mt="1px"
            disabled={pendingTx || new BigNumber(val).isNaN() || new BigNumber(val).isLessThanOrEqualTo(0)}
            endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
            onClick={unstakeFarms}
            width="100%"
          >
            {pendingTx ? TranslateString(488, '') : TranslateString(464, 'Withdraw to Wallet')}
          </Button>
      </ModalActions>
    </div>
  )
}

export default WithdrawModal
