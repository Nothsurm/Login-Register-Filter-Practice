import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import Loader from "../components/Loader";

export default function SignIn() {
    const [formData, setFormData] = useState('')
    const { loading, error } = useSelector((state) => state.user)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.id]: e.target.value.trim()
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.email || !formData.password) {
            console.log('Please fill in all inputs')
        }

        try {
            dispatch(signInStart())
            const result = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            const data = await result.json()
            if (data.success === false) {
                dispatch(signInFailure(data.message))
            }
            dispatch(signInSuccess(data))
            navigate('/products')
        } catch (error) {
            dispatch(signInFailure(error.message))
        }
    }

  return (
    <div className='flex justify-center min-h-screen'>
        <div className="m-auto">
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
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
                <div>
                    <button 
                        type='submit'
                        className='px-4 py-2 border rounded-lg bg-blue-300 hover:bg-blue-400 transform duration-150'
                    >
                        { loading ? <Loader/> : 'Sign In'}
                    </button>
                </div>
                <div className="">
                    Don't have an account? <Link to='/' className='text-blue-500 hover:underline'>Register</Link>
                </div>
            </form>
            { error && (
                <div className="mt-5 text-lg bg-red-500 p-2 rounded-lg">{error}</div>
            ) }
        </div>
    </div>
  )
}
