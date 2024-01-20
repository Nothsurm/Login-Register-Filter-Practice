import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const [formData, setFormData] = useState('')

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            const data = await result.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='flex justify-center min-h-screen'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5 m-auto'>
        <div className="flex flex-col">
          <label htmlFor="name">name:</label>
          <input 
            type="text" 
            id='name'
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
        >
            Signup
        </button>
        </div>
        <div className="">
          Already registered? <Link to='/signin' className='text-blue-500 hover:underline'>Sign in</Link>
        </div>
      </form>
    </div>
  )
}