import React from 'react'
import { Text, Flex } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import useTotalReferralCommissions from 'hooks/useTotalReferralComisions'
import { getBalanceNumber } from 'utils/formatBalance'

const StyleCon = styled.div`
  margin-top: 38px;
`

const TotalReferralCommissions = () => {
  const referralCommisions = useTotalReferralCommissions()
  const comissions=getBalanceNumber(referralCommisions)
  return (
    <StyleCon>
      <Flex mb="30px" justifyContent="center">
        <Text mt="-4px" mr="5px" color="primary"> {(comissions.toLocaleString())}</Text> - KYRIOS
      </Flex>
    </StyleCon>
  )
}

export default TotalReferralCommissions
