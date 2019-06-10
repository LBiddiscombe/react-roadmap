import React from 'react'
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import Task from './Task'

const InnerList = React.memo(props => {
  return props.tasks.map((task, index) => (
    <Task
      key={task.id}
      task={task}
      index={index}
      columnIndex={props.columnIndex}
    />
  ))
})

function Column(props) {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {provided => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>{props.column.title}</Title>
          <Droppable droppableId={props.column.id} type='task'>
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <InnerList tasks={props.tasks} columnIndex={props.index} />
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  )
}

const Container = styled.div`
  margin: 8px;
  border-radius: 2px;
  background-color: var(--main-bg);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`
const Title = styled.h3`
  background-color: var(--bg0);
  color: var(--fg0);
  padding: 8px;
  xfont-weight: bold;
`
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  border: ${props =>
    props.isDraggingOver ? '1px solid #38394e30' : '1px solid transparent'};
  border-top: 1px solid transparent;
  flex-grow: 1;
  min-height: 100px;
`
export default Column
