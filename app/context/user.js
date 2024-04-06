"use client"

import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation"; 
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"


// Create a context for user data
const Context = createContext();
 
// Provider component to manage user authentication and data
const Provider = ({ children }) => {
  const router = useRouter();

//   State variables for user data
  const [user, setUser] = useState(null);
  const [id, setId] = useState(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [picture, setPicture] = useState(null);

//  Create a supabase client 
  const supabaseClient = createClientComponentClient()

//  Function to get the current session
//  If a session exists, the user is logged in
  const getCurrentSession = async () => {
    const res = await supabaseClient.auth.getSession()
    if (res && res.data.session) { 
      return res.data.session
    } 

    clearUser()
    return null
  }

//    Function to get the current user data
  const getCurrentUser = async () => {
    if (id) return
    
    const res = await supabaseClient.auth.getUser() // get the user
    if (res && res.data.user) { // if it exists

      const theUser = res.data.user // print here

      // set this 
      setUser(theUser)
      setId(theUser.id)
      setEmail(theUser.email)
      setName(theUser.identities[0].identity_data.name)
      setPicture(theUser.identities[0].identity_data.picture)
    }
  }

//   Use effect to check if user is logged in on component mount
  useEffect(() => {
    const isUser = async () => {
      const currentSession = await getCurrentSession()
      if (currentSession) await getCurrentUser()
    }
    isUser()
  }, [])

//    Function to sign out the current user
  const signOut = async () => {
    await supabaseClient.auth.signOut()
    clearUser()
    router.push('/')
  }

//    Function to clear user data
  const clearUser = () => {
    setUser(null)
    setId(null)
    setEmail(null)
    setName(null)
    setPicture(null)
  }

//   Expose user data and sign out function to the context
  const exposed = { user, id, email, name, picture, signOut };

//   Provide the context value to children components
  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

//  Custom hook to use user data in components
export const useUser = () => useContext(Context);

export default Provider;