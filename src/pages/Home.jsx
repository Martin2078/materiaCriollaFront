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
  const [screenwidth, setScreenWidth] = useState(window.innerWidth)
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
  const handleResize = () => {
    setScreenWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize);
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
    <div className="w-full h-screen mx-auto flex flex-col items-center lg:flex-row lg:px-5 gap-4">
      <div className="w-full lg:w-3/4 h-full min-[425px]:w-11/12 flex flex-col gap-10 lg:gap-0 xl:gap-6 py-2">
        <div className="h-full lg:max-h-[55vh] xl:max-h-fit w-full p-2 shadow-lg bg-[url('../public/images/madera.png')] rounded-b-xl  rounded-lg ">
          <Carousel
            showArrows={true}
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            transitionTime={500}
          >
            <div className="bg-[url('/images/mates2.jpg')] rounded-lg bg-cover bg-no-repeat bg-center h-[25vh] lg:h-[30vh] xl:h-[35vh]"></div>
            <div className="bg-[url('/images/side-cover2.jpg')] rounded-lg bg-cover bg-no-repeat bg-center h-[25vh] lg:h-[30vh] xl:h-[35vh]"></div>
            <div className="bg-[url('/images/yerba3.png')] rounded-lg bg-cover bg-no-repeat bg-center h-[25vh] lg:h-[30vh] xl:h-[35vh]"></div>
          </Carousel>
          <div className="w-full px-2 py-1">
            <h2 className="text-xl font-bold text-white" style={{textShadow:'1px 1px 1px #999'}}>Celebrating Mate:</h2>
            <p className='text-sm lg:text-base text-white font-medium' style={{textShadow:'1px 1px 1px black'}}>
              Explore the authentic flavor of mate! <br />
              On this site, you'll find a curated selection of high-quality yerbas, exclusive accessories, and everything you need to fully enjoy this exciting beverage. Dive into our catalog, choose your favorites, and let mate become a unique experience you can enjoy anytime.
            </p>
          </div>
        </div>
        <div className="h-full lg:max-h-[45vh] xl:max-h-fit w-full py-[0.5vh] flex flex-col ">
          <div className="w-full h-full lg:max-h-[4.5vh] flex justify-center md:justify-start ">
            <h2 className='text-3xl font-semibold'>Most populars</h2>
          </div>
          <div className='flex flex-col md:flex-row items-center h-full  lg:max-h-[40vh] w-full gap-4'>

            <div className="h-[45vh] xl:max-h-[35vh] lg:max-h-[40vh] w-10/12 md:w-4/12 md:h-[45vh]  lg:w-2/6 bg-white flex flex-col justify-evenly p-4 lg:p-2 shadow-lg shadow-[#777] rounded-md">
              <img className='h-2/5 w-full object-contain  self-center' src={products[0]?.product_photo} alt="" />
              <div className='w-full h-3/6 flex flex-col justify-center'>
                <h3 className="text-lg lg:text-xl font-semibold text-center">{screenwidth < 1024 ? products[0]?.name.length > 25 ? `${products[0]?.name.slice(0, 25)}...` : products[0]?.name : products[0]?.name.length > 15 ? `${products[0]?.name.slice(0, 15)}...` : products[0]?.name}</h3>
                <p className='w-full text-sm lg:text-base '>{screenwidth < 1024 ? products[0]?.description.length > 95 ? `${products[0]?.description.slice(0, 95)}...` : products[0]?.description : products[0]?.description.length > 55 ? `${products[0]?.description.slice(0, 55)}...` : products[0]?.description}</p>
              </div>
              <Link to={`/Products/${products[0]?.name}`}><button className="mt-2 w-full font-semibold text-lg text-white px-4 py-1 rounded-md " style={{
                backgroundImage: `url('../public/images/madera.png')`,
                backgroundSize: 'cover',
              }}>
                View more
              </button></Link>
            </div>
            <div className="h-[45vh] xl:max-h-[35vh] lg:max-h-[40vh] w-10/12 md:w-4/12 md:h-[45vh]  lg:w-2/6 bg-white flex flex-col justify-evenly p-4 lg:p-2 shadow-lg shadow-[#777] rounded-md">
              <img className='h-2/5 self-center w-full object-contain' src={products[1]?.product_photo} alt="" />
              <div className='w-full h-3/6 flex flex-col justify-center'>
                <h3 className="text-lg lg:text-xl font-semibold text-center">{screenwidth < 1024 ? products[1]?.name.length > 25 ? `${products[1]?.name.slice(0, 25)}...` : products[1]?.name : products[1]?.name.length > 15 ? `${products[1]?.name.slice(0, 15)}...` : products[1]?.name}</h3>
                <p className=' w-full text-sm lg:text-base '>{screenwidth < 1024 ? products[1]?.description.length > 95 ? `${products[1]?.description.slice(0, 95)}...` : products[1]?.description : products[1]?.description.length > 55 ? `${products[1]?.description.slice(0, 55)}...` : products[1]?.description}</p>
              </div>
              <Link to={`/Products/${products[1]?.name}`}><button className="mt-2 w-full font-semibold text-lg text-white px-4 py-1 rounded-md " style={{
                backgroundImage: `url('../public/images/madera.png')`,
                backgroundSize: 'cover',
              }}>
                View more
              </button></Link>
            </div>
            <div className="h-[45vh] xl:max-h-[35vh] lg:max-h-[40vh] w-10/12 md:w-4/12 md:h-[45vh]  lg:w-2/6 bg-white flex flex-col justify-evenly p-4 lg:p-2 shadow-lg shadow-[#777] rounded-md">
              <img className='h-2/5 self-center w-full object-contain' src={products[2]?.product_photo} alt="" />
              <div className='w-full h-3/6 flex flex-col justify-center'>
                <h3 className="text-lg lg:text-xl font-semibold text-center">{screenwidth < 1024 ? products[2]?.name.length > 25 ? `${products[2]?.name.slice(0, 25)}...` : products[2]?.name : products[2]?.name.length > 15 ? `${products[2]?.name.slice(0, 15)}...` : products[2]?.name}</h3>
                <p className='w-full text-sm lg:text-base '>{screenwidth < 1024 ? products[2]?.description.length > 100 ? `${products[2]?.description.slice(0, 100)}...` : products[2]?.description : products[2]?.description.length > 55 ? `${products[2]?.description.slice(0, 55)}...` : products[2]?.description}</p>
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
      </div>
      <div className="w-1/4 h-full lg:flex hidden py-2 ">
        <img className='h-full rounded-lg object-cover ' src="/images/tradicion.jpg" alt="" />
      </div>
    </div>
  );
};

export default MyCarousel;
