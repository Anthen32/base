import React from 'react'
import { useToast } from 'state/hooks'
import { Input, Heading, Button, Flex } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const StyleInput = styled(Input)`
  margin-top: 10px;
  width: 50%;
`
const ReferralLink = () => {
  const { account } = useWeb3React()
  const { toastSuccess } = useToast()

  return (
    <div>
      <Heading color="#secondary" textAlign="center" mt="25px" size="md">
        Your Referral Link
      </Heading>
      <Flex justifyContent="center">
        <StyleInput type="text" scale="md" value={`https://kyrios.finance/?ref=${account}`} readOnly />
      </Flex>
      <CopyToClipboard text={`https://kyrios.finance/?ref=${account}`}>
        <Flex justifyContent="center">
          <Button
            onClick={async () => {
              toastSuccess('Copied', `Share with your friends.`)
            }}
            variant="secondary"
            size="md"
            mb="30px"
            mt="30px"
          >
            Copy Link
          </Button>
        </Flex>
      </CopyToClipboard>
    </div>
  )
}

export default ReferralLink
