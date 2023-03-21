import {
  Fragment,
  useEffect,
  useState,
  isValidElement,
  cloneElement,
} from 'react'
import { type TableRowProps as Props } from './interfaces/Props'
import { type TableRow } from './interfaces/Row'
import { type CellValue } from './interfaces/Cell'
import { type TableCol } from './interfaces/Col'
import CellEmpty from './CellEmpty'
import RowCell from './CellRow'
import RowExpand from './RowExpand'
import { classes } from './utils'

function Row<T extends TableRow>(props: Props<T>): JSX.Element {
  const {
    columnOrder,
    columns,
    row,
    columnWidths,
    rowPosition,
    variant,
    start,
    end,
    id,
    selections,
    onChangeCell,
  } = props

  const [expanded, setExpandedStatus] = useState(false)

  const hasVariant = variant !== undefined
  const hasChildren = hasVariant && row?.children !== undefined
  const hasStart = hasVariant && variant === 'select'
  const isSelected = [...selections].includes(row.id as unknown as string)
  const onChange = (newValue: string): void => {
    onChangeCell?.(newValue, row.id)
  }
  return (
    <Fragment>
      <tr
        {...(id !== undefined && { id })}
        className={classes(isSelected && 'selected')}
      >
        {hasVariant && row?.children !== undefined && (
          <RowExpand
            onExpand={() => {
              setExpandedStatus(prev => !prev)
            }}
            id={`${rowPosition}-expand-button`}
            expanded={expanded}
            controls={row.children
              .map((_, pos) => `controls-${columnOrder.length + pos}`)
              .join(' ')}
            label={`${row?.children?.length ?? 0} more from`}
            labelledby={`${rowPosition}-expand-button`}
          />
        )}
        {hasStart && start?.({ row, isSelected })}
        {hasVariant && !hasStart && !hasChildren && <CellEmpty />}

        {columnOrder.map((columnId, pos) => {
          const column = columns.find(
            header => header.id === columnId,
          ) as TableCol

          const value = row[column.id as keyof T]
          const { formatter = (value: CellValue) => value } = column
          const rowId = `${rowPosition}-row`
          const isFirstCell = pos === 0

          return (
            <RowCell
              width={columnWidths[pos]}
              id={rowId}
              isFirstCell={isFirstCell}
              {...(!isFirstCell && {
                labelledby: `${rowId} ${column.id}`,
              })}
              key={
                isFirstCell ? `${pos}-${rowId}-sticky` : `${pos}-${rowId}-cell`
              }
            >
              {isValidElement(formatter(value))
                ? cloneElement(formatter(value as JSX.Element), {
                    onChange,
                    value,
                  })
                : formatter(value as CellValue)}
            </RowCell>
          )
        })}
        {end?.({ row })}
      </tr>
      {expanded &&
        row?.children !== undefined &&
        (row?.children ?? []).map((row, pos) => (
          <Row
            row={row as T}
            id={`controls-${columnOrder.length + pos}`}
            key={pos + columnOrder.length}
            rowPosition={rowPosition}
            columnOrder={columnOrder}
            columnWidths={columnWidths}
            columns={columns}
            variant={variant}
            start={start as any}
            end={end as any}
            selections={selections}
          />
        ))}
    </Fragment>
  )
}

export default Row
