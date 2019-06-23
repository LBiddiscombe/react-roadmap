import { useState, useEffect } from 'react'

export const useContentEditable = (initialValue, isNewTask) => {
  const [ref, setRef] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(initialValue)
  const pasteAsPlainText = e => {
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    document.execCommand('insertHTML', false, text)
  }

  useEffect(() => {
    setIsEditing(isNewTask)
  }, [isNewTask])

  useEffect(() => {
    const onKeyDown = e => {
      if (!ref) {
        return
      }

      const escapePressed = e.which === 27,
        enterPressed = e.which === 13,
        input = ref.nodeName !== 'INPUT' && ref.nodeName !== 'TEXTAREA'

      if (input) {
        if (escapePressed) {
          // restore state
          document.execCommand('undo')
          setIsEditing(false)
          ref.blur()
        } else if (enterPressed) {
          // save
          setValue(ref.textContent)
          setIsEditing(false)
          ref.blur()
          e.preventDefault()
        }
      }
    }

    if (ref) {
      //TODO: isEditing state, chnaged on click
      ref.contentEditable = isEditing
      if (isEditing) {
        ref.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('paste', pasteAsPlainText)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('paste', pasteAsPlainText)
    }
  }, [ref, isEditing])

  return [setRef, setIsEditing, value]
}
