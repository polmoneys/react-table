import { type ReactNode } from 'react'
import { type CellValue } from './Cell'

export type Features = 'sort' | 'resize' | 'drag'

export interface TableCol {
  id: string
  label: string
  formatter?: (value: CellValue) => string | boolean | unknown[] | ReactNode
  disable?: Features[]
  className?: string
}

export default interface TableCols extends Array<TableCol> {}
