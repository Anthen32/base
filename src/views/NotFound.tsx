import React from 'react'
import styled from 'styled-components'
import { Button, Heading, Text, LogoIcon } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import Menu from 'components/Menu'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 250px);
  justify-content: center;
  font-size: 40px;
  font-weight: 500;
  line-height: 1.05em;
  position: relative;
  text-align: center;
  background-image: linear-gradient(to left, #ffac49,#d32d29);
  background-size: 100%;
  background-repeat: repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
`

const NotFound = () => {
  return (
    <Menu>
    <Page>
      <StyledNotFound>
        <Text fontSize='200px'>404</Text>
        <Text fontSize='80px'>Roar not found.</Text>
        <Button variant="secondary" as="a" href="/" scale="md">
        <Text color="#fff" fontSize='16px'>Go to Home</Text>
        </Button>
      </StyledNotFound>
    </Page>
    </Menu>
  )
}

export default NotFound
