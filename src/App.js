import React, { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'
import Module from './components/Module'
import ColumnTitles from './components/ColumnTitles'
import dragEnd from './modules/dragEnd'
import initialData from './initial-data'

function App() {
  const [state, setState] = useState(initialData)

  const onDragEnd = result => {
    const newState = dragEnd(result, 'm1', state)
    if (newState) {
      setState(newState)
    }
  }

  return (
    <div>
      <TempHeader>Temp Header</TempHeader>
      <DragDropContext onDragEnd={onDragEnd}>
        <ColumnTitles data={state} />
        <Module moduleId='m1' data={state} />
        <Module moduleId='m2' data={state} />
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

export default App
