import { useState, useEffect } from 'react'
import './App.css'
import Contact from './Contact'
import ContactForm from './ContactForm'

function App() {
  const [contacts, setContacts] = useState([])
  const [modalOpen, isModalOpen] = useState(false)
  const [currContact, setCurrContact] = useState({})

  const closeModal = ()=>{
    isModalOpen(false)
    setCurrContact({})
  }

  const openCreateModal = () => {
    if (!modalOpen) isModalOpen(true)
  }
  
  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:8080")
    const data = await response.json()
    setContacts(data)
    console.log(data)
  }

  const openEditModal = (contact) =>{
    if (modalOpen) return;
    setCurrContact(contact)
    isModalOpen(true)
  }

  const onUpdate = () =>{
    closeModal()
    fetchContacts()
  }

  return (
    <>
    <Contact contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate}/>
    <button onClick={openCreateModal}>Create New Contact</button>
    {
      modalOpen && <div className='modal'>
        <div className='modal-content'>
          <span className='close' onClick={closeModal}>&times;</span>
          <ContactForm existingContact={currContact} updateCallback={onUpdate}/>
        </div>

      </div>
    }
    
    </>
  )
}

export default App
