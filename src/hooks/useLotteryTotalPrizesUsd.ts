import { usePriceCakeBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from './useTickets'

const useLotteryTotalPrizesUsd = () => {
  const totalRewards = useTotalRewards()
  const cakePriceBusd = usePriceCakeBusd()

  return  cakePriceBusd.toNumber()
}

export default useLotteryTotalPrizesUsd
