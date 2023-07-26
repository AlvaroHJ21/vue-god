import { ref } from 'vue'
import { defineStore } from 'pinia'
import taskApi from '../api/taskApi'

export const useTaskStore = defineStore('task', () => {
  const isLoading = ref(false)
  const tasks = ref([
    // {
    //   id: 1,
    //   title: 'Tarea 1',
    //   description: 'Esta es una tarea de prueba',
    //   done: false
    // },
    // {
    //   id: 2,
    //   title: 'Tarea 2',
    //   description: 'Segunda tarea',
    //   done: false
    // },
    // {
    //   id: 3,
    //   title: 'Tarea 3',
    //   description: 'Tercera tarea',
    //   done: false
    // }
  ])

  const currentTask = ref(null)

  function setCurrentTask(task) {
    currentTask.value = task
  }

  function toggleCompleted(id) {
    const index = tasks.value.findIndex((t) => t.id === id)
    if (index === -1) return
    tasks.value[index] = { ...tasks.value[index], done: !tasks.value[index].done }
    // tasks.value[index].done = !tasks.value[index].done
  }

  function addTask(task) {
    tasks.value.push(task)
  }

  function updateTask(task) {
    const index = tasks.value.findIndex((t) => t.id === task.id)
    if (index === -1) return
    tasks.value[index] = { ...task }
  }

  function quitTask(id) {
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  async function startLoadTasks() {
    try {
      isLoading.value = true
      const { data } = await taskApi.get()
      console.log(data)
      if (data.ok) {
        tasks.value = data.data
      }
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }

  async function startCreateTask(task) {
    try {
      const { data } = await taskApi.post('', task)
      if (data.ok) {
        addTask(data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function startUpdateTask(task) {
    try {
      const { data } = await taskApi.patch(`/${task.id}`, task)
      if (data.ok) {
        updateTask(data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function startDeleteTask(id) {
    try {
      const { data } = await taskApi.delete(`/${id}`)
      if (data.ok) {
        quitTask(id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    tasks,
    isLoading,
    currentTask,
    // methods
    setCurrentTask,
    toggleCompleted,
    addTask,
    updateTask,
    quitTask,
    // actions
    startLoadTasks,
    startCreateTask,
    startUpdateTask,
    startDeleteTask
  }
})
