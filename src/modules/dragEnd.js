const dragEnd = (result, store) => {
  const { destination, source, draggableId, type } = result

  // skip update if drop cancelled or no change
  if (
    !destination ||
    (destination.droppableId === source.droppableId &&
      destination.index === source.index)
  ) {
    return
  }

  if (type === 'task') {
    // reorder tasks in same tasklist
    if (source.droppableId === destination.droppableId) {
      const [moduleId, columnId] = result.source.droppableId.split('|')
      store.reorderTask(
        moduleId,
        columnId,
        result.draggableId,
        result.source.index,
        result.destination.index
      )
      // task is moving between tasklists
    } else {
      const fromModuleColumn = result.source.droppableId.split('|')
      const toModuleColumn = result.destination.droppableId.split('|')
      store.moveTask(
        draggableId,
        source.index,
        destination.index,
        fromModuleColumn,
        toModuleColumn
      )
    }
  }

  //reorder columns
  if (type === 'column') {
    store.reorderColumn(draggableId, source.index, destination.index)
  }
}

export default dragEnd
