import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getReferralAddress } from 'utils/addressHelpers'
import { getContract } from 'utils/web3'
import referralABI from 'config/abi/referral.json'
import useRefresh from './useRefresh'

const useTotalReferralCommissions = () => {
    const [count, setCount] = useState()
    const { account } = useWeb3React()
    const { slowRefresh } = useRefresh()

    useEffect(() => {
        async function fetchTotalRef() {
            const refContract = getContract(referralABI, getReferralAddress())
            const total = await refContract.methods.totalReferralCommissions(account).call()
            setCount(total)
        }
        fetchTotalRef()
    }, [account, slowRefresh])

    return count
}

export default useTotalReferralCommissions