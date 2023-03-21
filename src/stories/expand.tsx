import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useControls, folder, button } from 'leva'
import { genericSort, useChips, type Variants } from './utils'
import Table from '@/lib'
import { type SortDirection, type Sorter } from '@/lib/interfaces/Pager'

interface Props {
  setter: Dispatch<SetStateAction<Variants>>
  films: any[]
  columns: any[]
}

function Expand(props: Props): JSX.Element {
  const { setter, films, columns } = props

  useControls({
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
      enableReorder
      enableResize
      variant="expand"
      label={'movies'}
      // start={({ row }) => {
      //   return <td> </td>
      // }}
      end={({ row }) => {
        return (
          <td>
            <button
              type="button"
              data-theme=""
              onClick={() => {
                console.log({ row })
              }}
            >
              Edit
            </button>
          </td>
        )
      }}
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
export default Expand
