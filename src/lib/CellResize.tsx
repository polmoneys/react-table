import { Fragment } from 'react'

interface Props {
  onResize: (event: React.MouseEvent) => void
  enabled: boolean
  label: string
}

const CellResize = (props: Props): JSX.Element => {
  const { enabled, label, onResize } = props

  if (!enabled) return <Fragment />
  return (
    <div
      data-table="resize"
      aria-label={`Resize column ${label}`}
      onMouseDown={event => {
        onResize(event)
      }}
    />
  )
}

export default CellResize
