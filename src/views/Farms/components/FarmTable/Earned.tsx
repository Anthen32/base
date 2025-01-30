import Container from 'components/layout/Container'
import React from 'react'
import styled from 'styled-components'

export interface EarnedProps {
  earnings: number
  pid: number
}

const Amount = styled.span<{ earned: number }>`
  color: ${({ earned, theme }) => (earned ? '#f09553' : '#7f7f7f')};
  min-width: 60px;
  text-align: center;
  font-size:13px;
`
const Containedr = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-left: 14px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    svg {
      margin-left: 0;
    }
  }
`

const Earned: React.FunctionComponent<EarnedProps> = ({ earnings }) => {
  const displayBalance = earnings !== null ? earnings.toLocaleString() : '...'

  return <Containedr><Amount earned={earnings}>{displayBalance}</Amount></Containedr>
}

export default Earned
