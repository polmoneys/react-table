import { type RectCoordinates } from './Rect'
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

export const isRowInsideRect = (
  rowRect: DOMRect,
  selectionRect: RectCoordinates,
): boolean => {
  const { x: cellX, y: cellY, width: cellWidth, height: cellHeight } = rowRect
  const {
    x: rectX,
    y: rectY,
    width: rectWidth,
    height: rectHeight,
  } = selectionRect
  return (
    Math.max(cellX, rectX) < Math.min(cellX + cellWidth, rectX + rectWidth) &&
    Math.max(cellY, rectY) < Math.min(cellY + cellHeight, rectY + rectHeight)
  )
}
