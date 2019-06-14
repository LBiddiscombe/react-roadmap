import { createContext, useContext } from 'react'
import TaskStore from '../stores/TaskStore'

const storeContext = createContext(new TaskStore())

export const useTaskStore = () => useContext(storeContext)
