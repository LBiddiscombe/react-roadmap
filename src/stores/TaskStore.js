import { observable, action, decorate } from 'mobx'
import initialData from '../initial-data'

class TaskStore {
  title = ''
  nextTaskId = 0
  tasks = []
  modules = []
  columns = []
  taskLists = []
  addingTaskId = null

  task = id => this.tasks.find(task => task.id === id)
  module = id => this.modules.find(module => module.id === id)
  column = id => this.columns.find(column => column.id === id)
  taskList = (moduleId, columnId) =>
    this.taskLists.find(
      taskList =>
        taskList.moduleId === moduleId && taskList.columnId === columnId
    )

  addTask(moduleId, columnId, title) {
    this.nextTaskId++
    const id = `t${this.nextTaskId}`
    if (title === '') {
      this.addingTaskId = id
    }
    this.tasks.push({
      id,
      title
    })

    const tl = this.taskList(moduleId, columnId)
    tl.taskIds.push(id)
  }

  updateTask(id, title) {
    this.addingTaskId = null
    !title ? this.deleteTask(id) : (this.task(id).title = title)
  }

  deleteTask(id) {
    const taskList = this.taskLists.find(taskList =>
      taskList.taskIds.includes(id)
    )
    const taskListTaskIndex = taskList.taskIds.findIndex(
      taskId => taskId === id
    )
    const taskIndex = this.tasks.findIndex(task => task.id === id)

    taskList.taskIds.splice(taskListTaskIndex, 1)
    this.tasks.splice(taskIndex, 1)
  }

  moveTask(
    id,
    fromIndex,
    toIndex,
    [fromModuleId, fromColumnId],
    [toModuleId, toColumnId]
  ) {
    const fromTaskList = this.taskList(fromModuleId, fromColumnId)
    const toTaskList = this.taskList(toModuleId, toColumnId)

    fromTaskList.taskIds.splice(fromIndex, 1)
    toTaskList.taskIds.splice(toIndex, 0, id)
  }

  reorderTask(moduleId, columnId, taskId, from, to) {
    const tl = this.taskList(moduleId, columnId)
    tl.taskIds.splice(from, 1)
    tl.taskIds.splice(to, 0, taskId)
  }

  addModule(title) {
    this.modules.push({ id: `m${this.modules.length}`, title })
  }

  addColumn(title) {
    this.columns.push({ id: `c${this.columns.length}`, title })
  }

  reorderColumn(columnId, from, to) {
    const column = { ...this.column(columnId) }
    this.columns.splice(from, 1)
    this.columns.splice(to, 0, column)
  }

  addTaskList(moduleId, columnId) {
    if (!this.taskList(moduleId, columnId)) {
      this.taskLists.push({
        moduleId,
        columnId,
        taskIds: []
      })
    }
  }

  updateTitle(title) {
    this.title = title
    console.log(this.title)
  }

  loadInitialData() {
    this.title = initialData.title

    initialData.modules.forEach((module, moduleIndex) => {
      this.addModule(module.title)
    })

    initialData.columns.forEach((column, columnIndex) => {
      this.addColumn(column.title)
    })

    this.modules.forEach(module => {
      this.columns.forEach(column => {
        this.addTaskList(module.id, column.id)
      })
    })

    initialData.tasks.forEach(task => {
      const mct = initialData.moduleColumnTasks.find(mct =>
        mct.taskIds.includes(task.id)
      )
      this.addTask(mct.moduleId, mct.columnId, task.content)
    })
  }
}

decorate(TaskStore, {
  title: observable,
  tasks: observable,
  modules: observable,
  columns: observable,
  taskLists: observable,
  addingTaskId: observable,
  addTask: action,
  moveTask: action,
  reorderTask: action,
  addModule: action,
  addColumn: action,
  addtaskList: action
})

export default TaskStore
