export interface Pager {
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export type SortDirection = 'ascending' | 'descending'

export interface Sorter {
  id: string
  direction: SortDirection
}
