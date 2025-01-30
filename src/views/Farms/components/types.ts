export type TableProps = {
  data?: TableDataTypes[]
  selectedFilters?: string
  sortBy?: string
  sortDir?: string
  onSort?: (value: string) => void
}

export type ColumnsDefTypes = {
  id: number
  label: string
  name: string
  translationId: number
  sortable: boolean
}

export type ScrollBarProps = {
  ref: string
  width: number
}

export type TableDataTypes = {
  POOL: string
  APY: string
  EARNED: string
  STAKED: string
  DETAILS: string
  LINKS: string
  GET: string
}

export const MobileColumnSchema: ColumnsDefTypes[] = [
  {
    id: 1,
    name: 'farm',
    translationId: 999,
    sortable: true,
    label: '',
  },
  {
    id: 2,
    name: 'earned',
    translationId: 1072,
    sortable: true,
    label: 'Balance',
  },
  {
    id: 3,
    name: 'apr',
    translationId: 736,
    sortable: true,
    label: 'APR',
  },
  {
    id: 8,
    name: 'fee',
    translationId: 999,
    sortable: true,
    label: 'Fee',
  },
  {
    id: 6,
    name: 'details',
    translationId: 999,
    sortable: true,
    label: '',
  },
]

export const DesktopColumnSchema: ColumnsDefTypes[] = [
  {
    id: 1,
    name: 'farm',
    translationId: 999,
    sortable: true,
    label: '',
  },
  {
    id: 2,
    name: 'earned',
    translationId: 1072,
    sortable: true,
    label: 'Rewards',
  },
    {
    id: 8,
    name: 'fee',
    translationId: 999,
    sortable: true,
    label: 'Fee',
  },
  {
    id: 3,
    name: 'apr',
    translationId: 736,
    sortable: true,
    label: 'APR',
  },
  {
    id: 4,
    name: 'liquidity',
    translationId: 999,
    sortable: true,
    label: 'TVL',
  },
  {
    id: 5,
    name: 'multiplier',
    translationId: 999,
    sortable: true,
    label: 'Weight',
  },
  {
    id: 7,
    name: 'details',
    translationId: 999,
    sortable: true,
    label: '',
  },
]

export enum ViewMode {
  'TABLE' = 'TABLE',
  'CARD' = 'CARD',
}
