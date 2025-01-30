import React from 'react'
import styled from 'styled-components'
import { Card, Text, CardHeader, Flex, BaseLayout } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import UnlockButton from 'components/UnlockButton'
import Menu from 'components/Menu'
import Page from 'components/layout/Page'
import useBlock from 'hooks/useBlock'
import ReferralLink from './components/ReferralLink'
import TotalReferralCount from './components/TotalReferralCount'
import TotalReferralCommissions from './components/TotalReferralCommissions'

const Actions = styled.div``

const Contnr = styled.div`
  -webkit-box-align: stretch;
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 36px;
`
const CTACards = styled(BaseLayout)`
  align-items: stretch;
  margin-bottom: 32px;
  margin-top: 100px;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 6;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
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
    color: #cf783d;
    z-index:200;
}
`
const StatusBlock = styled.div`
width: 8px;
height: 8px;
min-height: 8px;
min-width: 8px;
margin-left: 0.5rem;
margin-top: 1px;
border-radius: 50%;
position: relative;
background-color: #cf783d;
}
`
const Referral: React.FC = () => {
  const { account } = useWeb3React()
  const currentBlock = useBlock()
  const blocklink = `https://ftmscan.com/block/${currentBlock}`
  return (
    <Menu>
      <Page>
      <CurrentBlock><a href={blocklink}>{currentBlock}</a><StatusBlock>-</StatusBlock></CurrentBlock>

        <Contnr>
          {account ? (
            <div>
              <CTACards>
                <Card>
                  <CardHeader>
                    <Text color="primary" textAlign="center">
                      Total referral count:
                    </Text>
                  </CardHeader>
                  <TotalReferralCount />
                </Card>
                <Card>
                  <CardHeader>
                    <Text color="primary" textAlign="center">
                      Total referral commission in KYRIOS:
                    </Text>{' '}
                  </CardHeader>
                  <TotalReferralCommissions />
                </Card>
              </CTACards>
              <Card>
                <Actions>
                  <CardHeader>
                    <Text color="primary" textAlign="center">Invite a Friend:</Text>
                  </CardHeader>
                  <ReferralLink />
                </Actions>
              </Card>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <Text color="primary" textAlign="center">Invite a Friend</Text>
              </CardHeader>
              <Text mt="20px" textAlign="center">
                Unlock wallet to get your unique referral link.
              </Text>
              <Flex mr="100px" mt="20px" mb="30px" ml="100px" justifyContent="center">
                <UnlockButton />
              </Flex>
            </Card>
          )}
        </Contnr>
      </Page>{' '}
    </Menu>
  )
}

export default Referral
