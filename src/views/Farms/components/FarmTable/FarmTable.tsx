import React, { useRef } from 'react'
import styled from 'styled-components'
import QueueAnim from 'rc-queue-anim'
import { useTable, Button, ChevronUpIcon, ColumnType } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'

import Row, { RowProps } from './Row'

export interface ITableProps {
  data: RowProps[]
  columns: ColumnType<RowProps>[]
  sortColumn?: string
}

const Container = styled.div`
  filter: ${({ theme }) => theme.card.dropShadow};
  width: 100%;
  border-radius: 0.6rem;
  margin: 0;
`

const TableWrapper = styled.div`
  overflow: visible;

  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledTable = styled.table`
  border-collapse: separate;
  border-spacing: 0px 14px;
  font-size: 15px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`

const TableBody = styled.tbody`
  & tr {
    background: #1c1b1c;

    td {
      font-size: 15px;
      vertical-align: middle;
      border-top: 1px solid #3d2f23;
      border-bottom: 1px solid #3d2f23;
    }
    td:first-child {
      border-left-style: solid;
      border-top-left-radius: 0.4rem;
      border-bottom-left-radius: 0.4rem;
      border-left: 1px solid #3d2f23;
    }
    td:last-child {
      border-right-style: transparent;
      border-bottom-right-radius: 0.4rem;
      border-top-right-radius: 0.4rem;
      border-right: 1px solid #3d2f23;
    }
  }
`

const TableContainer = styled.div`
  position: relative;
}
`

const ScrollButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
`

const FarmTable: React.FC<ITableProps> = (props) => {
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const TranslateString = useI18n()
  const { data, columns } = props

  const { rows } = useTable(columns, data, { sortable: true, sortColumn: 'farm' })

  const scrollToTop = (): void => {
    tableWrapperEl.current.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <QueueAnim type="alpha" delay={40} duration={500}>
      <div key="1">
        <Container>
          <TableContainer>
            <TableWrapper ref={tableWrapperEl}>
              <StyledTable>
                <TableBody>
                  {rows.map((row) => {
                    return <Row {...row.original} key={`table-row-${row.id}`} />
                  })}
                </TableBody>
              </StyledTable>
            </TableWrapper>
            <ScrollButtonContainer>
              <Button variant="text" onClick={scrollToTop}>
                {TranslateString(999, 'TOP')}
                <ChevronUpIcon color="primary" />
              </Button>
            </ScrollButtonContainer>
          </TableContainer>
        </Container>
      </div>
    </QueueAnim>
  )
}

export default FarmTable
