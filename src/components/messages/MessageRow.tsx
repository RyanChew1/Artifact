import { getUserWithId } from "@/lib/supabase/api"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const MessageRow = ({ userId }: { userId: string }) => {

  const [username, setUsername] = useState("")
  const [avatar, setAvatar] = useState("")
  const [name, setName] = useState({
    first: "",
    last: ""
})
  
  const fetchUser = async(id:string) => {
    try {
        const returnUser = await getUserWithId(id);

        setUsername(returnUser.username)

        setName({
            first: returnUser.first.charAt(0),
            last: returnUser.last.charAt(0),
        })

        setAvatar(returnUser.imageUrl ? returnUser.imageUrl : "")

        return 
    } catch (error) {
        
    }
    
  }

  if (userId){
      fetchUser(userId)
  }


  return (
    <div className="w-screen self-center justify-center">
      <Link to={`/message/${userId}`}>
        <div className="flex flex-row w-[90vw] mx-5 bg-primary-200 dark:bg-primary-500 bg-opacity-40 px-10 py-5 rounded-xl self-center">
        <Avatar className="w-24 h-24 rounded-full mb-2 self-start z-0">
            <AvatarImage src={avatar} className="bg-gray-400 dark:bg-white object-scale-down rounded-full"/>
            <AvatarFallback className="text-white dark:text-black bg-black dark:bg-white font-bold text-xl z-0">
              {name.first}{name.last}
            </AvatarFallback>
          </Avatar>
            <h1 className="font-bold text-3xl ml-6 mt-8">
                {username}
            </h1>
        </div>
      </Link>
    </div>
  )
}

export default MessageRow
