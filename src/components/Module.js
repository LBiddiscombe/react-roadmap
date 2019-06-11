import React, { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import initialData from '../initial-data'
import dragEnd from '../modules/dragEnd'
import Column from './Column'

function Module({ moduleId }) {
  const [state, setState] = useState(initialData)

  const onDragEnd = result => {
    const newState = dragEnd(result, moduleId, state)
    if (newState) {
      setState(newState)
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
        {provided => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            <TempTitle>
              <span>Title</span>
            </TempTitle>
            {state.columnOrder.map((columnId, index) => {
              const column = state.columns.find(c => c.id === columnId)
              const tasks = state.moduleColumnTasks
                .find(
                  mc => mc.moduleId === moduleId && mc.columnId === columnId
                )
                .taskIds.map(taskId => state.tasks.find(t => t.id === taskId))

              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  index={index}
                />
              )
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  )
}

const Container = styled.div`
  display: grid;
  width: 100vw;
  grid-template-columns: 4rem 1fr 1fr 1fr;
`

const TempTitle = styled.div`
  background-color: var(--bg0);
  color: var(--fg0);
  margin: 0.5rem;
  display: grid;
  place-items: center center;
  span {
    transform: rotate(-90deg);
    font-size: 1.25rem;
  }
`

export default Module
