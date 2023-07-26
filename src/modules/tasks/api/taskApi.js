import axios from 'axios'

const taskApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}api/tasks`
})

export default taskApi
