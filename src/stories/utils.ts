import { type Dispatch, useReducer } from 'react'
export interface Sorter<T> {
  property: Extract<keyof T, string | number | Date>
  isDescending: boolean
}

export function genericSort<T>(objectA: T, objectB: T, sorter: Sorter<T>): any {
  const result = (): number => {
    if (objectA[sorter.property] > objectB[sorter.property]) {
      return 1
    } else if (objectA[sorter.property] < objectB[sorter.property]) {
      return -1
    } else {
      return 0
    }
  }

  return sorter.isDescending ? result() * -1 : result()
}

export const VariantOptions = ['default', 'expand', 'select'] as const
export type Variants = (typeof VariantOptions)[number]

type State = Set<string>
const initialState: State = new Set()

type Action =
  | {
      type: 'add'
      name: string
    }
  | {
      type: 'remove'
      name: string
    }
  | {
      type: 'clear'
    }

const reducer = (state: State, action: Action): State => {
  const { type } = action

  switch (type) {
    case 'add': {
      if (state.has(action.name)) {
        return state
      }
      return new Set(state).add(action.name)
    }
    case 'remove': {
      const nextState = new Set(state)
      nextState.delete(action.name)
      return nextState
    }
    case 'clear': {
      return new Set()
    }
    default:
      return state
  }
}

interface Props {
  initial?: string[]
}

export const useChips = (props?: Props): [State, Dispatch<Action>] =>
  useReducer(reducer, new Set(props?.initial ?? initialState))

export interface NumberFormatOptions {
  locale?: string | string[]
  style?: Intl.NumberFormatOptions['style']
  unit?: Intl.NumberFormatOptions['unit']
  currency?: Intl.NumberFormatOptions['currency']
  notation?: Intl.NumberFormatOptions['notation']
  currencySign?: Intl.NumberFormatOptions['currencySign']
  currencyDisplay?: Intl.NumberFormatOptions['currencyDisplay']
  useGrouping?: Intl.NumberFormatOptions['useGrouping']
  minimumIntegerDigits?: Intl.NumberFormatOptions['minimumIntegerDigits']
  minimumFractionDigits?: Intl.NumberFormatOptions['minimumFractionDigits']
  maximumFractionDigits?: Intl.NumberFormatOptions['maximumFractionDigits']
  minimumSignificantDigits?: Intl.NumberFormatOptions['minimumSignificantDigits']
  maximumSignificantDigits?: Intl.NumberFormatOptions['maximumSignificantDigits']
}

export function formatNumber(
  value: number,
  options: NumberFormatOptions = {},
): string {
  const {
    locale = 'en-US',
    style = 'decimal',
    currency = 'USD',
    currencySign,
    currencyDisplay = 'symbol',
    useGrouping = true,
    minimumIntegerDigits = 1,
    minimumFractionDigits = 0,
    maximumFractionDigits = 3,
    minimumSignificantDigits,
    maximumSignificantDigits,
    unit,
    notation,
  } = options

  const numberFormat = new Intl.NumberFormat(locale, {
    style,
    currency,
    currencySign,
    currencyDisplay,
    useGrouping,
    minimumIntegerDigits,
    minimumFractionDigits,
    maximumFractionDigits,
    minimumSignificantDigits,
    maximumSignificantDigits,
    unit,
    notation,
  })

  return numberFormat.format(value)
}

export interface DateTimeFormatOptions {
  locale?: string | string[]
  timeZone?: Intl.DateTimeFormatOptions['timeZone']
  hour12?: Intl.DateTimeFormatOptions['hour12']
  weekday?: Intl.DateTimeFormatOptions['weekday']
  era?: Intl.DateTimeFormatOptions['era']
  year?: Intl.DateTimeFormatOptions['year']
  month?: Intl.DateTimeFormatOptions['month']
  day?: Intl.DateTimeFormatOptions['day']
  hour?: Intl.DateTimeFormatOptions['hour']
  minute?: Intl.DateTimeFormatOptions['minute']
  second?: Intl.DateTimeFormatOptions['second']
  timeZoneName?: Intl.DateTimeFormatOptions['timeZoneName']
}

export function formatDateTime(
  date: Date,
  options: DateTimeFormatOptions = {},
): string {
  const {
    locale = 'en-US',
    timeZone = undefined,
    hour12 = options.timeZoneName !== undefined,
    weekday,
    era,
    year = 'numeric',
    month = 'numeric',
    day = 'numeric',
    hour,
    minute,
    second,
    timeZoneName,
  } = options

  const dateTimeFormat = new Intl.DateTimeFormat(locale, {
    timeZone,
    hour12,
    weekday,
    era,
    year,
    month,
    day,
    ...(hour !== undefined ? { hour } : {}),
    ...(minute !== undefined ? { minute } : {}),
    ...(second !== undefined ? { second } : {}),
    timeZoneName,
  })

  return dateTimeFormat.format(date)
}
