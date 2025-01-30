import styled from 'styled-components'

const FlexLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    min-width: 1100px;
    max-width: 31.5%;
    width: 100%;
    margin: 20px 8px;
    margin-bottom: 32px;
  }
`
export default FlexLayout
