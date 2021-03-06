import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { NEXT_URL } from '../config/index'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const router = useRouter()

  //Login user
  const login = async ({email: identifier, password}) => {

    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identifier,
        password
      })
    })

    const data = await res.json()

    if(res.ok) {
      setUser(data.user)
      router.push('/dashboard')
    } else {
      setError(data.message)
      setError(null)
    }    
  }

  return (
    <AuthContext.Provider value={{user, error, login }} >
      {children}
    </AuthContext.Provider>
  )

}

export default AuthContext