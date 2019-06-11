import React from 'react'
import styled from 'styled-components'
import Module from './components/Module'
import ColumnTitles from './components/ColumnTitles'

const titles = ['To Do', 'In Progress', 'Done']

function App() {
  return (
    <div>
      <TempHeader>Temp Header</TempHeader>
      <ColumnTitles titles={titles} />
      <Module moduleId='m1' />
      <Module moduleId='m2' />
    </div>
  )
}

const TempHeader = styled.div`
  background-color: var(--bg0);
  color: var(--fg0);
  text-align: center;
  padding: 1rem 0;
  font-size: 2rem;
`

export default App
