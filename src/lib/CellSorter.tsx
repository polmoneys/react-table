import { Fragment } from 'react'
import { IconCaretDown, IconCaretUp } from './Icon/Icon'

interface Props {
  isSorting: boolean
  isAscending: boolean
}

function CellSorter(props: Props): JSX.Element {
  const { isAscending, isSorting } = props
  if (!isSorting) return <Fragment />
  return (
    <Fragment>
      {isAscending ? (
        <IconCaretUp label="sorting ascending" data-table-sort="ascending" />
      ) : (
        <IconCaretDown
          label="sorting descending"
          data-table-sort="descending"
        />
      )}
    </Fragment>
  )
}

export default CellSorter
