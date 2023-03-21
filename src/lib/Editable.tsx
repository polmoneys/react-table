import { useState, type ChangeEvent, type KeyboardEvent, Fragment } from 'react'
import { type CellValue } from './interfaces/Cell'

interface Props {
  label: string
  value: string
  onChange?: (newValue: CellValue) => void
}

function CellEditable(props: Props): JSX.Element {
  const { label, value, onChange } = props

  const [editingValue, setEditingValue] = useState(value)

  const onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEditingValue(event.target.value)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      ;(event.target as HTMLInputElement).blur()
    }
  }

  const onBlur = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.trim() === '') return
    setEditingValue?.(event.target.value)
    onChange?.(event.target.value)
  }

  return (
    <input
      name={label}
      value={editingValue}
      {...(editingValue === '' && { placeholder: 'Write' })}
      onChange={onInputChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      data-theme=""
    />
  )
}

export default CellEditable
