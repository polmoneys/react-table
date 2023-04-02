import { useRef, useState, useCallback, type MouseEvent } from 'react'

interface SelectionRectProps {
  onSelectionEnd?: (rect: RectCoordinates | null) => void
}

export interface RectCoordinates {
  x: number
  y: number
  width: number
  height: number
}

const SelectionRect = (props: SelectionRectProps): JSX.Element => {
  const { onSelectionEnd } = props
  const [startPoint, setStartPoint] = useState<RectCoordinates | null>(null)
  const [rect, setRect] = useState<RectCoordinates | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const onMouseDown = useCallback(
    (event: MouseEvent<SVGSVGElement>) => {
      const svg = svgRef.current
      if (svg != null) {
        const point = svg.createSVGPoint()
        point.x = event.clientX
        point.y = event.clientY
        const { x, y } = point.matrixTransform(svg.getScreenCTM()?.inverse())

        setStartPoint({ x, y, width: 0, height: 0 })
      }
    },
    [setStartPoint],
  )

  const onMouseMove = useCallback(
    (event: MouseEvent<SVGSVGElement>) => {
      if (startPoint != null) {
        const svg = svgRef.current
        if (svg != null) {
          const point = svg.createSVGPoint()
          point.x = event.clientX
          point.y = event.clientY
          const { x, y } = point.matrixTransform(svg.getScreenCTM()?.inverse())

          setRect({
            x: Math.min(startPoint.x, x),
            y: Math.min(startPoint.y, y),
            width: Math.abs(x - startPoint.x),
            height: Math.abs(y - startPoint.y),
          })
        }
      }
    },
    [startPoint],
  )

  const onMouseUp = useCallback(() => {
    onSelectionEnd?.(rect)
    setStartPoint(null)
    setRect(null)
  }, [onSelectionEnd, rect])

  return (
    <svg
      ref={svgRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: 99,
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {rect != null && (
        <rect
          x={rect.x}
          y={rect.y}
          width={rect.width}
          height={rect.height}
          fill="rgba(0, 0, 255, 0.2)"
          stroke="blue"
        />
      )}
    </svg>
  )
}

export default SelectionRect
