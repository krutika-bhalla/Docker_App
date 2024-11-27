import React, { useState } from 'react';
import { Card, Button, Input } from "@chakra-ui/react";

// Make sure BASE_URL is properly defined
const BASE_URL = "http://localhost:8080/api"; // or whatever your backend URL is

const CreateUserModal = ({setUsers}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    role: '',
    gender: 'male'
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8080/api/friends', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
        mode: "cors"      
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      setIsOpen(false);
      
      setUsers((prevUsers) => [...prevUsers, data])
      setInputs({
        name: '',
        description: '',
        role: '',
        gender: 'male'
      });
    } catch(error) {
      alert(error.message || "Error in creating friends");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setInputs({
      name: '',
      description: '',
      role: '',
      gender: 'male'
    });
  };

  // Rest of your styles remain the same
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
    <div>
      <Button onClick={() => setIsOpen(true)}>
        + Add User
      </Button>

      {isOpen && (
        <div style={overlayStyle}>
          <div style={cardStyle}>
            <h2 style={{ fontSize: '20px', marginBottom: '20px', fontWeight: 'bold', color: '#2d3748' }}>
              Add a New Friend
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: 'black', fontWeight: '500' }}>
                  Full Name
                </label>
                <Input
                  placeholder="Enter Full Name"
                  color="black"
                  value={inputs.name}
                  onChange={(e) => setInputs({...inputs, name: e.target.value})}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: 'black', fontWeight: '500' }}>
                  Role
                </label>
                <Input
                  placeholder="Enter Role"
                  color="black"
                  value={inputs.role}
                  onChange={(e) => setInputs({...inputs, role: e.target.value})}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: 'black', fontWeight: '500' }}>
                  Description
                </label>
                <Input
                  type="description"
                  color="black"
                  placeholder="Enter Description"
                  value={inputs.description}
                  onChange={(e) => setInputs({...inputs, description: e.target.value})}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: 'black', fontWeight: '500' }}>
                  Gender
                </label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <label style={radioStyle}>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={inputs.gender === 'male'}
                      onChange={(e) => setInputs({...inputs, gender: e.target.value})}
                    />
                    <span style={radioLabelStyle}>Male</span>
                  </label>
                  <label style={radioStyle}>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={inputs.gender === 'female'}
                      onChange={(e) => setInputs({...inputs, gender: e.target.value})}
                    />
                    <span style={radioLabelStyle}>Female</span>
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <Button variant="outline" onClick={handleCancel} color="black">
                  Cancel
                </Button>
                <Button 
                  colorScheme="blue" 
                  type="submit" 
                  color="black"
                  isLoading={loading}
                >
                  Add
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateUserModal;