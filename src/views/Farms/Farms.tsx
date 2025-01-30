import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { BaseLayout, RowType, Checkbox, Text, Flex } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { BLOCKS_PER_YEAR, KYRIOS_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Menu from 'components/Menu'
import '../Home/main.css'
import QueueAnim from 'rc-queue-anim'
import Timer from 'views/Home/components/TimerHome'

import Page from 'components/layout/Page'
import {
  useFarms,
  usePriceBnbBusd,
  usePriceCakeBusd,
  useTotalValue,
  usePriceEthBusd,
  usePriceQuickBusd,
} from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { orderBy } from 'lodash'
import FarmedStakingBalance from 'views/Home/components/FarmStakingBalance'

import FarmStakingCard from '../Home/components/FarmStakingCard'
import EarnAssetCard from '../Home/components/EarnAssetCard'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import Table from './components/FarmTable/FarmTable'
import FarmTabButtons from './components/FarmTabButtons'
import SearchInput from './components/SearchInput'
import { RowProps } from './components/FarmTable/Row'
import { DesktopColumnSchema, ViewMode } from './components/types'
import Select, { OptionProps } from './components/Select/Select'
import Notification from './components/Anounces'
import Divider from './components/Divider'


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
    width: 100%;
    height: auto;
  }
`

const Anounces = styled(BaseLayout)`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 0px;
  background-color: #212629;
  padding: 5px;
  a {
    font-size: 13.2px;
  }
`

const Audits = styled.div`
  width: 100%;
  text-align: center;
  display:none;
  img {
    margin-left: 20px;
    margin-right: 20px;
    height:35px;
  }
  @media (max-width: 1450px) {
    display: inline;
  }
}
`
const Purple = styled.div`
  color: #cf783d;
  display: inline-flex;
  font-size: 13px;
  margin-right: 15px;
`

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
  margin-top: 50px;
  justify-content: space-between;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0px 15px 32px 15px;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
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
const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;
  border-radius: 0.4rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
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
export interface FarmsProps {
  tokenMode?: boolean
}

const Farms: React.FC<FarmsProps> = (farmsProps) => {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const cakePrice = usePriceCakeBusd()
  const bnbPrice = usePriceBnbBusd()
  const ethPriceUsd = usePriceEthBusd()
  const quickPriceUsd = usePriceQuickBusd()
  const [query, setQuery] = useState('')
  const [viewMode] = useState(ViewMode.TABLE)
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')
  const { tokenMode } = farmsProps

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [stackedOnly, setStackedOnly] = useState(false)

  const activeFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier === '0X')

  const stackedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
    switch (sortOption) {
      case 'apr':
        return orderBy(farms, 'apy', 'desc')
      case 'multiplier':
        return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.multiplier.slice(0, -1)), 'desc')
      case 'earned':
        return orderBy(farms, (farm: FarmWithStakedValue) => (farm.userData ? farm.userData.earnings : 0), 'desc')
      case 'liquidity':
        return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')
      default:
        return farms
    }
  }

  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback(
    (farmsToDisplay): FarmWithStakedValue[] => {
      const cakePriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === KYRIOS_POOL_PID)?.tokenPriceVsQuote || 0)
      let farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.tokenAmount || !farm.lpTotalInQuoteToken) {
          return farm
        }
        const cakeRewardPerBlock = new BigNumber(farm.cakePerBlock || 1)
          .times(new BigNumber(farm.poolWeight))
          .div(new BigNumber(9.85).pow(18))
        const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

        let apy = cakePrice.times(cakeRewardPerYear)

        let totalValue = new BigNumber(farm.lpTotalInQuoteToken || 0)

        if (farm.quoteTokenSymbol === QuoteToken.WETH) {
          totalValue = totalValue.times(ethPriceUsd)
        }
        if (farm.quoteTokenSymbol === QuoteToken.WFTM) {
          totalValue = totalValue.times(bnbPrice)
        }
        if (farm.quoteTokenSymbol === QuoteToken.KYRIOS) {
          totalValue = totalValue.times(cakePrice)
        }
        if (farm.quoteTokenSymbol === QuoteToken.QUICK) {
          totalValue = totalValue.times(quickPriceUsd)
        }

        if (totalValue.comparedTo(0) > 0) {
          apy = apy.div(totalValue)
        }

        return { ...farm, apy, liquidity: totalValue }
      })

      if (query) {
        const lowercaseQuery = query.toLowerCase()
        farmsToDisplayWithAPY = farmsToDisplayWithAPY.filter((farm: FarmWithStakedValue) => {
          if (farm.lpSymbol.toLowerCase().includes(lowercaseQuery)) {
            return true
          }

          return false
        })
      }
      return farmsToDisplayWithAPY
    },
    [farmsLP, query, cakePrice, bnbPrice, ethPriceUsd, quickPriceUsd],
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const isActive = !pathname.includes('history')
  let farmsStaked = []
  if (isActive) {
    farmsStaked = stackedOnly ? farmsList(stackedOnlyFarms) : farmsList(activeFarms)
  } else {
    farmsStaked = farmsList(inactiveFarms)
  }

  farmsStaked = sortFarms(farmsStaked)

  const rowData = farmsStaked.map((farm) => {
    const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses } = farm
    const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('KyriosToken', 'KyriosToken')

    const row: RowProps = {
      apr: {
        value:
          farm.apy &&
          farm.apy.times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        multiplier: farm.multiplier,
        lpLabel,
        quoteTokenAdresses,
        quoteTokenSymbol,
        tokenAddresses,
        cakePrice,
        originalValue: farm.apy,
      },
      farm: {
        image: farm.quoteTokenSymbol.split(' ')[0].toLocaleLowerCase(),
        imagetwo: farm.isTokenOnly
          ? farm.tokenSymbol.split(' ')[0].toLowerCase()
          : farm.tokenSymbol.split(' ')[0].toLowerCase(),
        label: lpLabel,
        pid: farm.pid,
        otherExchange: farm.otherExchange,
        isTokenOnly: farm.isTokenOnly,
        multiplier: farm.multiplier,
      },
      earned: {
        earnings: farm.userData ? getBalanceNumber(new BigNumber(farm.userData.earnings)) : null,
        pid: farm.pid,
      },
      fee: {
        fee: farm.depositFeeBP,
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      get: {
        get: farm,
        otherExchange: farm.otherExchange,
        tokenAddresses,
        isTokenOnly: farm.isTokenOnly,
        quoteTokenAdresses,
        quoteTokenSymbol,
        label: lpLabel,
      },
      details: farm,
    }

    return row
  })

  const renderContent = (): JSX.Element => {
    if (viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
          switch (column.name) {
            case 'farm':
              return b.id - a.id
            case 'apr':
              if (a.original.apr.value && b.original.apr.value) {
                return Number(a.original.apr.value) - Number(b.original.apr.value)
              }

              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))

      return (
        <QueueAnim type="alpha" delay={40} duration={500}>
          <div key="1">
            <Table data={rowData} columns={columns} />{' '}
          </div>
        </QueueAnim>
      )
    }

    return (
      <div>
        <FlexLayout>
          <Route exact path={`${path}`}>
            {farmsStaked.map((farm) => (
              <FarmCard
                key={farm.pid}
                farm={farm}
                bnbPrice={bnbPrice}
                cakePrice={cakePrice}
                quickPrice={quickPriceUsd}
                ethPrice={ethPriceUsd}
                account={account}
                removed={false}
              />
            ))}
          </Route>
          <Route exact path={`${path}/history`}>
            {farmsStaked.map((farm) => (
              <FarmCard
                key={farm.pid}
                farm={farm}
                bnbPrice={bnbPrice}
                cakePrice={cakePrice}
                quickPrice={quickPriceUsd}
                ethPrice={ethPriceUsd}
                account={account}
                removed
              />
            ))}
          </Route>
        </FlexLayout>
      </div>
    )
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }
  const currentBlock = useBlock()
  const blocklink = `https://ftmscan.com/block/${currentBlock}`
  return (
    <>
      <Menu>
        <QueueAnim type="alpha" delay={40} duration={500}>
          <div key="1">
            {tokenMode ? <HeadDividerLeft /> : <HeadDivider />}
            <Page>
              <Flex>
                <Head>
                  {tokenMode ? (
                    <Text textAlign="right" fontSize="30px" ml="10px" color="text" mt="45px">
                      The Sage King is here to bless your wallet. <br /> Stake single tokens to earn Kyrios totally
                      worth it.
                    </Text>
                  ) : (
                    <Text textAlign="left" fontSize="30px" ml="10px" color="text" mt="40px">
                      Enter a different farming experience with Kyrios. <br /> Create and stake LP tokens to earn money.
                    </Text>
                  )}
                </Head>
              </Flex>
              <ControlContainer>
                <ViewControls>
                  <ToggleWrapper>
                    <Checkbox checked={stackedOnly} onChange={() => setStackedOnly(!stackedOnly)} scale="sm" />
                    <Text fontSize="14px" color="#dcdcdd">
                      {' '}
                      {TranslateString(1116, 'My Farms')}
                    </Text>
                  </ToggleWrapper>
                </ViewControls>
                <FilterContainer>
                  <LabelWrapper style={{ marginLeft: 16 }}>
                    <SearchInput onChange={handleChangeQuery} value={query} />
                  </LabelWrapper>
                </FilterContainer>
              </ControlContainer>{' '}
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
                <a href="https://spookyswap.finance/swap?outputCurrency=0xdbf8a44f447cf6fa300fa84c2aac381724b0c6dd">
                  <img src="/home_banner.png" alt="" />{' '}
                </a>
              </CTACards2>

              {renderContent()}
              <Flex mt="100px" justifyContent="center">
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
          </div>
        </QueueAnim>
      </Menu>
    </>
  )
}

export default Farms
