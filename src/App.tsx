import React, { useEffect, lazy } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { ResetCSS } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import { useFetchPublicData } from 'state/hooks'
import useSetReferralCookie from 'hooks/referral'
import useGetDocumentTitlePrice from './hooks/useGetDocumentTitlePrice'
import GlobalStyle from './style/Global'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import ToastListener from './components/ToastListener'
import PageLoader from './components/PageLoader'
import GlobalCheckBullHiccupClaimStatus from './views/Collectibles/components/GlobalCheckBullHiccupClaimStatus'
import history from './routerHistory'

const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const Dividends = lazy(() => import('./views/Pools'))
const NotFound = lazy(() => import('./views/NotFound'))
const Referral = lazy(() => import('./views/Referral'))

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  useEffect(() => {
    console.warn = () => null
  }, [])
  useSetReferralCookie()
  useEagerConnect()
  useFetchPublicData()
  useGetDocumentTitlePrice()

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <SuspenseWithChunkError fallback={<PageLoader />}>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/farms">
            <Farms />
          </Route>
          <Route path="/pools">
            <Farms tokenMode />
          </Route>
          {/* <Route path="/referral"> */}
          {/* <Referral /> */}
          {/* </Route> */}
          <Route path="/dividends">
            <Dividends />
          </Route>
          {/* <Route path="/nft"> */}
          {/*  <Nft /> */}
          {/* </Route> */}
          {/* Redirect */}
          {/* <Route path="/staking"> */}
          {/*  <Redirect to="/pools" /> */}
          {/* </Route> */}
          {/* <Route path="/syrup"> */}
          {/*  <Redirect to="/pools" /> */}
          {/* </Route> */}
          {/* 404 */}
          <Route component={NotFound} />
        </Switch>
      </SuspenseWithChunkError>
      <ToastListener />
      <GlobalCheckBullHiccupClaimStatus />
    </Router>
  )
}

export default React.memo(App)
