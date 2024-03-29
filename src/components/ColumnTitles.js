import React from 'react'
import { observer } from 'mobx-react-lite'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { useTaskStore } from '../hooks/useTaskStore'

const ColumnList = observer(({ provided }) => {
  const store = useTaskStore()
  return (
    <Container {...provided.droppableProps} ref={provided.innerRef}>
      <div />
      {store.columns.map((column, index) => (
        <Draggable
          draggableId={column.id}
          index={index}
          key={column.id}
          //TODO: re-enable and code list moves
        >
          {provided => (
            <Title
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              key={'title' + index}>
              {column.title}
            </Title>
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </Container>
  )
})

const ColumnTitles = ({ data }) => {
  return (
    <Droppable droppableId={'all-columns'} direction='horizontal' type='column'>
      {provided => <ColumnList provided={provided} />}
    </Droppable>
  )
}

const Container = styled.div`
  display: grid;
  width: 100vw;
  grid-template-columns: 4rem 1fr 1fr 1fr;
  padding: 0.5rem;
  transition: all 0.4s ease;
  background-color: ${props =>
    props.isDraggingOver ? '#38394e10' : 'inherit'};
`

const Title = styled.div`
  xbackground-color: var(--bg0);
  xcolor: var(--fg0);
  padding: 8px;
  border-bottom: 2px solid #38394e30;
  font-size: 1.25rem;
  text-align: center;
  xfont-weight: bold;
`

export default ColumnTitles
