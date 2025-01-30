import React from 'react'
import styled from 'styled-components'
import { Tag } from '@pancakeswap-libs/uikit'
import Tooltip from '../Tooltip/Tooltip'

export interface MultiplierProps {
  multiplier: string
}

const MultiplierTag = styled(Tag)`
font-size: 12px;
border-radius: 3px;
border: 0px;
height: 16px;
width:60px;
align-items: center;
display:grid;
background: linear-gradient(-70deg, #ffac49,#d32d29);

`
const Container = styled.div`
  display: flex;
  align-items: center;
  text-align: center;

  svg {
    margin-left: 14px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    svg {
      margin-left: 0;
    }
  }
`

const Multiplier: React.FunctionComponent<MultiplierProps> = ({ multiplier }) => {
  const displayMultipler = multiplier ? multiplier.toLowerCase() : '...'

  return (
    <Container>
     <MultiplierTag>{displayMultipler}</MultiplierTag>
    </Container>
  )
}

export default Multiplier
