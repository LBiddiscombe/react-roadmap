import React, { useEffect, useRef } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import Module from './components/Module'
import ColumnTitles from './components/ColumnTitles'
import dragEnd from './modules/dragEnd'
import { useTaskStore } from './hooks/useTaskStore'
import { useContentEditable } from './hooks/useContentEditable'

function App() {
  const store = useTaskStore()
  const editableRef = useRef()
  const [setIsEditing, title] = useContentEditable(editableRef, store.title)

  useEffect(() => {
    store.loadInitialData()
  }, [store])

  const onDragEnd = result => {
    dragEnd(result, store)
  }

  return (
    <div>
      <TempHeader
        ref={editableRef}
        onClick={() => setIsEditing(true)}
        onBlur={() => store.updateTitle(title)}
      >
        {title}
      </TempHeader>
      <DragDropContext onDragEnd={onDragEnd}>
        <ColumnTitles />
        {store.modules.map(module => (
          <Module key={module.id} moduleId={module.id} />
        ))}
      </DragDropContext>
    </div>
  )
}

const TempHeader = styled.div`
  background-color: var(--bg0);
  color: var(--fg0);
  text-align: center;
  padding: 1rem 0;
  font-size: 2rem;
  min-height: 2.5rem;
`

export default observer(App)
