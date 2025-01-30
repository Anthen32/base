import styled from 'styled-components'

const Card = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
  align-self: baseline;
  background: #1c1b1c;
  border-radius: 0.3rem;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0px;
  position: relative;
  text-align: center;
  position: relative;
  border: 1px solid #3d2f23;
  transition: background-color 300ms ease-out 0s;
  overflow: hidden;
  width: 100%;
  z-index: 2;
  img {
    border-radius: 0.4rem;
   }
`

export default Card
