import styled from 'styled-components'

export const ActionContainer = styled.div`
  padding: 16px;
  flex-grow: 1;
  flex-basis: 0;
  margin-top: 16px;
  background-color: transparent;
  height: 200px;


  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 12px;
    margin-right: 12px;
    margin-bottom: 0;
    height: 200px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 0;
    height: 180px;
  }
`

export const ActionTitles = styled.div`
  font-weight: 400;
  margin-bottom: 8px;
  font-size:14px;
  -webkit-align-items: center;
    align-items: center;
    text-align: center;
}

img {
  border-radius: 20%;
}

`

export const Title = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  margin-right:3px;
  font-size:14px;
`

export const Subtle = styled.span`
  color: #7f7f7f;
`

export const ActionContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Earned = styled.div`
  font-weight: 400;
  font-size: 13px;
  margin-right:3px;
  color: #f09553;
`

export const Staked = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSubtle};
      align-items: center;
    text-align: center;
`
