import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import register from '../redux/actions/registerAction';
import '../Register.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const registrationError = useSelector((state) => state.register.error);

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    birthdate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.surname && formData.email && formData.password && formData.birthdate) {
      dispatch(register(formData));
      if (!registrationError) {
        toast.success(
          <div>
            Successful registration
          </div>,
          {
            position: 'top-center',
            autoClose: 2000,
            className: 'custom-toast-success',
            icon: null,
          }
        );
      }
    } else {
      if (!formData.name) {
        toast.error('Please enter your name');
      }
      if (!formData.surname) {
        toast.error('Please enter your last name');
      }
      if (!formData.email) {
        toast.error('Please enter your email');
      }
      if (!formData.password) {
        toast.error('Please enter your password');
      }
      if (!formData.birthdate) {
        toast.error('Please enter your date of birth');
      }
    }
    if (registrationError) {
      toast.error(registrationError.message);
    }
  };

  return (
    <div className="w-full h-full lg:h-screen flex flex-col md:flex-row lg:pl-5">
      <div className="w-full h-[80vh] lg:h-full md:w-1/2 flex flex-col items-center justify-center p-4 lg:p-8">
        <div className="w-full lg:w-11/12 h-[80vh] lg:h-[70vh] rounded-xl shadow-2xl flex flex-col items-center p-4 lg:px-6">
          <h1 className="text-4xl font-bold h-[5vh]">Join Us</h1>
          <form className="w-full h-full flex flex-col justify-evenly" onSubmit={handleSubmit}>
            <div className="w-full">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-0">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full form-input p-2 border rounded"
                onChange={handleInputChange}
                value={formData.name}
              />
            </div>
            <div className="w-full">
              <label htmlFor="surname" className="block text-gray-700 font-bold mb-0">Surname</label>
              <input
                type="text"
                id="surname"
                name="surname"
                className="w-full form-input p-2 border rounded"
                onChange={handleInputChange}
                value={formData.surname}
              />
            </div>
            <div className="w-full">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-0">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full form-input p-2 border rounded"
                onChange={handleInputChange}
                value={formData.email}
              />
            </div>
            <div className="w-full">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-0">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full form-input p-2 border rounded"
                onChange={handleInputChange}
                value={formData.password}
              />
            </div>
            <div className="w-full">
              <label htmlFor="birthdate" className="block text-gray-700 font-bold mb-0">Birthdate</label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                className="w-full form-input p-2 border rounded"
                onChange={handleInputChange}
                value={formData.birthdate}
              />
            </div>
            <div className='w-full flex flex-col py-1 xl:flex-row xl:gap-2 xl:items-center'>
              <p className='font-semibold'>You already have an account?</p>
             <Link to={'/SignIn'}><p className='text-blue-600 font-semibold'>Sign In</p></Link>
            </div>
            <div className='w-full flex flex-col md:flex-row'>
              <button
                type="submit"
                className="h-[5vh] text-white text-2xl shadow-md shadow-[#666] font-bold rounded  w-full bg-[url('../public/images/madera.png')]"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full h-[80vh] lg:h-full md:w-1/2 shadow-md rounded hidden md:block bg-white p-6">
        <img
          src='../img/1.png'
          alt="Mate"
          className="w-full h-full object-cover" />
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="toast-without-icon"
        icon={true}
      />
    </div>
  );
};

export default Register;
