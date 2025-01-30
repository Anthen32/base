import React, { useState, useMemo } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import QueueAnim from 'rc-queue-anim'

import { useWeb3React } from '@web3-react/core'
import { BaseLayout, Flex, Text } from '@pancakeswap-libs/uikit'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import { usePools } from 'state/hooks'
import FarmedStakingBalance from 'views/Home/components/FarmStakingBalance'
import FlexLayout from 'components/layout/Flex'
import Menu from 'components/Menu'
import Page from 'components/layout/Page'
import Timer from 'views/Home/components/TimerHome'
import PoolCard from './components/PoolCard'
import PoolTabButtons from './components/PoolTabButtons'
import Divider from './components/Divider'
import FarmStakingCard from '../Home/components/FarmStakingCard'
import EarnAssetCard from '../Home/components/EarnAssetCard'

const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 16px;
  margin-top: 0px;
  border: 1px solid rgb(61 47 35);
  background: #1c1b1c;
  border-radius: 0.4rem;

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
const CTACards2 = styled(BaseLayout)`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-direction: column;

  img {
    border-radius: 0.4rem;
    max-width: 1100px;
  }
`

const Farm: React.FC = () => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const pools = usePools(account)
  const block = useBlock()
  const [stackedOnly, setStackedOnly] = useState(false)

  const [finishedPools, openPools] = useMemo(
    () => partition(pools, (pool) => pool.isFinished || block > pool.endBlock),
    [block, pools],
  )
  const stackedOnlyPools = useMemo(
    () => openPools.filter((pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)),
    [openPools],
  )

  const currentBlock = useBlock()
  const blocklink = `https://ftmscan.com/block/${currentBlock}`

  return (
    <Menu>
      <QueueAnim type="alpha" delay={40} duration={500}>
        <div key="1">
          <HeadDivider />
          <Page>
            <Flex>
              <Head>
                <Text textAlign="left" fontSize="30px" ml="10px" color="text" mt="45px">
                  Stake KYRIOS earn USDC FTM and more! <br />{' '}
                </Text>
              </Head>
            </Flex>
            <ControlContainer>
              <PoolTabButtons stackedOnly={stackedOnly} setStackedOnly={setStackedOnly} />
            </ControlContainer>
            <CTACards>
              <FarmedStakingBalance />
              <EarnAssetCard />
              <FarmStakingCard />
            </CTACards>
            <Text color="#7f7f7f" mt="10px" mb="10px" textAlign="center" fontSize="14px" >
                REWARDS STARTS IN:
              </Text>
              <Timer />
            <CTACards2>
              <img src="/home_banner.png" alt="" />{' '}
            </CTACards2>
            <FlexLayout>
              <Route exact path={`${path}`}>
                <>
                  {stackedOnly
                    ? orderBy(stackedOnlyPools, ['sortOrder']).map((pool) => <PoolCard key={pool.sousId} pool={pool} />)
                    : orderBy(openPools, ['sortOrder']).map((pool) => <PoolCard key={pool.sousId} pool={pool} />)}
                </>
              </Route>
              <Route path={`${path}/history`}>
                {orderBy(finishedPools, ['sortOrder']).map((pool) => (
                  <PoolCard key={pool.sousId} pool={pool} />
                ))}
              </Route>
            </FlexLayout>
          </Page>
        </div>
      </QueueAnim>
    </Menu>
  )
}
const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
  margin-top: 50px;
  justify-content: space-around;
  flex-direction: row;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`
const Head = styled.div`
  background-color: none;
  border-radius: 0.4rem;
  float: left;
  margin: 10px;
  text-align: justify;
  width: 100%;
`
const HeadDivider = styled.div`
  background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)),
    linear-gradient(101deg, #ffac49, #d32d29);
  border-radius: 0.4rem;
  float: right;
  width: 42%;
  height: 4px;
  margin-top: 130px;
`
const HeadDividerLeft = styled.div`
  background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)),
    linear-gradient(101deg, #ffac49, #d32d29);
  border-radius: 0.4rem;
  float: left;
  width: 42%;
  height: 4px;
  margin-top: 130px;
`
const Hero = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 1fr;
  margin-left: auto;
  margin-right: auto;
  max-width: 250px;
  padding: 48px 0;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: 16px;
    li {
      margin-bottom: 4px;
    }
  }
  img {
    height: auto;
    max-width: 100%;
  }
  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
    margin: 0;
    max-width: none;
  }
`

const CurrentBlock = styled.div`
    position: fixed;
    font-size:11px;
    font-family:"Tomorrow";
    display: flex;
    right: 0px;
    bottom: 0px;
    padding: 1rem;
    transition: opacity 0.25s ease 0s;
    color: #dcdcdd;
    z-index:20;
    img{
      height:35px;
    }

@media (max-width: 1450px) {
        display: none;
      }
}
`
const StatusBlock = styled.div`
width: 8px;
height: 8px;
min-height: 8px;
min-width: 8px;
margin-left: 0.5rem;
margin-top: 4px;
border-radius: 50%;
position: relative;
background-color: #dcdcdd;

}
`

export default Farm
