import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

function Task(props) {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          columnIndex={props.columnIndex}
        >
          {props.task.content}
        </Container>
      )}
    </Draggable>
  )
}

const Container = styled.div`
  box-shadow: 0 0.5px 1.5px rgba(0, 0, 0, 0.24);
  transition: box-shadow 0.2s ease;
  border-radius: 2px;
  border-left: ${props =>
    '0.5rem solid var(--bg' + (props.columnIndex + 1) + ')'};
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
  box-shadow: ${props =>
    props.isDragging ? '0 4px 10px rgba(0, 0,0, 0.24)' : 'none'};
`

export default Task
