const initialData = {
  tasks: [
    { id: 't1', content: 'Take out the garbage' },
    { id: 't2', content: 'Watch my favorite show' },
    { id: 't3', content: 'Charge my phone' },
    { id: 't4', content: 'Cook dinner' },
    { id: 't5', content: 'Get Kids to sleep' }
  ],
  modules: [
    {
      id: 'm1',
      title: 'Product'
    },
    {
      id: 'm2',
      title: 'Transaction'
    }
  ],
  columns: [
    {
      id: 'c1',
      title: 'To do'
    },
    {
      id: 'c2',
      title: 'In progress'
    },
    {
      id: 'c3',
      title: 'Done'
    }
  ],
  // Facilitate reordering of the columns
  columnOrder: ['c1', 'c2', 'c3'],
  moduleOrder: ['m1', 'm2']
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
  mc => mc.moduleId === 'm1' && mc.columnId === 'c1'
).taskIds = ['t1', 't2', 't3']
initialData.moduleColumnTasks.find(
  mc => mc.moduleId === 'm2' && mc.columnId === 'c1'
).taskIds = ['t4', 't5']

export default initialData
