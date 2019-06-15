import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import Task from './Task'
import { useTaskStore } from '../hooks/useTaskStore'

function TaskList({ moduleId, columnId, index }) {
  return (
    <Draggable
      draggableId={moduleId + '|' + columnId}
      index={index}
      //TODO: re-enable and code list moves
      isDragDisabled={true}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}>
          <Droppable droppableId={moduleId + '|' + columnId} type='task'>
            {(provided, snapshot) => (
              <List
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}>
                <InnerList
                  moduleId={moduleId}
                  columnId={columnId}
                  columnIndex={index}
                />
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  )
}

const InnerList = observer(props => {
  const store = useTaskStore()
  const { moduleId, columnId, columnIndex } = props

  return store
    .taskList(moduleId, columnId)
    .taskIds.map((taskId, index) => (
      <Task
        key={taskId}
        taskId={taskId}
        index={index}
        columnIndex={columnIndex}
      />
    ))
})

const Container = styled.div`
  margin: 8px;
  border-radius: 2px;
  background-color: var(--main-bg);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: ${props =>
    props.isDragging ? '2px solid #38394e30' : '2px solid transparent'};
`
const List = styled.div`
  padding: 8px;
  transition: all 0.4s ease;
  background-color: ${props =>
    props.isDraggingOver ? '#38394e10' : 'inherit'};
  flex-grow: 1;
  min-height: 100px;
`
export default TaskList
