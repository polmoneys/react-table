import { type ReactNode } from 'react'

interface Props {
  id: string
  isFirstCell: boolean
  width: number
  children: ReactNode | string
  labelledby?: string
}

function RowCell(props: Props): JSX.Element {
  const { labelledby = '', id, isFirstCell, width, children } = props

  if (isFirstCell)
    return (
      <th scope="row" data-table="sticky" style={{ minWidth: width }} id={id}>
        {children}
      </th>
    )
  return (
    <td aria-labelledby={labelledby} style={{ minWidth: width }} id={id}>
      {children}
    </td>
  )
}

export default RowCell
