import { type Dispatch, type SetStateAction, useMemo, useState } from 'react'
import { useControls, folder, button } from 'leva'
import { genericSort, type Variants } from './utils'
import Select from './select'
import Expand from './expand'
import Table from '@/lib'
import { type SortDirection, type Sorter } from '@/lib/interfaces/Pager'

interface Props {
  setter: Dispatch<SetStateAction<Variants>>
  films: any[]
  columns: any[]
}

function Stories(props: Props): JSX.Element {
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
      label={'movies'}
      columns={columns}
      rows={sorted}
      sort={sort}
      onSort={(id: string, direction: SortDirection) => {
        setSort({
          id,
          direction,
        })
      }}
      onChangeCell={(newValue, rowId) => {
        console.log({ newValue, rowId })
      }}
    />
  )
}

Stories.Expand = Expand
Stories.Select = Select

export default Stories
