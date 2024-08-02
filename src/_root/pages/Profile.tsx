import ProductIdTable from "@/components/products/ProductByIdTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { getUserWithId, updateAvatar, updateUsername } from "@/lib/supabase/api";
import { useState } from "react";
import { useParams } from "react-router-dom";

function ProfilePage() {
  const { id } = useParams();

  const { toast } = useToast();

   const {user} = useAuth()

   let isUserProfile = false
   if (user?.id == id){
    isUserProfile = true
   }

  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");

    const [name, setName] = useState({
        first: "",
        last: ""
    })

  const handleAvatarChange = (event: any) => {
    updateAvatar(event.target.files[0], user)
  };

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

  if (id){
      fetchUser(id)
  }

  const handleUsernameChange = (event: any) => {
    setNewUsername(event.target.value);
  };

  const handleSaveChanges = async() => {
    if (newUsername !== "") {
      const response = await updateUsername(newUsername, user);
      if (!response) {
        toast({
            title: "Error updating username",
            variant: "destructive"
        });
      }
      setUsername(newUsername);
      toast({
        title: "Username succesfully changed",
        variant: "green"
    });
    } else {
      alert("Please enter a valid username");
    }
  };

  return (
    <div className="flex flex-col h-full w-full justify-center">
      <div className="w-[40%] pt-5 pb-10 px-3 mx-auto p-4 border-2 border-dark-3 dark:border-gray-300 rounded-lg shadow-md bg-gray-500 bg-opacity-10">
        <h1 className="text-3xl font-bold mb-4 text-primary-900 dark:text-primary-500">Profile</h1>
        <div className="flex flex-col items-center mb-4">
            <div className="flex flex-row self-start justify-center border m-3 p-3 rounded-xl bg-primary-500 border-none ml-0">
            <Avatar className="w-24 h-24 rounded-full mb-2 self-start z-0">
            <AvatarImage src={avatar} className="bg-black bg-opacity-10 object-scale-down rounded-full"/>
            <AvatarFallback className="text-white dark:text-black bg-black dark:bg-white font-bold text-xl z-0">
              {name.first}{name.last}
            </AvatarFallback>
          </Avatar>
            <h1 className="font-bold text-3xl ml-6 mt-8 text-gray-800">
                {username}
            </h1>
            </div>

          
          {isUserProfile ? (<><input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
            id="avatar-input" /><label
              htmlFor="avatar-input"
              className="bg-primary-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded self-start"
            >
              Change Avatar
            </label></>): <></>}
        </div>
        {isUserProfile ? (<><div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Change Username:
          </label>
          <input
            type="text"
            value={newUsername}
            onChange={handleUsernameChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black" />
        </div><button
          onClick={handleSaveChanges}
          className="bg-primary-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
            Change Username
          </button></>) : <></>}
        
      </div>
       {/* Your Products */}
      <div className="mb-10 self-center sm:ml-0 sm:pl-0">
        <h1 className="text-4xl font-bold mt-10 ml-10 sm:ml-0 self-center text-center">
          Products
        </h1>
        {user ? <ProductIdTable id={id} /> : <></>}
      </div>
    </div>
  );
}

export default ProfilePage;
