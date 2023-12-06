import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useDispatch, useSelector } from 'react-redux'
import login from '../redux/actions/singInAction'
import productsAction from '../redux/actions/productosAction'
import categoriesAction from '../redux/actions/categoriesAction'
import { Link } from 'react-router-dom'

const MyCarousel = () => {
  const dispatch = useDispatch()
  const getProducts = async () => {
    try {
      dispatch(productsAction())
      dispatch(categoriesAction())
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  const products = useSelector((store) => store.products.products)

  const { user, token } = useSelector(store => store.profile)
  useEffect(() => {
    if (!token || !token.length) {
      if (localStorage.length > 0) {
        const tokenStorage = localStorage.getItem('token')
        const userStorage = JSON.parse(localStorage.getItem('user'))
        const data = { user: userStorage, token: tokenStorage }
        dispatch(login(data))
      }
    }
  }, [token])
  return (
    <div className="w-full h-full mx-auto flex flex-col items-center lg:flex-row lg:px-5 gap-4">
      <div className="w-full lg:w-3/4 h-full min-[425px]:w-11/12 lg:h-[100vh] flex flex-col justify-between gap-10 lg:gap-0">
        <div className="h-full lg:max-h-[55vh] xl:max-h-[60vh] w-full p-4 shadow-lg rounded-lg">
          <Carousel
            showArrows={true}
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            transitionTime={500}
          >
            <div className="bg-[url('/images/mates2.jpg')] bg-cover bg-no-repeat bg-center h-[25vh] lg:h-[30vh] xl:h-[35vh]"></div>
            <div className="bg-[url('/images/side-cover2.jpg')] bg-cover bg-no-repeat bg-center h-[25vh] lg:h-[30vh] xl:h-[35vh]"></div>
            <div className="bg-[url('/images/yerba3.png')] bg-cover bg-no-repeat bg-center h-[25vh] lg:h-[30vh] xl:h-[35vh]"></div>
          </Carousel>
          <h2 className="text-xl font-bold">Celebrating Mate: A Visual Journey</h2>
          <p className='text-sm lg:text-base'>
            Explore the rich and cultural world of mate through this captivating carousel. Discover the vibrant hues and unique shapes of traditional mate gourds, the lush greenery of yerba mate leaves, and the warmth of shared moments over steaming mate cups. Join us on a visual journey into the heart of South American tradition with these captivating images.
          </p>
        </div>
        <div className="h-full lg:max-h-[45vh] xl:max-h-[40vh] w-full py-4 gap-4 flex flex-col items-center md:flex-row">
          <div className="h-[40vh] lg:h-full w-10/12 md:w-4/12 md:h-[45vh]  lg:w-2/6 bg-white flex flex-col justify-evenly p-4 lg:p-2 shadow-lg rounded-md">
            <img className='h-2/5 self-center' src={products[0]?.product_photo} alt="" />
            <div className='w-full h-1/2 flex flex-col justify-center'>
              <h3 className="text-lg lg:text-xl font-semibold h-2/5 text-center">{products[0]?.name}</h3>
              <p className='h-3/5 w-full text-sm lg:text-base'>{products[0]?.description.length > 95 ? `${products[0].description.slice(0, 95)}...` : products[0].description}</p>
            </div>
            <Link to={`/Products/${products[0]?.name}`}><button className="mt-2 w-full font-semibold text-lg text-white px-4 py-1 rounded-md " style={{
              backgroundImage: `url('../public/images/madera.png')`,
              backgroundSize: 'cover',
            }}>
              View more
            </button></Link>
          </div>
          <div className="h-[40vh] lg:h-full w-10/12 md:w-4/12 md:h-[45vh]  lg:w-2/6 bg-white flex flex-col justify-evenly p-4 shadow-lg rounded-md">
            <img className='h-2/5 self-center' src={products[1]?.product_photo} alt="" />
            <div className='w-full h-3/5 flex flex-col justify-center'>
              <h3 className="text-lg lg:text-xl text-center font-semibold h-2/5">{products[1]?.name}</h3>
              <p className='h-3/5 w-full text-sm lg:text-base'>{products[1]?.description.length > 95 ? `${products[1].description.slice(0, 95)}...` : products[1].description}</p>
            </div>
            <Link to={`/Products/${products[1]?.name}`}><button className="mt-2 w-full font-semibold text-lg text-white px-4 py-1 rounded-md " style={{
              backgroundImage: `url('../public/images/madera.png')`,
              backgroundSize: 'cover',
            }}>
              View more
            </button></Link>
          </div>
          <div className="h-[40vh] lg:h-full w-10/12 md:w-4/12 md:h-[45vh]  lg:w-2/6 bg-white flex flex-col justify-evenly p-4 shadow-lg rounded-md">
            <img className='h-2/5 self-center' src={products[2]?.product_photo} alt="" />
            <div className='w-full h-3/5 flex flex-col justify-center'>
              <h3 className="text-lg lg:text-xl font-semibold h-2/5 text-center">{products[2]?.name}</h3>
              <p className='h-3/5 w-full text-sm lg:text-base'>{products[2]?.description.length > 95 ? `${products[2].description.slice(0, 95)}...` : products[2].description}</p>
            </div>
            <Link to={`/Products/${products[2]?.name}`}><button className="mt-2 w-full font-semibold text-lg  text-white px-4 py-1 rounded-md " style={{
              backgroundImage: `url('../public/images/madera.png')`,
              backgroundSize: 'cover',
            }}>
              View more
            </button></Link>
          </div>
        </div>
      </div>
      <div className="w-1/4 h-[100vh] lg:flex items-center hidden ">
        <img className='h-[90vh] rounded-sm ' src="/images/tradicion.jpg" alt="" />
      </div>
    </div>
  );
};

export default MyCarousel;
