import React from 'react'
import './reset.min.css'
import './main.css'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { BaseLayout, Button, Flex, Text } from '@pancakeswap-libs/uikit'
import QueueAnim from 'rc-queue-anim'
import Page from 'components/layout/Page'
import CakeBurned from 'views/Home/components/CakeBurned'
import CakeStats from 'views/Home/components/CakeStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import CakeMarketCap from './components/CakeMarketCap'
import Timer from './components/TimerHome'

const HomeBG = styled.div`
  background-image: url(/images/home_bg.png);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-color: #151515;
`

const CTACards = styled(BaseLayout)`
  align-items: center;
  margin-bottom: 32px;

  & > div {
    grid-column: span 3;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 4;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 3;
    }
  }
`
const Audits = styled.div`
  width: 100%;
  text-align: center;
  img {
    margin-left: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
  }
`
const KyriosSecond = styled.div`
    position: fixed;
    font-size:11px;
    right: 0px;
    bottom: 0px;
    padding: 1rem;
    color: #45a14b;
    z-index:200;
}
`
const SubTitle = styled.div`
    font-size:14px;
    color: #7f7f7f;
    max-width: 500px;
    margin: 10px auto;
    text-align: center;
    line-height: 1.75rem!important;
    -webkit-text-stroke-width: thin;
}
`
const Home: React.FC = () => {
  return (
    <QueueAnim type="alpha" delay={40} duration={500}>
      <div key="1">
        <HomeBG>
          <Page>
            <div className="nav unselectable">
              <KyriosSecond>0.001 - New Kyrios/Second.</KyriosSecond>
            </div>
            <section>
              <div className="hero unselectable">
                <a className="Kyrios_Home_Logo" href="/farms">
                  <img alt="Kyrios Logo" src="/logo.png" />
                </a>
                <div className="Kyrios_Home_Title">
                  <h2 className="Kyrios_Home_Desc">The sage king has arrived to the DeFi.</h2>
                </div>
                <SubTitle>
                  Can you feel the Roar? Be part of a great ecosystem in the Fantom Network, join the Kyrios community
                  now. Farming has never been this easy.{' '}
                </SubTitle>
                <SubTitle>REWARDS STARTS IN:</SubTitle>
                <Timer />
                <div className="hero-cta">
                  <Button variant="success" size="md" as={Link} to="/farms">
                    <p>Enter Kyrios</p>
                  </Button>
                  <Button variant="success" size="md" ml="20px" as="a" href="https://docs.kyrios.finance/">
                    <p>Learn More</p>
                  </Button>
                </div>

                <div className="card-landing">
                  <CTACards>
                    <TotalValueLockedCard />
                    <CakeStats />
                    <CakeBurned />
                    <CakeMarketCap />
                  </CTACards>
                </div>
              </div>
            </section>
            <Flex justifyContent="center">
              <footer>
                <a className="nav-item" href="https://discord.gg/6PgtxkpCTE">
                  <img className="nav-img" src="../images/img/discord.svg" alt="Discord" />
                </a>
                <a className="nav-item" href="https://twitter.com/KyriosFinance">
                  <img className="nav-img" src="../images/img/twitter.svg" alt="Twitter" />
                </a>
                <a className="nav-item" href="https://t.me/kyrios_Finance">
                  <img className="nav-img" src="../images/img/telegram.svg" alt="Telegram" />
                </a>
                <a className="nav-item" href="https://github.com/Kyrios-Finance/Contracts">
                  <img className="nav-img" src="../images/img/github.svg" alt="GitHub" />
                </a>
                <a className="nav-item" href="https://docs.kyrios.finance/">
                  <img className="nav-img" src="../images/img/gitbook.svg" alt="GitBook" />
                </a>
              </footer>
            </Flex>
          </Page>
        </HomeBG>
      </div>
    </QueueAnim>
  )
}

export default Home
