import React from 'react'
import CardValue, { CardValueProps } from './CardValue'

const CardBusdValue: React.FC<CardValueProps> = (props) => {
  return (
    <CardValue fontSize="13px" lineHeight="1" color="textSubtle" prefix="( $" sufix=" )"  decimals={2} {...props} />
  )
}

export default CardBusdValue
