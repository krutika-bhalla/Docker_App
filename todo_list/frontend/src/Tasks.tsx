import React from 'react'

const Tasks = ({tasks}) => {
  return (
    <>
        <h2>Tasks</h2>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task)=>(
                    <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>
                        <button>Update</button>
                        <button>Complete</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </>
  )
}

export default Tasks