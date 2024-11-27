import {useState} from 'react'
import { Stack, Container, Text } from "@chakra-ui/react"
import { Navbar } from "./components/Navbar"
import UserGrid from "./components/UserGrid"
const BASE = "http://127.0.0.1:8080/api"

function App() {

  const [users, setUsers] = useState([])

  return (
    <Stack minH={"100vh"}>
      <Navbar setUsers={setUsers}/>

      <Container maxW={"1200px"} my={4}>
        <Text
          fontSize={{ base: "3xl", md: "50" }}
					fontWeight={"bold"}
					letterSpacing={"2px"}
					textTransform={"uppercase"}
					textAlign={"center"}
					mb={8}
        >
          <Text as={"span"} >
						My Besties
					</Text>
					🚀
        </Text>
        <UserGrid users={users} setUsers={setUsers}/>
      </Container>
    </Stack>
  )
}

export default App
