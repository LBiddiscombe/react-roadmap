const initialData = {
  tasks: [
    { id: 't0', content: 'Get Kids to sleep' },
    { id: 't1', content: 'Take out the garbage' },
    { id: 't2', content: 'Watch my favorite show' },
    { id: 't3', content: 'Charge my phone' },
    { id: 't4', content: 'Cook dinner' }
  ],
  modules: [
    {
      id: 'm0',
      title: 'Product'
    },
    {
      id: 'm1',
      title: 'Transaction'
    }
  ],
  columns: [
    {
      id: 'c0',
      title: 'To do'
    },
    {
      id: 'c1',
      title: 'In progress'
    },
    {
      id: 'c2',
      title: 'Done'
    }
  ],
  // Facilitate reordering of the columns
  columnOrder: ['c0', 'c1', 'c2'],
  moduleOrder: ['m0', 'm1'],
  title: 'Click To Edit Title'
}

initialData.moduleColumnTasks = []
initialData.modules.forEach(m => {
  initialData.columns.forEach(c => {
    initialData.moduleColumnTasks.push({
      moduleId: m.id,
      columnId: c.id,
      taskIds: []
    })
  })
})

initialData.moduleColumnTasks.find(
  mc => mc.moduleId === 'm0' && mc.columnId === 'c0'
).taskIds = ['t0', 't1', 't2']
initialData.moduleColumnTasks.find(
  mc => mc.moduleId === 'm1' && mc.columnId === 'c0'
).taskIds = ['t3', 't4']

export default initialData
