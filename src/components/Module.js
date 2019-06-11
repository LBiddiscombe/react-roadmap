import React from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'
import Column from './Column'

function Module({ moduleId, data }) {
  return (
    <Droppable
      droppableId={moduleId + '-columns'}
      direction='horizontal'
      type='module-column'
    >
      {provided => (
        <Container {...provided.droppableProps} ref={provided.innerRef}>
          <TempTitle>
            <span>Title</span>
          </TempTitle>
          {data.columnOrder.map((columnId, index) => {
            const column = data.columns.find(c => c.id === columnId)
            const tasks = data.moduleColumnTasks
              .find(mc => mc.moduleId === moduleId && mc.columnId === columnId)
              .taskIds.map(taskId => data.tasks.find(t => t.id === taskId))

            return (
              <Column
                key={column.id}
                column={column}
                moduleId={moduleId}
                tasks={tasks}
                index={index}
              />
            )
          })}
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
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
