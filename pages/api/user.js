// import cookie from  'cookie'
import {PROD_URL} from '../../config'

export default async ( req , res ) => {
  if(req.method === 'GET') {
  

   const strapiRes = await fetch(`${PROD_URL}/users/me`, {
     method : 'GET',
     headers: {
       'Authorization' : `Bearer ${token}`
     }
   })

   const user = await strapiRes.json()

   if(strapiRes.ok){
     res.status(200).json({user})
   }else {
     res.status(403).json({message: 'User forbidden'})
   }

  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({message: `Method ${req.method} not allowed`})
  }
}