import { useState, useEffect, useCallback } from 'react'
import useOnClickOutside from './useClickOutside'

export const useContentEditable = (ref, initialValue, isNew = false) => {
  // if adding a new editable component mark it as in edit by default
  const [isEditing, setIsEditing] = useState(isNew)
  const [value, setValue] = useState(initialValue)
  const pasteAsPlainText = e => {
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    document.execCommand('insertHTML', false, text)
  }

  useOnClickOutside(
    ref,
    useCallback(() => {
      setValue(ref.current.textContent)
      setIsEditing(false)
      ref.current.blur()
    }, [ref])
  )

  useEffect(() => {
    const onKeyDown = e => {
      if (!ref) {
        return
      }

      const escapePressed = e.which === 27
      const enterPressed = e.which === 13 || e.which === 9

      if (escapePressed) {
        document.execCommand('undo')
        setIsEditing(false)
        ref.current.blur()
      } else if (enterPressed) {
        setValue(ref.current.textContent)
        setIsEditing(false)
        ref.current.blur()
        e.preventDefault()
      }
    }

    if (ref.current) {
      ref.current.contentEditable = isEditing
      if (isEditing) {
        ref.current.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('paste', pasteAsPlainText)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('paste', pasteAsPlainText)
    }
  }, [ref, isEditing])

  return [setIsEditing, value]
}
