import { type Features, type TableCol } from './interfaces/Col'

export const isDisabled = (
  headColumn: TableCol,
  feature: Features,
): boolean => {
  return headColumn.disable?.includes(feature) ?? false
}

export const classes = (...params: unknown[]): string =>
  params.filter(Boolean).join(' ')

export const initialOptions = {
  reorder: false,
  resize: false,
  firstWidth: 340,
  defaultWidth: 200,
  maxWidth: 440,
  selections: new Set(''),
}
