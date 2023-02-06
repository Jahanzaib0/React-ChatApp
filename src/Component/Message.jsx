import React from 'react'
import {HStack, Text, Avatar} from "@chakra-ui/react"
const Message = ({text, uri, user="other"}) => {
  return (
    <HStack alignSelf={user === "other"? "flex-start" : "flex-end"}>
          {
            user === "other" && <Avatar src={uri}></Avatar>
        }
        <Text bg={"gray.400"} borderRadius={"base"} paddingX={user === "other "? "2" : "4"} paddingY={"2"}>{text}</Text>
        {
            user === "me" && <Avatar src={uri}></Avatar>
        }
    </HStack>
  )
}

export default Message
