import React from 'react'
import styled from 'styled-components'

interface LabelProps {
  text?: string
  isFinished?: boolean
}

const Notification: React.FC<LabelProps> = ({ text, isFinished = false }) => (
  <StyledLabel isFinished={isFinished}>{text}</StyledLabel>
)

const StyledLabel = styled.div<{ isFinished: boolean }>`
width: 100%;
height: 30px;
display: flex;
font-size: 17px;
font-weight: 400;
padding: .33em .5em;
color: #5c5e60;
position: fixed-top;
background-color: white;
box-shadow: 0 1px 3px 2px rgba(0,0,0,0.15);
`

export default Notification
