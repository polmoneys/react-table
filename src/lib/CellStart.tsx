import { Fragment } from 'react'

interface Props {
  variant?: 'select' | 'expand'
}

function CellStart(props: Props): JSX.Element {
  const { variant } = props
  if (variant === undefined) return <Fragment />
  return (
    <th style={{ minWidth: '64px' }}>
      <span className="visually-hidden">
        {variant === 'select' ? 'Select' : 'Toggle'}
      </span>
    </th>
  )
}

export default CellStart
