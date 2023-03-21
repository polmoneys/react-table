import { useState } from 'react'
import { Leva } from 'leva'
import Stories from './stories'
import { columns, columnsWithEditable } from './stories/columns'
import { rows, rowsChildren } from './stories/row'
import { type Variants } from './stories/utils'
import './app.css'

export default function App(): JSX.Element {
  const [demo, setDemo] = useState<Variants>('default')

  return (
    <main>
      <Leva hideCopyButton titleBar={{ title: '<Table/>' }} />
      {
        {
          default: (
            <Stories
              columns={columnsWithEditable}
              setter={setDemo}
              films={rows}
            />
          ),
          expand: (
            <Stories.Expand
              columns={columns}
              setter={setDemo}
              films={rowsChildren}
            />
          ),
          select: (
            <Stories.Select columns={columns} setter={setDemo} films={rows} />
          ),
        }[demo]
      }
    </main>
  )
}
