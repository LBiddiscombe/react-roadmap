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
  grid-template-columns: 1fr 1fr 1fr;
`

export default Module
