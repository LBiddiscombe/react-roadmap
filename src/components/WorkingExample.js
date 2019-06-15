import React from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'
import { useTaskStore } from '../hooks/useTaskStore'

/*
  Mobx observes/tracks only store attributes used in the render method.
  Given react-beautiful-dnd Draggable and Droppables implement a renderprop approach attributes inside it are not part of this component, rather the Droppable instance which is not observable
  Extract the observable Content and wrap in an observer
*/

const Content = observer(({ provided }) => {
  const store = useTaskStore()
  return (
    <H3 {...provided.droppableProps} ref={provided.innerRef}>
      Hello {store.tasks.length}
    </H3>
  )
})

const WorkingExample = () => {
  return (
    <div>
      <Droppable droppableId={'footer'} type='module-column'>
        {provided => <Content provided={provided} />}
      </Droppable>
    </div>
  )
}

const H3 = styled.h3`
  font-size: 2rem;
`

export default WorkingExample
