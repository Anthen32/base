import styled from 'styled-components'

interface StyledTitleProps {
  isFinished?: boolean
}

const CardTitle = styled.div<StyledTitleProps>`
  font-weight: 400;
  font-size: 14px;
  color: rgb(208 137 63);
    align-self: center;
  margin-left:20px;
  flex:auto;
`

export default CardTitle
