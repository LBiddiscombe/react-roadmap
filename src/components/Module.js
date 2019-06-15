import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import TaskList from './TaskList'
import { useTaskStore } from '../hooks/useTaskStore'

function Module({ moduleId }) {
  return (
    <Droppable
      droppableId={moduleId + '-columns'}
      direction='horizontal'
      type='module-column'>
      {provided => <ModuleContent provided={provided} moduleId={moduleId} />}
    </Droppable>
  )
}

const ModuleContent = observer(props => {
  const store = useTaskStore()
  const { provided, moduleId } = props

  return (
    <Container {...provided.droppableProps} ref={provided.innerRef}>
      <TempTitle>
        <span>{store.module(moduleId).title}</span>
      </TempTitle>
      {store.columns.map((column, index) => {
        return (
          <TaskList
            key={column.id}
            moduleId={moduleId}
            columnId={column.id}
            index={index}
          />
        )
      })}
      {provided.placeholder}
    </Container>
  )
})

const Container = styled.div`
  display: grid;
  width: 100vw;
  grid-template-columns: 4rem 1fr 1fr 1fr;
`

const TempTitle = styled.div`
  background-color: var(--bg0);
  color: var(--fg0);
  margin: 0.25rem;
  min-height: 8rem;
  display: grid;
  place-content: center;
  font-size: 1.25rem;
  white-space: nowrap;
  span {
    transform: rotate(-90deg);
  }
`

export default Module
