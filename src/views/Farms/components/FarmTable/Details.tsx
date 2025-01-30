import React from 'react'
import styled from 'styled-components'
import { ChevronDownIcon, useMatchBreakpoints } from '@pancakeswap-libs/uikit'

interface DetailsProps {
  actionPanelToggled: boolean
}

const Container = styled.div`
  display: flex;
  width: 30px;
  height: 30px;
  justify-content: flex-end;
  color: ${({ theme }) => theme.colors.primary};
    background-color: #ffffff0f;
    border-radius: .5rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    padding-right: 5px;

}
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: px;
  }
`

const ArrowIcon = styled(ChevronDownIcon)<{ toggled: boolean }>`
  transform: ${({ toggled }) => (toggled ? 'rotate(-180deg)' : 'rotate(0)')};
  transition: all .4s;
  height: 21px;
`

const Details: React.FC<DetailsProps> = ({ actionPanelToggled }) => {
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl

  return (
    <Container>
      {!isMobile && ''}
      <ArrowIcon color="primary" toggled={actionPanelToggled} />
    </Container>
  )
}

export default Details
