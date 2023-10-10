/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import CheckoutIcon from '../../public/images/checkout.png?url'
import LogOut from '../../public/images/logOut.png?url'
import Information from '../../public/images/information.png?url'
import { Link } from 'react-router-dom'
import HomeIcon from '../../public/images/home.png?url'
import ProductsIcon from '../../public/images/mate.png?url'
import menu from '../../public/images/menu.png?url'
import close from '../../public/images/close.png?url'
import logIn from '../../public/images/logIn.png?url'
import register from '../../public/images/register.png?url'
import logo from '../../public/images/logo.jpeg'

const display = ({ open, setOpen }) => {
    return (
        <div className={`relative ${open ? "lg:w-3/12" : "lg:w-1/12"} min-[320px]:${open ? "h-1/6" : "h-2/6"} lg:h-screen  flex flex-col items-center justify-between lg:pt-16 lg:pb-10 min-[320px]:py-5 border-b lg:border-r lg:border-b-0 border-black min-[320px]:gap-5 lg:gap-0`}>
            <img onClick={() => setOpen(!open)} className={`absolute block cursor-pointer ${!open ? "top-4 left-9 w-6" : "top-2 right-2 w-8"}`} src={!open ? menu : close} alt="" />
            <img className={`${!open && "absolute top-3 right-3"} block lg:hidden w-16`} src={logo} alt="" />

            <div className={`w-full min-[320px]:hidden lg:flex min-[320px]:px-4 lg:px-0 justify-center items-start gap-5 ${!open && "hidden"}`}>
                <Link to={'/Me'}><img className='w-16 h-16 rounded-full' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
                    {/* {user?.photo ?
                            <img className='w-16 h-16 rounded-full src={user.photo} alt="" />
                            :
                        <img className='w-16 h-16 rounded-full' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" /> } */}
                </Link>
                {open &&
                    <div>
                        <h1 className='font-bold text-xl'>name</h1>
                        <p className='text-sm'>email@gmail.com</p>
                    </div>
                }
            </div>

            <ul className={`${open ? " lg:pt-0 w-full lg:items-center " : "min-[320px]:px-4 pt-20"} list-none flex lg:gap-10 lg:flex-col lg:h-4/6 lg:justify-start min-[320px]:justify-center min-[320px]:h-2/6 min-[320px]:flex-wrap min-[320px]:gap-5`}>
                <li className={`${open && "min-[320px]:w-5/12"}`}><Link to={'/'} className='flex gap-4 justify-start'>
                    <img className='w-6 h-6' src={HomeIcon} alt="" />
                    {open && "Home"}
                </Link></li>
                <li className={`${open && "min-[320px]:w-5/12"}`}><Link to={'/'} className='flex gap-4 justify-start'>
                    <img className='w-6 h-6' src={ProductsIcon} alt="" />
                    {open && "Products"}
                </Link></li>
                <li className={`${open && "min-[320px]:w-5/12"}`}><Link to={'/'} className='flex gap-4 justify-start'>
                    <img className='w-6 h-6' src={Information} alt="" />
                    {open && "Information"}
                </Link></li>
                <li className={`${open && "min-[320px]:w-5/12"}`}><Link to={'/'} className='flex gap-4 justify-start'>
                    <img className='w-6 h-6 ' src={CheckoutIcon} alt="" />
                    {open && "Checkout"}
                </Link></li>
                {/* {!token ? <>
                    <li className='min-[320px]:w-5/12 lg:w-full'>
                    <Link to={'/'} className='flex gap-4'>
                        <img className='w-6 h-6 ' src={logIn} alt="" />
                        {open && "Log In"}
                    </Link>
                    </li>
                    <li className='min-[320px]:w-5/12 lg:w-full'>
                    <Link to={'/Register'} className='flex gap-4'>
                        <img className='w-6 h-6 ' src={register} alt="" />
                        {open && "Register"}
                    </Link>
                    </li>
                </>
                    :<>
                    <li className={`${open&&"min-[320px]:w-5/12"} lg:w-full`}><Link to={'/Me'} className='flex gap-4 justify-start'>
                        <img className='w-6 h-6 rounded-full' src={token?user.photo:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="" />
                        {open && "Profile"}
                    </Link></li>
                    <li className={`${open&&"min-[320px]:w-5/12"} lg:w-full`}>
                    <Link to={'/'}>        <img className='w-6 h-6 rounded-full' src={LogOut} alt="" />
                        {open && "Log Out"}</Link>
                    </li>
                    </>
                } */}
            </ul>

            {/* {!token ? <>
                    <Link to={'/'} className='flex gap-4'>
                        <img className='w-6 h-6 ' src={logIn} alt="" />
                        {open && "Log In"}
                    </Link>
                    <Link to={'/'} className='flex gap-4'>
                        <img className='w-6 h-6 ' src={register} alt="" />
                        {open && "Register"}
                    </Link>
                </>
                    :
                    <Link to={'/'}>        <img className='w-6 h-6 rounded-full' src={LogOut} alt="" />
                        {open && "Log Out"}</Link>
                } */}

            <img className='w-16 h-16 rounded-full min-[320px]:hidden lg:block' src={logo} alt="" />
        </div>
    )
}

export default display