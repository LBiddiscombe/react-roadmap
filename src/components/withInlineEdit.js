import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useInlineEdit } from '../hooks/useInlineEdit'

export default WrappedComponent => {
  const WithInlineEdit = ({ children, ...props }) => {
    const elementToEdit = useRef(null)
    const [value, setValue] = useState(children)
    const [isEditing, setIsEditing] = useInlineEdit(elementToEdit)

    useEffect(() => {
      if (props.addingNewTask && value === '') {
        setIsEditing(true)
      }
    }, [setIsEditing, props, value])

    return (
      <Container onClick={() => setIsEditing(true)} ref={elementToEdit}>
        <WrappedComponent {...props}>
          {isEditing ? (
            <Input
              autoFocus
              value={value}
              onChange={e => setValue(e.target.value)}
            />
          ) : (
            value
          )}
        </WrappedComponent>
      </Container>
    )
  }

  return WithInlineEdit
}

const Input = styled.input`
  border: none;
  font: inherit;
  width: 100%;
`
const Container = styled.div`
  flex: 1;
`
