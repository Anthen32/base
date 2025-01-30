import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Flex, Modal, Text, AutoRenewIcon } from '@pancakeswap-libs/uikit'
import { useToast } from 'state/hooks'
import ModalActions from 'components/ModalActions'
import ModalInput from 'components/ModalInput'
import useI18n from '../../../hooks/useI18n'
import { getFullDisplayBalance } from '../../../utils/formatBalance'

interface DepositModalProps {
  max: BigNumber
  onConfirm: (amount: string, decimals: number) => void
  onDismiss?: () => void
  tokenName?: string
  stakingTokenDecimals?: number
}

const DepositModal: React.FC<DepositModalProps> = ({
  max,
  onConfirm,
  onDismiss,
  tokenName = '',
  stakingTokenDecimals = 18,
}) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max, stakingTokenDecimals)
  }, [max, stakingTokenDecimals])

  const bal = new BigNumber(fullBalance).toNumber()
  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  const { toastSuccess, toastError } = useToast()

  const stakePools = useCallback(async () => {
    setPendingTx(true)
    try {
      await onConfirm(val, stakingTokenDecimals)
      toastSuccess('Done', `You deposit ${val} ${tokenName}.`)
    } catch (e) {
      console.error(e)
      toastError('Error', e?.message)
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onConfirm, toastSuccess, toastError, tokenName, stakingTokenDecimals, val])

  return (
    <Modal title={`${TranslateString(316, 'STAKE')} ${tokenName}`} onDismiss={onDismiss}>
      <Flex mt="-20px" justifyContent="center">
        <Text color="#cf783d" fontSize="12px" mr="4px">
          {tokenName}
        </Text>
        <Text color="#7f7f7f" fontSize="12px">
          {TranslateString(526, 'BALANCE IN WALLET:')}
        </Text>
        <Text ml="5px" fontSize="12px" color="#f09553">
          {bal.toFixed(3)}
        </Text>
      </Flex>
      <ModalInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      />
      <ModalActions>
        <Button width="100%" variant="secondary" onClick={onDismiss}>
          {TranslateString(462, 'Cancel')}
        </Button>
        <Button
          width="100%"
          endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
          isLoading={pendingTx}
          onClick={stakePools}
          disabled={pendingTx || new BigNumber(val).isNaN() || new BigNumber(val).isLessThanOrEqualTo(0)}
        >
          {pendingTx ? TranslateString(800, '') : TranslateString(564, 'Stake to Pool')}
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default DepositModal
