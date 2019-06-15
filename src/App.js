import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'
import Module from './components/Module'
import ColumnTitles from './components/ColumnTitles'
import dragEnd from './modules/dragEnd'
import initialData from './initial-data'
import { useTaskStore } from './hooks/useTaskStore'

function App() {
  const [state, setState] = useState(initialData)
  const store = useTaskStore()

  useEffect(() => {
    store.loadInitialData()
  }, [store])

  const onDragEnd = result => {
    const newState = dragEnd(result, 'm0', state)
    if (newState) {
      setState(newState)
    }
    console.log(result)
    if (result.source.droppableId === result.destination.droppableId) {
      const [moduleId, columnId] = result.source.droppableId.split('|')

      console.log(moduleId, columnId)
      store.reorderTask(
        moduleId,
        columnId,
        result.draggableId,
        result.source.index,
        result.destination.index
      )
      console.log(toJS(store.taskList(moduleId, columnId)))
    }
  }

  return (
    <div>
      <TempHeader>Temp Header</TempHeader>
      <DragDropContext onDragEnd={onDragEnd}>
        <ColumnTitles />
        <Module moduleId='m0' data={state} />
        <Module moduleId='m1' data={state} />
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
