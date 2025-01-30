import styled from 'styled-components'
import Container from './Container'

const Page = styled(Container)`
  min-height: calc(100vh - 64px);
  padding-top: 18px;
  padding-bottom: 18px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 26px;
    padding-bottom: 26px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 34px;
    padding-bottom: 34px;
  }
`

export default Page
