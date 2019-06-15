import { observable, action, decorate } from 'mobx'
import initialData from '../initial-data'

class TaskStore {
  tasks = []
  modules = []
  columns = []
  taskLists = []

  task = id => this.tasks.find(task => task.id === id)
  module = id => this.modules.find(module => module.id === id)
  column = id => this.columns.find(column => column.id === id)
  taskList = (moduleId, columnId) =>
    this.taskLists.find(
      taskList =>
        taskList.moduleId === moduleId && taskList.columnId === columnId
    )

  addTask(moduleId, columnId, title) {
    const id = `t${this.tasks.length}`
    this.tasks.push({
      id,
      title
    })

    const tl = this.taskList(moduleId, columnId)
    tl.taskIds.push(id)
  }

  moveTask(id, [m, m2 = m], [c, c2 = c]) {
    console.log(`moving task ${id} from ${m}/${c} to ${m2}/${c2}`)
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

  addTaskList(moduleId, columnId) {
    if (!this.taskList(moduleId, columnId)) {
      this.taskLists.push({
        moduleId,
        columnId,
        taskIds: []
      })
    }
  }

  loadInitialData() {
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
  tasks: observable,
  modules: observable,
  columns: observable,
  taskLists: observable,
  /*
  task: computed,
  module: computed,
  column: computed,
  taskList: computed,
  */
  addTask: action,
  moveTask: action,
  reorderTask: action,
  addModule: action,
  addColumn: action,
  addtaskList: action
})

export default TaskStore