import { useEffect, useState } from 'react'
import { useAllProductsQuery } from '../redux/listing/listingSlice.js'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader.jsx'
import toast from 'react-hot-toast'

export default function Products() {
  const {data: products, isLoading} = useAllProductsQuery()
  const { currentUser } = useSelector((state) => state.user)
  const [sidebardata, setSidebardata] = useState({
    name: '',
    price: ''
  })
  const navigate = useNavigate()
  //console.log(products)

  useEffect(() => {
    if (!currentUser) {
      toast.error('Please login to browse the products')
      navigate('/signin')
    }
    const urlParams = new URLSearchParams(location.search)
    const nameFromUrl = urlParams.get('name')
    const priceFromUrl = urlParams.get('price')

    if (nameFromUrl || priceFromUrl) {
      setSidebardata({
        name: nameFromUrl || '',
        price: priceFromUrl || ''
      })
    }
  }, [toast, navigate, currentUser, location.search])

  const handleChange = (e) => {
    if (e.target.id === 'name') {
      setSidebardata({ ...sidebardata, name: e.target.value})
    }
    if (e.target.id === 'price') {
      setSidebardata({ ...sidebardata, price: e.target.value})
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams()
    urlParams.set('name', sidebardata.name)
    urlParams.set('price', sidebardata.price)
    const searchQuery = urlParams.toString()
    console.log(searchQuery)
    navigate(`?${searchQuery}`)
  }

  if (isLoading) {
    return <Loader/>
  }

  return (
    <div className="flex flex-row flex-wrap justify-around mt-10">
      <div className="w-[17rem] sm:w-[24rem]">
        <h1 className='mb-6 font-bold text-xl'>Filter Products</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 items-center'>
          <div className="flex gap-2 items-center">
            <label htmlFor="name">Name:</label>
            <input type="text" 
              id='name'
              placeholder='Search name'
              className='border rounded-lg p-3'
              value={sidebardata.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="price">Price:</label>
            <input type="number" 
              id='price'
              placeholder='£'
              className='border rounded-lg p-3'
              value={sidebardata.price}
              onChange={handleChange}
            />
          </div>
          <button 
            type='submit' 
            className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90'
          >
            Search
          </button>
        </form>
      </div>
      {products ? (products.map((product) => (
          <div key={product._id} className="flex flex-col gap-3">
            <div className="mt-10 sm:mt-0">
              <img src={product.image} alt={product.name} className='w-[10rem] h-[10rem]'/>
            </div>
            <div className="">
              Name: {product.name}
            </div>
            <div className="">
              Description: {product.description}
            </div>
            <div className="">
              Price: £{product.price}
            </div>
          </div>
      ))) : (
        <div className="mt-10 flex justify-center">No products listed!</div>
      )}
    </div>
  )
}
