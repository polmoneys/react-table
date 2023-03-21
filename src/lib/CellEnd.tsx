import { Fragment } from 'react'
import { type RenderProp } from './interfaces/Props'

interface Props<T> {
  end?: RenderProp<{ row: T }, HTMLElement>
}

function CellEnd<T>(props: Props<T>): JSX.Element {
  const { end } = props
  if (end === undefined) return <Fragment />
  return <th style={{ minWidth: '64px' }}>Actions</th>
}

export default CellEnd
