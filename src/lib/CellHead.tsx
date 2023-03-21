import { type AriaAttributes, type ReactNode } from 'react'
import { type Sorter as SorterInterface } from './interfaces/Pager'

interface Props {
  id: string
  isFirstCell: boolean
  isSorting: boolean
  width: number
  sort: SorterInterface
  onSort: () => void
  children: ReactNode
  className: string
}

function HeadCell(props: Props): JSX.Element {
  const {
    id,
    isSorting,
    sort,
    isFirstCell,
    width,
    children,
    className,
    onSort,
  } = props

  let ariaSortProps: AriaAttributes = {}
  if (sort !== undefined) {
    const { direction } = sort
    if (isSorting) {
      ariaSortProps = {
        'aria-sort': direction,
      }
    }
  }
  return (
    <th
      id={id}
      className={className}
      style={{
        minWidth: width,
        ...(isFirstCell && { position: 'sticky' }),
      }}
      {...(isFirstCell && { 'data-table': 'sticky' })}
      {...ariaSortProps}
      onClick={onSort}
    >
      {children}
    </th>
  )
}

export default HeadCell
