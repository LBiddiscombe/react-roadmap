import React from 'react'
import styled from 'styled-components'

const ColumnTitles = ({ titles }) => {
  return (
    <Container>
      <div />
      {titles.map(title => (
        <Title>{title}</Title>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  width: 100vw;
  grid-template-columns: 4rem 1fr 1fr 1fr;
  grid-gap: 1rem;
  padding: 0.5rem;
`

const Title = styled.h3`
  xbackground-color: var(--bg0);
  xcolor: var(--fg0);
  padding: 8px;
  border-bottom: 2px solid #38394e30;
  font-size: 1.25rem;
  text-align: center;
  xfont-weight: bold;
`

export default ColumnTitles
