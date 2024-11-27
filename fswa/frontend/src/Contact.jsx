
import React from 'react'

const Contact = ({contacts, updateContact, updateCallback}) => {
    const onDelete = async (id) => {
        const options = {
            method: "DELETE"
        }
        const response = await fetch(`http://127.0.0.1:8080/${id}`, options)
        if (!response.ok) {
            alert("failed to delete")
        }
        updateCallback()
    }
  return (
    <div>
        <h2>Contacts</h2>
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((c) => (
                    <tr key={c.id}>
                        <td>{c.firstName}</td>
                        <td>{c.lastName}</td>
                        <td>{c.email}</td>
                        <td>
                            <button onClick={() => updateContact(c)}>Update</button>
                            <button onClick={()=> onDelete(c.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Contact