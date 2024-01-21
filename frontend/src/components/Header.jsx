import React from 'react'
import { useSelector } from 'react-redux'

export default function Header() {
  const { currentUser } = useSelector((state) => state.user)
  

  return (
    <div className='flex justify-center mt-5'>
      { currentUser ? (
        <div className="flex flex-row flex-wrap">
          <p>Current User logged in:</p> {"  "} <span className='ml-2 text-blue-600'>{currentUser.username}</span>
        </div>
      ) : (
        <>
          <p>No User currently logged in</p>
        </>
      )}
    </div>
  )
}
