import React from 'react'
import styled from 'styled-components'

const Label = styled.div`
  font-size: 12.5px;
  color: #7f7f7f;
  text-align: center;
`

const ContentContainer = styled.div`
  min-height: 24px;
  display: flex;
  align-content: center;  
`

interface CellLayoutProps {
  label?: string
}

const CellLayout: React.FC<CellLayoutProps> = ({ label = '', children }) => {
  return (
    <div>
      <ContentContainer>{children}</ContentContainer>
      {label && <Label>{label}</Label>}
    </div>
  )
}

export default CellLayout
