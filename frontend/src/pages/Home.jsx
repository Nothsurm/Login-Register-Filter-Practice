import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

export default function Home() {
    const [formData, setFormData] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const { currentUser } = useSelector((state) => state.user)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.id]: e.target.value.trim()
        })
    }

    useEffect(() => {
      if (currentUser) {
        toast.success('Already logged in')
        navigate('/products')
      }
    }, [toast, navigate, currentUser])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.username || !formData.email || !formData.password) {
            return setErrorMessage('Please fill in all the inputs')
        }

        try {
            setErrorMessage(null)
            setLoading(true)
            setTimeout(() => setLoading(false), 2000)
            const result = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            const data = await result.json()
            if (data.success === false) {
                return setErrorMessage(data.message)
            }
            setLoading(false)
            toast.success('User successfully created')
            navigate('/signin')
        } catch (error) {
            setLoading(false)
            setErrorMessage(data.message)
            toast.error('Something went wrong, please try again')
        }
    }
  return (
    <div className='flex flex-col min-h-screen'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5 m-auto'>
        <div className="flex flex-col">
          <label htmlFor="username">username:</label>
          <input 
            type="text" 
            id='username'
            placeholder='Enter name'
            className='border p-2 rounded-lg bg-zinc-600 text-white'
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">email:</label>
          <input 
            type="email" 
            id='email'
            placeholder='Enter email'
            className='border p-2 rounded-lg bg-zinc-600 text-white'
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">password:</label>
          <input 
            type="password" 
            id='password'
            placeholder='Enter password'
            className='border p-2 rounded-lg bg-zinc-600 text-white'
            onChange={handleChange}
          />
        </div>
        <div className="">
        <button 
            type='submit'
            className='px-4 py-2 border rounded-lg bg-blue-300 hover:bg-blue-400 transform duration-150'
            disabled={loading}
        >
            {loading ? (<Loader />) : 'Sign-Up'}
        </button>
        </div>
        <div className="">
          Already registered? <Link to='/signin' className='text-blue-500 hover:underline'>Sign in</Link>
        </div>
      </form>
      <div className="">
      {
        errorMessage && (
            <div className="mt-5 text-lg bg-red-500 p-2 rounded-lg">{errorMessage}</div>
        )
      }
      </div>
    </div>
  )
}