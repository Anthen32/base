import React, { useState, useRef } from 'react'
import { Input } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'

const StyledInput = styled(Input)`
  border-radius: 2px;
  margin-left: auto;
  font-size:13px;
  background: #1c1b1c;
  border: 1px solid rgb(61 47 35);
  height: 38px;
  color: #fff;
  border-radius: 0.4rem;
  
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #cf783d;
  }
  :-ms-input-placeholder {
     color: #cf783d;
  }
`
const InputWrapper = styled.div`
  position: relative;
  
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 234px;
    display: block;
    font-size:13px;
  }
`

const Container = styled.div<{ toggled: boolean }>``

interface Props {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchInput: React.FC<Props> = ({ value, onChange }) => {
  const [toggled, setToggled] = useState(false)
  const inputEl = useRef(null)

  return (
    <Container toggled={toggled}>
      <InputWrapper>
        <StyledInput
          ref={inputEl}
          value={value}
          onChange={onChange}
          placeholder="Search..."
          onBlur={() => setToggled(false)}
        />
      </InputWrapper>
    </Container>
  )
}

export default SearchInput
