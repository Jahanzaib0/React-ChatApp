import React, { useEffect, useRef, useState } from 'react';
import Message from './Component/Message';
import { app } from './Firebase';
import {getFirestore, addDoc, collection, serverTimestamp, onSnapshot, query, orderBy} from "firebase/firestore"
import {Box, Container, VStack, Button, Input, HStack} from "@chakra-ui/react"
import {onAuthStateChanged,getAuth ,GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth"
//for Auth
const auth = getAuth(app);
// get Database
const db = getFirestore(app)
//for Google Auth
const LoginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
}
//for Logout
const LogOutHandler = () => {
  signOut(auth)
}

// app ********
function App() {
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  
  const divForScroll = useRef(null)
  useEffect(()=>{
   const unSub = onAuthStateChanged(auth, (data)=>{
      setUser(data)
    });
    const q = query(collection(db, "messages"),orderBy("createdAt", "asc"));
    const UnsubForMessage = onSnapshot(q,(snap)=>{
      setMessages(snap.docs.map((item)=>{
          const id = item.id;
          return {id, ...item.data()}
    }))
    })
    return () => {
      unSub();
      UnsubForMessage();
    }
  }, [])
  // for Submit Data to firebase Db
const submitHandler = async(e) => {
  e.preventDefault();
  setMessage("");
  divForScroll.current.scrollIntoView({behavior: "smooth"});
try {
  await addDoc(collection(db,"messages"),{
    text : message,
    uid : user.uid,
    uri : user.photoURL,
    createdAt : serverTimestamp()
  }
  )
  
} catch (error) {
  alert(error)
}

} 
  return (
   <Box bg={"black"}>
   {
    user ? ( <Container bg={"black"} h={"100vh"}>
    <VStack bg={"telegram.100"} h={'full'} paddingY={"4"}>
      <h1>Chat App</h1>
     <Button w={'100%'} colorScheme={"blackAlpha"} onClick={LogOutHandler}>
       LogOut
     </Button>
     <VStack bg={"rgb(12, 97, 120)"} w={'full'} h={'full'} overflowY={"auto"}>
      {
         messages.map((curElm)=>{
         return <Message key={curElm.id} text={curElm.text} uri={curElm.uri} user={curElm.uid === user.uid? "me" : "other"}/>
        })
      }
      
     <div ref={divForScroll}></div>
     </VStack>
     <form style={{width : "100%"}} onSubmit={submitHandler}>
      <HStack>
      <Input placeholder='Enter a message...' value={message} onChange={(e)=>{
        setMessage(e.target.value)
      }}
     ></Input>
       <Button type='submit' colorScheme={'purple'}>Send  </Button>
      </HStack>
     </form>
    </VStack>
   </Container>) : (
    <VStack h={"100vh"} justifyContent={"center"}>
      <Button onClick={LoginHandler}>Sign In With Google</Button>
    </VStack>
   )
   }
   </Box>
  );
}

export default App;
