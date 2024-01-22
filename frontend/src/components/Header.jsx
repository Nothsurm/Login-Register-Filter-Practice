import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/userSlice';
import toast from 'react-hot-toast';
import Loader from './Loader';

export default function Header() {
  const { currentUser, loading } = useSelector((state) => state.user)

  const dispatch = useDispatch();

  const handleSignOut = async () => {
    dispatch(signOutUserStart())
    const res = await fetch('/api/auth/signout')
    const data = res.json()

    if (data.success = false) {
      dispatch(signOutUserFailure(data))
      toast.error('Unable to logout, please try again')
      return;
    }
    dispatch(signOutUserSuccess())
    toast.success('User logged out')
  }
  
  return (
    <div className='flex justify-center mt-5'>
      { currentUser ? (
        <div className="flex flex-row flex-wrap gap-5">
          <p>Current User logged in:</p> {"  "} <span className='text-blue-600'>{currentUser.username}</span> 
          <button 
            className='ml-2 rounded-lg border px-4 py-2'
            onClick={handleSignOut}
          >
            { loading ? <Loader/> : 'Sign Out'}
          </button>
        </div>
      ) : (
        <div className='flex flex-row gap-5'>
          <p>No User currently logged in</p>
          <Link to='/signin' className='text-red-400 hover:underline'>Sign In</Link>
          <Link to='/' className='text-blue-400 hover:underline'>Register</Link>
        </div>
      )}
    </div>
  )
}
