import { useEffect, useState } from 'react'
import Tasks from './Tasks'
import CreateTask from './CreateTask'

function App() {
  const [tasks, setTask] = useState([])
  
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async() => {
    const response = await fetch("http://127.0.0.1:8080/")
    const data = await response.json()
    setTask(data)
    console.log(data)
  }
  return (
    <>
      <h1>Hello, Here are your Tasks</h1>
      <Tasks tasks={tasks} />

      <CreateTask />
    </>
  )
}

export default App
