import React from 'react'
import { useParams } from 'react-router-dom'

const PublicProfile = () => {
    const   {userId} = useParams()
    
  return (
    <div>PublicProfile  : {userId}</div>
  )
}

export default PublicProfile