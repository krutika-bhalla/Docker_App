import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { USERS } from '../dummy/dummy';
import UserCard from './UserCard';

const UserGrid = ({users, setUsers}) => {
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    const getUsers = async() =>{
      try{
        const res = await fetch("http://127.0.0.1:8080/api/friends")
        const data = await res.json()
        if (!res.ok){
          throw new Error(data.error)
        }
        setUsers(data)
      } catch(error){
        console.error(error)
      } finally {
        isLoading(false)
      }
    }
    getUsers();
  },[setUsers])
  return (
    <>
      <Box 
        display="grid" 
        gridTemplateColumns={{
          base: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)'
        }}
        gap={4}
        p={4}
      >
        {users.map((user) => (
          <UserCard key={user.id} user={user} setUsers={setUsers}/>
        ))}
      </Box>
      {!loading && users.length === 0 && (
        <h1> Poor You! No Friends Found 😢</h1>
      )}
    </>
  );
};

export default UserGrid;
