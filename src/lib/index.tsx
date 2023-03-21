import { useState, type MouseEvent, useMemo } from 'react'
import { type TableProps as Props } from './interfaces/Props'
import { type TableRow } from './interfaces/Row'
import { type TableCol } from './interfaces/Col'
import HeadCell from './CellHead'
import CellSorter from './CellSorter'
import Row from './Row'
import CellResize from './CellResize'
import CellStart from './CellStart'
import CellEnd from './CellEnd'
import { IconHandle } from './Icon/Icon'
import { classes, initialOptions, isDisabled } from './utils'
import './index.css'

function Table<T extends TableRow>(props: Props<T>): JSX.Element {
  const {
    label,
    columns,
    rows,
    sort,
    onSort,
    enableReorder = initialOptions.reorder,
    enableResize = initialOptions.resize,
    firstColumnWidth = initialOptions.firstWidth,
    defaultColumnWidth = initialOptions.defaultWidth,
    maxResizeWidth = initialOptions.maxWidth,
    variant,
    start,
    end,
    selections = initialOptions.selections,
    onChangeCell,
  } = props

  const [columnOrder, setOrder] = useState<string[]>(
    columns.map(head => head.id),
  )
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const onDragStart = (pos: number): void => {
    if (enableReorder) {
      setDraggedIndex(pos)
    }
  }

  const onDragEnter = (pos: number): void => {
    if (enableReorder) {
      setHoveredIndex(pos)
    }
  }
  const initialWidths = useMemo(
    // TODO: filter out columns[0]
    () => [firstColumnWidth, ...columns.map(() => defaultColumnWidth)],
    [],
  )

  const [columnWidths, setWidths] = useState<number[]>(initialWidths)

  const onDragEnd = (): void => {
    if (enableReorder) {
      if (
        draggedIndex !== null &&
        hoveredIndex !== null &&
        draggedIndex !== hoveredIndex
      ) {
        const newColumnOrder = [...columnOrder]
        newColumnOrder.splice(draggedIndex, 1)
        newColumnOrder.splice(hoveredIndex, 0, columnOrder[draggedIndex])
        setOrder(newColumnOrder)
        setWidths(initialWidths)
      }
      setDraggedIndex(null)
      setHoveredIndex(null)
    }
  }

  const onResize = (index: number, event: MouseEvent): void => {
    const initialX = event.clientX
    const initialWidth = columnWidths[index]

    const onMouseMove = (moveEvent: MouseEvent): void => {
      const newWidth = Math.min(
        initialWidth + moveEvent.clientX - initialX,
        maxResizeWidth,
      )

      setWidths(prevWidths => {
        const newWidths = [...prevWidths]
        newWidths[index] = newWidth
        return newWidths
      })
    }

    const onMouseUp = (): void => {
      window.removeEventListener('mousemove', onMouseMove as any)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove as any)
    window.addEventListener('mouseup', onMouseUp)
  }

  const tableCaption = useMemo(() => `${label.slice(0, 20)}-caption`, [])

  return (
    <div
      data-table=""
      role="region"
      aria-labelledby={tableCaption}
      tabIndex={0}
    >
      <table>
        <caption id={tableCaption} className="visually-hidden">
          {label}
        </caption>
        <thead>
          <tr>
            <CellStart variant={variant} />

            {columnOrder.map((columnId, pos) => {
              const headColumn = columns.find(
                head => head.id === columnId,
              ) as TableCol
              const isFirstCell = pos === 0
              const className = classes(
                draggedIndex === pos && 'dragged',
                hoveredIndex === pos && 'hovered',
                headColumn?.className,
              )
              const canSort = !isDisabled(headColumn, 'sort')
              const isSorting = sort.id === headColumn.id
              const oppositeSortDirection =
                sort.direction === 'ascending' ? 'descending' : 'ascending'
              const canDrag = !isDisabled(headColumn, 'drag')
              const canResize = !isDisabled(headColumn, 'resize')

              return (
                <HeadCell
                  key={columnId}
                  id={columnId}
                  sort={sort}
                  onSort={() => {
                    if (!canSort) return
                    onSort(headColumn.id, oppositeSortDirection)
                  }}
                  width={columnWidths[pos]}
                  isFirstCell={isFirstCell}
                  isSorting={isSorting}
                  className={className}
                >
                  {enableReorder && canDrag && (
                    <span
                      data-table="handle"
                      draggable
                      tabIndex={0}
                      aria-roledescription={`Draggable column header for ${headColumn.label}`}
                      onDragStart={() => {
                        onDragStart(pos)
                      }}
                      onDragEnter={() => {
                        onDragEnter(pos)
                      }}
                      onDragEnd={onDragEnd}
                    >
                      <IconHandle label="" />
                      {headColumn.label}
                    </span>
                  )}
                  {(!enableReorder || isFirstCell) && headColumn.label}
                  {canSort && (
                    <CellSorter
                      isSorting={isSorting}
                      isAscending={sort.direction === 'ascending'}
                    />
                  )}
                  <CellResize
                    enabled={enableResize && canResize}
                    label={headColumn.label}
                    onResize={event => {
                      onResize(pos, event)
                    }}
                  />
                </HeadCell>
              )
            })}
            <CellEnd end={end} />
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, pos) => {
            return (
              <Row
                columnOrder={columnOrder}
                key={`${pos}-body-table-row`}
                rowPosition={pos}
                columns={columns}
                row={row}
                columnWidths={columnWidths}
                variant={variant}
                start={start}
                end={end}
                selections={selections}
                onChangeCell={onChangeCell}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
