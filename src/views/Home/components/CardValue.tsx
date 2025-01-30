import React, { useEffect, useRef } from 'react'
import { useCountUp } from 'react-countup'
import { Text } from '@pancakeswap-libs/uikit'

export interface CardValueProps {
  value: number
  decimals?: number
  fontSize?: string
  fontWeight?:string
  lineHeight?: string
  prefix?: string
  sufix?: string
  color?: string
  textAlign?: string 
}

const CardValue: React.FC<CardValueProps> = ({
  value,
  decimals,
  fontSize = '13px',
  fontWeight = '',
  lineHeight = '1',
  prefix = '',
  sufix = '',
  color = 'text',
}) => {
  const { countUp, update } = useCountUp({
    start: 0,
    end: value,
    duration: 1,
    separator: ',',
    decimals:
      // eslint-disable-next-line no-nested-ternary
      decimals !== undefined ? decimals : value < 0 ? 4 : value > 1e5 ? 0 : 3,
  })

  const updateValue = useRef(update)

  useEffect(() => {
    updateValue.current(value)
  }, [value, updateValue])

  return (
    <Text textAlign="center" fontSize={fontSize}  fontWeight={fontWeight} lineHeight={lineHeight} color={color}>
      {prefix}
      {countUp}
      {sufix}
    </Text>
  )
}

export default CardValue
