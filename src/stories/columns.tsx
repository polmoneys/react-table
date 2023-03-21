import CellEditable from '@/lib/Editable'
import { type CellValue } from '@/lib/interfaces/Cell'
import type TableCols from '@/lib/interfaces/Col'
import { formatDateTime, formatNumber } from './utils'

export const columns: TableCols = [
  {
    label: 'Title',
    id: 'title',
    disable: ['sort', 'resize', 'drag'],
  },
  {
    label: 'Episode',
    id: 'episode',
  },
  {
    label: 'Has Leia ?',
    id: 'hasLeiaInIt',
    formatter: (value: CellValue) => value.toString(),
  },
  {
    label: 'Premiere',
    id: 'premiere',
    formatter: (value: CellValue) =>
      formatDateTime(value as Date, {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      }),
  },
  {
    label: 'Description',
    id: 'description',
    formatter: (value: CellValue) => (value as string).slice(0, 30),
  },
  {
    label: 'Viewers',
    id: 'espectadores',
    formatter: (value: CellValue) =>
      formatNumber(value as number, {
        notation: 'compact',
      }),
  },
  {
    label: 'Box office',
    id: 'ingresos',
    formatter: (value: CellValue) =>
      formatNumber(value as number, {
        currency: 'USD',
        style: 'currency',
      }),
  },
]

export const columnsWithEditable: TableCols = [
  ...columns,
  {
    label: 'Notes',
    id: 'review',
    formatter: (value: CellValue) => (
      <CellEditable label="Notes" value={value as string} />
    ),
  },
]
