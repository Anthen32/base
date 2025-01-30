import React from 'react'
import styled from 'styled-components'
import { Text, Image } from '@pancakeswap-libs/uikit'
import Multiplier from './Multiplier'

export interface FarmProps {
  label: string
  pid: number
  image: string
  imagetwo: string
  otherExchange: string
  isTokenOnly: string
  multiplier: string
}

const IconImage = styled(Image)`
  width: 38px;

  img {
    border-radius: 20%;
  }
`

const Container = styled.div`
  padding-left: 10px;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 42px;
  }
`

const Farm: React.FunctionComponent<FarmProps> = ({
  image,
  imagetwo,
  label,
  isTokenOnly,
  otherExchange,
  multiplier,
}) => {
  const handleRenderFarming = (): JSX.Element => {
    if (otherExchange) {
      return (
        <Text color="#FFF" fontSize="14px">
          {label}
        </Text>
      )
    }
    return null
  }

  return (
    <Container>
      {isTokenOnly ? '' : <IconImage src={`/ico/${image}.jpg`} alt={image} width={38} height={38} mr="-10px" />}
      <IconImage src={`/ico/${imagetwo}.jpg`} alt={imagetwo} width={38} height={38} ml="-5px" mr="10px" />
      <div>
        {handleRenderFarming()}
        <Text textTransform="uppercase" color="#7f7f7f" fontSize="11px">
          {otherExchange}
        </Text>{' '}
      </div>
    </Container>
  )
}

export default Farm
