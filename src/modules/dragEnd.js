const dragEnd = (result, moduleId, prevState) => {
  const { destination, source, draggableId, type } = result

  // skip update if drop cancelled or no change
  if (
    !destination ||
    (destination.droppableId === source.droppableId &&
      destination.index === source.index)
  ) {
    return
  }

  // move task lists around
  if (type === 'module-column') {
    return
  }

  // reorder columns
  if (type === 'column') {
    const newColumnOrder = Array.from(prevState.columnOrder)
    newColumnOrder.splice(source.index, 1)
    newColumnOrder.splice(destination.index, 0, draggableId)

    const newState = {
      ...prevState,
      columnOrder: newColumnOrder
    }
    return newState
  }

  // reorder same list
  if (source.droppableId === destination.droppableId) {
    const newTaskIds = [
      ...prevState.moduleColumnTasks.find(
        mc => mc.moduleId + '|' + mc.columnId === source.droppableId
      ).taskIds
    ]

    newTaskIds.splice(source.index, 1)
    newTaskIds.splice(destination.index, 0, draggableId)

    const newState = { ...prevState }
    newState.moduleColumnTasks.find(
      mc => mc.moduleId + '|' + mc.columnId === source.droppableId
    ).taskIds = newTaskIds
    return newState
  }

  // Moving task from one list to another
  const startTaskIds = [
    ...prevState.moduleColumnTasks.find(
      mc => mc.moduleId + '|' + mc.columnId === source.droppableId
    ).taskIds
  ]

  const finishTaskIds = [
    ...prevState.moduleColumnTasks.find(
      mc => mc.moduleId + '|' + mc.columnId === destination.droppableId
    ).taskIds
  ]

  startTaskIds.splice(source.index, 1)
  finishTaskIds.splice(destination.index, 0, draggableId)

  const newState = { ...prevState }
  newState.moduleColumnTasks.find(
    mc => mc.moduleId + '|' + mc.columnId === source.droppableId
  ).taskIds = startTaskIds

  newState.moduleColumnTasks.find(
    mc => mc.moduleId + '|' + mc.columnId === destination.droppableId
  ).taskIds = finishTaskIds

  return newState
}

export default dragEnd
