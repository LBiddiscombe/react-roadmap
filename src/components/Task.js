import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import withInlineEdit from './withInlineEdit'
import { useTaskStore } from '../hooks/useTaskStore'

function Task(props) {
  const { taskId, index, columnIndex } = props
  return (
    <Draggable draggableId={taskId} index={index}>
      {(provided, snapshot) => (
        <TaskContent
          provided={provided}
          snapshot={snapshot}
          taskId={taskId}
          columnIndex={columnIndex}
        />
      )}
    </Draggable>
  )
}

const TaskContent = observer(props => {
  const store = useTaskStore()
  const { provided, snapshot, taskId, columnIndex } = props

  const onChange = e => {
    store.updateTask(taskId, e.target.value)
  }

  return (
    <Container
      {...provided.draggableProps}
      ref={provided.innerRef}
      isDragging={snapshot.isDragging}
      columnIndex={columnIndex}>
      <TitleText addingNewTask={store.addingNewTask} onChange={onChange}>
        {store.task(taskId).title}
      </TitleText>
      <Handle {...provided.dragHandleProps} />
    </Container>
  )
})

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

const TitleText = withInlineEdit(styled.div`
  min-height: 1rem;
  margin-right: 0.5rem;
  flex-grow: 1;
`)

export default Task
