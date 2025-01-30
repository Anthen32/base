import React from 'react'
import styled from 'styled-components'
import { Text, Button, Input, InputProps, Flex, Link } from '@pancakeswap-libs/uikit'
import useI18n from '../../hooks/useI18n'

interface ModalInputProps {
  max: string
  symbol: string
  onSelectMax?: () => void
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  placeholder?: string
  value: string
  addLiquidityUrl?: string
  inputTitle?: string
}

const StyledTokenInput = styled.div<InputProps>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.input};
  border-radius: 0.4rem;
  color: ${({ theme }) => theme.colors.text};
  padding: 8px 16px 8px 0;
  margin-top:22px;
  width: 100%;
  border: 0px solid #cf783d;
`

const StyledInput = styled(Input)`
  box-shadow: none;
  width: 60px;
  margin: 0 8px;
  padding: 0 8px;

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 80px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
  }
`

const StyledErrorMessage = styled(Text)`
  position: absolute;
  bottom: -22px;
  a {
    display: inline;
  }
`

const ModalInput: React.FC<ModalInputProps> = ({
  max,
  symbol,
  onChange,
  onSelectMax,
  value,
  addLiquidityUrl,
  inputTitle,
}) => {
  const TranslateString = useI18n()
  const isBalanceZero = max === '0' || !max

  const displayBalance = isBalanceZero ? '0' : parseFloat(max).toFixed(4)

  return (
    <div style={{ position: 'relative' }}>
      <StyledTokenInput isWarning={isBalanceZero}>
        <Flex alignItems="flex-end" justifyContent="space-around">
          <StyledInput onChange={onChange} placeholder="0" value={value} />
          <Button disabled={isBalanceZero} variant="subtle" width="100%" onClick={onSelectMax} mt="4px" mb="3px">
            <Text fontSize="12px">{TranslateString(452, 'Max')}</Text>
          </Button>
        </Flex>
      </StyledTokenInput>
    </div>
  )
}

export default ModalInput
