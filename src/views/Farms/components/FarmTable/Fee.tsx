import Container from 'components/layout/Container'
import React from 'react'
import styled from 'styled-components'

export interface FeeProps {
  fee: number
  pid: number
}

const Amount = styled.span<{ fee: number }>`
  color: ${({ fee, theme }) => (fee ? '#fff' : theme.colors.text)};
  min-width: 60px;
  text-align: center;
`
const Containedr = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size:13px;

  svg {
    margin-left: 14px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    svg {
      margin-left: 0;
    }
  }
`

const Fee: React.FunctionComponent<FeeProps> = ({ fee }) => {
  const depositFee = fee || 0

  return <Containedr><Amount fee={fee}>{depositFee}%</Amount></Containedr>
}

export default Fee
