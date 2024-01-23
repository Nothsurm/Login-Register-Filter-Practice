import React, { useEffect } from 'react'
import { useAllProductsQuery } from '../redux/listing/listingSlice.js'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader.jsx'
import toast from 'react-hot-toast'

export default function Products() {
  const {data: products, isLoading} = useAllProductsQuery()
  const { currentUser } = useSelector((state) => state.user)
  const navigate = useNavigate()
  //console.log(products)

  if (isLoading) {
    return <Loader/>
  }

  useEffect(() => {
    if (!currentUser) {
      toast.error('Please login to browse the products')
      navigate('/signin')
    }
  }, [toast, navigate, currentUser])

  return (
    <div className="flex flex-row flex-wrap justify-around mt-10">
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
