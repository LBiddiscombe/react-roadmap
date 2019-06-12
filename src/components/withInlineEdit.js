import React, { useState, useRef, useMemo } from 'react'
import { useInlineEdit } from './useInlineEdit'

export default WrappedComponent => {
  const WithInlineEdit = ({ children, ...props }) => {
    const elementToEdit = useRef(null)
    const [value, setValue] = useState(children)
    const [isEditing, setIsEditing] = useInlineEdit(elementToEdit)

    const computeEditingClasses = isEditing => {
      if (isEditing) return 'isEditable--editing'
      return 'isEditable'
    }
    const isEditingClasses = useMemo(() => computeEditingClasses(isEditing), [
      isEditing
    ])

    return (
      <div
        onClick={() => setIsEditing(true)}
        ref={elementToEdit}
        className={isEditingClasses}
      >
        <WrappedComponent {...props}>
          {isEditing ? (
            <input
              value={value}
              onChange={e => setValue(e.target.value)}
              style={{ all: 'unset', width: '100%' }}
            />
          ) : (
            value
          )}
        </WrappedComponent>
      </div>
    )
  }

  return WithInlineEdit
}
