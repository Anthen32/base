import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import LotteryCard from 'views/Home/components/LotteryCard'
import CakeStats from 'views/Home/components/CakeStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnAPYCard from 'views/Home/components/EarnAPYCard'
import EarnAssetCard from 'views/Home/components/EarnAssetCard'
import WinCard from 'views/Home/components/WinCard'

const Hero = styled.div`
  align-items: center;
  background-image: url('/images/pan-bg-mobile.svg');
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/taco-bg2.svg'), url('/images/taco-bg.svg');
    background-position: left center, right center;
    height: 165px;
    padding-top: 0;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 4;
    }
  }
`

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <Hero>
        <Heading as="h1" size="xl" mb="24px" color="secondary">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVQAAAAyCAYAAAADSCNGAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHUmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDYwLCAyMDIwLzA1LzEyLTE2OjA0OjE3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTAzLTA3VDE3OjU2OjI3LTA2OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wMy0wN1QyMDoyOToyNy0wNjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wMy0wN1QyMDoyOToyNy0wNjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4Zjc3YWFlZi1kYjYzLWZlNDUtODU3MS0zYTRlOGJjZGU2YWQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpjOGE2YjU2Ni01MzA1LWI3NGQtODBmZS1kZjhiNGI5MDhlNGIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiZjc3NjAxYS1iNDNlLWFmNGMtYTc1Yy03M2FkZmJhYmI0Y2EiPiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9IlRhcXVpdG8gU3dhcCIgcGhvdG9zaG9wOkxheWVyVGV4dD0iVGFxdWl0byBTd2FwIi8+IDwvcmRmOkJhZz4gPC9waG90b3Nob3A6VGV4dExheWVycz4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpiZjc3NjAxYS1iNDNlLWFmNGMtYTc1Yy03M2FkZmJhYmI0Y2EiIHN0RXZ0OndoZW49IjIwMjEtMDMtMDdUMTc6NTY6MjctMDY6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZGQ5ZWIxMzMtOWM4OS0yMjQ4LWI2NTYtODllYjdhMmZmY2U5IiBzdEV2dDp3aGVuPSIyMDIxLTAzLTA3VDIwOjI5OjI3LTA2OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjhmNzdhYWVmLWRiNjMtZmU0NS04NTcxLTNhNGU4YmNkZTZhZCIgc3RFdnQ6d2hlbj0iMjAyMS0wMy0wN1QyMDoyOToyNy0wNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUg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" alt=""/>
        </Heading>
        <Text>{TranslateString(578, 'The most tasty platform on the Binance Smart Chain.')}</Text>
      </Hero>
      <div>
        <Cards>
          <FarmStakingCard />
          <LotteryCard />
        </Cards>
        <CTACards>
          <EarnAPYCard />
          <EarnAssetCard />
          <WinCard />
        </CTACards>
        <Cards>
          <CakeStats />
          <TotalValueLockedCard />
        </Cards>
      </div>
    </Page>
  )
}

export default Home
