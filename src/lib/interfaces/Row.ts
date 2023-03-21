import { type CellValue } from './Cell'

export interface TableRow {
  id: string
  children?: TableRowRows
}

export default interface TableRowRows extends Array<TableRow> {}

export interface RowExpandable extends Record<string, CellValue | unknown[]> {}
