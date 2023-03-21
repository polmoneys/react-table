import { type ComponentProps, type ReactElement } from 'react'
import { type CellValue } from './Cell'
import type TableCols from './Col'
import { type SortDirection, type Sorter as SorterInterface } from './Pager'
import { type TableRow } from './Row'

interface PropsDrill<T extends TableRow> {
  columns: TableCols
  variant?: 'select' | 'expand'
  start?: RenderProp<{ row: T; isSelected: boolean }, HTMLElement>
  end?: RenderProp<{ row: T }, HTMLElement>
  onChangeCell?: (value: CellValue, rowId?: string) => void
}

export interface TableProps<T extends TableRow>
  extends PropsDrill<T>,
    ComponentProps<'table'> {
  label: string
  rows: T[]
  sort: SorterInterface
  onSort: (id: string, dir: SortDirection) => void
  enableReorder?: boolean
  enableResize?: boolean
  firstColumnWidth?: number
  defaultColumnWidth?: number
  maxResizeWidth?: number
  selections?: Set<string>
}

export interface TableRowProps<T extends TableRow> extends PropsDrill<T> {
  rowPosition: number
  columnOrder: string[]
  row: T
  columnWidths: number[]
  id?: string
  selections: Set<string>
}

export type RenderProp<TChildrenProps, TElement = any> = (
  props: TChildrenProps,
) => ReactElement<TElement>

// export type Scope = Umbrella | Compartment | ShareClass
// export type ScopeProperties = SmooshedObjectUnion<Scope>

type SmooshedObjectUnion<T> = {
  [K in T extends infer P ? keyof P : never]: T extends infer P
    ? K extends keyof P
      ? P[K]
      : never
    : never
}
