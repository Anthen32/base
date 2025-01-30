import React from 'react'
import { Text, Flex } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import useTotalReferralCount from 'hooks/useTotalReferralCount'

const StyleCon = styled.div`
  margin-top: 32px;
`

const StyleText = styled(Text)`
  margin-top: 5px;
`

const TotalReferralCount = () => {
  const referralCount = useTotalReferralCount()
  return (
    <StyleCon>
      <Flex justifyContent="center">
        <StyleText>{referralCount}</StyleText>
      </Flex>
    </StyleCon>
  )
}

export default TotalReferralCount
