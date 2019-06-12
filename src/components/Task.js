import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import withInlineEdit from './withInlineEdit'

function Task(props) {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          columnIndex={props.columnIndex}
        >
          <Text>{props.task.content}</Text>
          <Handle {...provided.dragHandleProps} />
        </Container>
      )}
    </Draggable>
  )
}

const Container = styled.div`
  box-shadow: 0 0.5px 1.5px rgba(0, 0, 0, 0.24);
  transition: box-shadow 0.2s ease;
  border-radius: 2px;
  border-left: ${props => '0.5rem solid var(--bg' + props.columnIndex + ')'};
  padding: 8px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: white;
  box-shadow: ${props =>
    props.isDragging ? '0 4px 10px rgba(0, 0,0, 0.24)' : 'none'};
`

const Handle = styled.div`
  background-color: lightgrey;
  width: 1.5rem;
  height: 1.5rem;
`

const Text = withInlineEdit(styled.div``)

export default Task
