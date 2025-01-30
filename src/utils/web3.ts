import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import getRpcUrl from 'utils/getRpcUrl'
import { AbiItem } from 'web3-utils'
import { ContractOptions } from 'web3-eth-contract'

const RPC_URL = getRpcUrl()
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions)
const web3NoAccount = new Web3(httpProvider)

const getWeb3NoAccount = () => {
  return web3NoAccount
}
const getWeb3 = () => {
  const web3 = new Web3(httpProvider)
  return web3
}
const getContract = (abi: any, address: string, contractOptions?: ContractOptions) => {
  const web3 = getWeb3()
  return new web3.eth.Contract((abi as unknown) as AbiItem, address, contractOptions)
}
const isAddress = (address) => {
  return Web3.utils.isAddress(address)
}

export { getWeb3NoAccount, getContract,isAddress }
export default web3NoAccount
