import React from 'react';
import { Box, Button } from "@chakra-ui/react";
import EditModal from './EditModal';

const UserCard = ({ user, setUsers }) => {
  const handleDeleteUser = async () => {
    const res = await fetch("http://127.0.0.1:8080/api/friends/" + user.id, {
      method: "DELETE",
    })
    const data = await res.json()
    setUsers((prevUsers) => prevUsers.filter((u) => u.id != user.id))
    console.log(user)
  }
  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="hidden"
      bg="white"
      shadow="md"
    >
      <Box p={4}>
        <Box display="flex" alignItems="center" gap={4}>
          <Box 
            width="40px" 
            height="40px" 
            borderRadius="full" 
            overflow="hidden"
          >
            <img 
              src={user.imgUrl} 
              alt={user.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
          <Box flex={1}>
            <Box fontWeight="bold" fontSize="sm" color="black">{user.name}</Box>
            <Box color="gray.500" fontSize="sm">{user.role}</Box>
          </Box>
          <EditModal user={user} setUsers={setUsers}/>
          <Button
            size="sm"
            variant="ghost"
            colorScheme="red"
            onClick={handleDeleteUser}
          >
            🗑️
          </Button>
        </Box>
      </Box>
      <Box p={4} pt={0} color="black">
        {user.description}
      </Box>
    </Box>
  );
};

export default UserCard;