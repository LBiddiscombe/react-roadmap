import React, { useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import Module from './components/Module'
import ColumnTitles from './components/ColumnTitles'
import dragEnd from './modules/dragEnd'
import { useTaskStore } from './hooks/useTaskStore'

function App() {
  const store = useTaskStore()

  useEffect(() => {
    store.loadInitialData()
    setTimeout(function() {
      store.addTask('m0', 'c1', 'A new task after 3 seconds')
    }, 3000)
  }, [store])

  const onDragEnd = result => {
    dragEnd(result, store)
  }

  return (
    <div>
      <TempHeader>Temp Header</TempHeader>
      <DragDropContext onDragEnd={onDragEnd}>
        <ColumnTitles />
        {store.modules.map(module => (
          <Module key={module.id} moduleId={module.id} />
        ))}
      </DragDropContext>
    </div>
  )
}

const TempHeader = styled.div`
  background-color: var(--bg0);
  color: var(--fg0);
  text-align: center;
  padding: 1rem 0;
  font-size: 2rem;
`

export default observer(App)
