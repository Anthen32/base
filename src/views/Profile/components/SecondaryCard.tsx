import styled from 'styled-components'
import { Text } from '@pancakeswap-libs/uikit'

const SecondaryCard = styled(Text)`
  border: 1px solid #cf783d;
  border-radius: 0.4rem;
`

SecondaryCard.defaultProps = {
  p: '24px',
}

export default SecondaryCard
