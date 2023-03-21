import {
  type Dispatch,
  type SetStateAction,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useControls, folder, button } from 'leva'
import { genericSort, useChips, type Variants } from './utils'
import Table from '@/lib'
import { IconBookmark, IconDash } from '@/lib/Icon/Icon'
import { type SortDirection, type Sorter } from '@/lib/interfaces/Pager'

interface Props {
  setter: Dispatch<SetStateAction<Variants>>
  films: any[]
  columns: any[]
}

export default function Distance(props: Props): JSX.Element {
  const { setter, films, columns } = props

  const { cards } = useControls({
    items: folder(
      {
        cards: {
          label: 'Amount',
          min: 6,
          max: 25,
          step: 1,
          value: 12,
        },
      },
      { color: 'yellow' },
    ),
    demos: folder(
      {
        default: button(get => {
          setter('default')
        }),
        expand: button(get => {
          setter('expand')
        }),
        select: button(get => {
          setter('select')
        }),
      },
      { color: '#007bff' },
    ),
  })
  const [selectedRows, setSelection] = useChips({ initial: [] })
  const [sort, setSort] = useState<Sorter>({
    id: '',
    direction: 'descending',
  })
  const sorted = useMemo(() => {
    return films?.sort((filmA, filmB) =>
      genericSort<any>(filmA, filmB, {
        property: sort.id,
        isDescending: sort.direction === 'descending',
      }),
    )
  }, [sort, films])
  return (
    <Table
      selections={selectedRows}
      enableReorder
      enableResize
      variant="select"
      label={'movies'}
      start={({ row, isSelected }) => {
        return (
          <td>
            <button
              type="button"
              data-theme=""
              onClick={() => {
                setSelection({
                  type: isSelected ? 'remove' : 'add',
                  name: row.id.toString(),
                })
              }}
            >
              {isSelected ? (
                <IconBookmark
                  label=""
                  fill={
                    isSelected ? 'var(--error-100)!important' : 'currentColor'
                  }
                />
              ) : (
                <IconDash label="" />
              )}
            </button>
          </td>
        )
      }}
      // end={({ row }) => {
      //   return (
      //     <td>
      //       <Button
      //         onClick={() => {
      //           console.log({ row })
      //         }}
      //       >
      //         Edit
      //       </Button>
      //     </td>
      //   )
      // }}
      columns={columns}
      rows={sorted}
      sort={sort}
      onSort={(id: string, direction: SortDirection) => {
        setSort({
          id,
          direction,
        })
      }}
      aria-hidden="true"
    />
  )
}
