import React, { useState, useEffect } from 'react';
import { Card, Button, Input } from "@chakra-ui/react";

const EditModal = ({ user, setUsers }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputs, setInputs] = useState({
    name: user.name,
    description: user.description,
    role: user.role,
    gender: user.gender || 'male', // fallback in case gender isn't present
  });

  // Update form data when user prop changes
  useEffect(() => {
    setInputs({
      name: user.name,
      description: user.description,
      role: user.role,
      gender: user.gender || 'male',
    });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://127.0.0.1:8080/api/friends/' + user.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
      mode: "cors",
    })
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Something went wrong');
    }
    setUsers(prevUsers => 
      prevUsers.map(u => u.id === user.id ? 
        { ...u, ...inputs } : u
      )
    );


    console.log('Edit submitted:', inputs);
    setIsOpen(false);
  };

  const handleCancel = () => {
    // Reset to original user data
    setInputs({
      name: user.name,
      description: user.description,
      role: user.role,
      gender: user.gender || 'male',
    });
    setIsOpen(false);
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999
  };

  const cardStyle = {
    background: 'linear-gradient(to bottom, #f8f9fa, #ffffff)',
    padding: '20px',
    width: '400px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(0, 0, 0, 0.1)'
  };

  const radioStyle = {
    marginRight: '20px',
    cursor: 'pointer'
  };

  const radioLabelStyle = {
    marginLeft: '5px',
    cursor: 'pointer',
    color: 'black'
  };

  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        colorScheme="blue"
        onClick={() => setIsOpen(true)}
      >
        ✏️
      </Button>

      {isOpen && (
        <div style={overlayStyle}>
          <div style={cardStyle}>
            <h2 style={{ fontSize: '20px', marginBottom: '20px', fontWeight: 'bold', color: '#2d3748' }}>
              Edit User
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: 'black', fontWeight: '500' }}>
                  Full Name
                </label>
                <Input
                  value={inputs.name}
                  color="black"
                  onChange={(e) => setInputs({...inputs, name: e.target.value})}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: 'black', fontWeight: '500' }}>
                  Role
                </label>
                <Input
                  value={inputs.role}
                  color="black"
                  onChange={(e) => setInputs({...inputs, role: e.target.value})}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: 'black', fontWeight: '500' }}>
                  Description
                </label>
                <Input
                  value={inputs.description}
                  color="black"
                  onChange={(e) => setInputs({...inputs, description: e.target.value})}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <Button variant="outline" onClick={handleCancel} color="black">
                  Cancel
                </Button>
                <Button colorScheme="blue" type="submit" color="black">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditModal;