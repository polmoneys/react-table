import { IconCaretDown, IconCaretUp } from './Icon/Icon'

interface Props {
  onExpand: () => void
  id: string
  expanded: boolean
  controls: string
  label: string
  labelledby: string
}

const RowExpand = (props: Props): JSX.Element => {
  const { id, expanded, controls, labelledby, label, onExpand } = props

  return (
    <td style={{ minWidth: '64px' }}>
      <button
        data-theme=""
        onClick={() => {
          onExpand()
        }}
        type="button"
        id={id}
        aria-expanded={expanded ? 'true' : 'false'}
        aria-controls={controls}
        aria-label={label}
        aria-labelledby={labelledby}
      >
        {expanded ? <IconCaretUp label="" /> : <IconCaretDown label="" />}
      </button>
    </td>
  )
}

export default RowExpand
