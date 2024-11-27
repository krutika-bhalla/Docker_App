import React from 'react'
import { useState } from 'react'

const CreateTask = () => {
    const [title,setTitle] = useState("")
    const [description, setDescription] = useState("")

    const onSubmit = async(e) =>{
        e.preventDefault()
        const data = {
            title,
            description
        }
        const url = "http://127.0.0.1:8080/"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (!response.ok){
            const data = await response.json()
            alert(data.message)
        } else{
            // updateCallback()
        }
    }

  return (
    <>
        <div>CreateTask</div>
        <form onSubmit={onSubmit}>
        <div>
            <label htmlFor='title'>Title</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor='description'>Description</label>
            <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
        </div>
        <button type="submit">Create Task</button>
        </form>
    </>
  )
}

export default CreateTask