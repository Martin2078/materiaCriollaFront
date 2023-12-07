/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../redux/actions/singInAction';
import imagenmate from '../assets/imagen-mate.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, useToaster, toast } from 'react-hot-toast';


const toastOptions = {
  position: 'top-center',
  reverseOrder: false,
};

function SignIn() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, error } = useToaster();

  const { user, token } = useSelector(store => store.profile);
  async function navigateToHome() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate('/');
  }
  // Función para manejar el inicio de sesión
  const handleSignIn = async (e) => {
    e.preventDefault(); // Evita la recarga de la página
    const email = emailRef.current.value; // Obtiene el valor del campo de correo
    const password = passwordRef.current.value; // Obtiene el valor del campo de contraseña

    if (!email && !password) {
      // Si el correo o la contraseña están vacíos, mostrar un toast
      toast.error('Both fields are empty', { appearance: 'error' });
      return;
    }
    const userData = { email, password }; // Datos del usuario a enviar al servidor
    dispatch(Login(userData))
      .then(res => {
        if (res.payload.error) {
          toast.error(res.payload.error);
        }
        else {
          toast.success('Successful login.');
        }
      })
  };
  useEffect(() => {
    if (!token || !token.length) {
      if (localStorage.length > 0) {
        const tokenStorage = localStorage.getItem('token')
        const userStorage = JSON.parse(localStorage.getItem('user'))
        const data = { user: userStorage, token: tokenStorage }
        dispatch(Login(data))
      }
    } else {
      navigateToHome()
    }
  }, [token])

  return (
    <div className="login-container w-full h-full lg:h-screen flex flex-col items-center justify-center md:flex-row lg:pl-5">
      <div className="w-full h-[80vh] lg:h-full md:w-1/2 flex flex-col items-center justify-center p-4 lg:p-8">
        <div className="w-full lg:w-11/12 h-[50vh] rounded-xl shadow-2xl flex flex-col items-center p-4 lg:px-6">
          <div className='w-full flex flex-col items-center h-[10vh]'>
          <h1 className="text-4xl font-bold ">Login</h1> 
          <p className='text-2xl'>Let`s drink mate!</p>
          </div>
          <form onSubmit={handleSignIn} className="w-full h-full flex flex-col justify-evenly items-center"> 
            <div className="w-full h-1/5">
              <label htmlFor="email" className="block text-gray-700 font-bold">Email</label>
              <input
                ref={emailRef}
                type="email"
                className="w-full h-2/3 py-1 px-2 form-input border rounded"  // Aumenta el margen inferior
              />
            </div>
            <div className="w-full h-1/5">
              <label htmlFor="password" className="block text-gray-700 font-bold ">Password</label>
              <input
                ref={passwordRef}
                type="password"
                className="w-full h-2/3 py-1 px-2 form-input border rounded"
              />
            </div>
            <div className='w-full h-1/5 flex flex-col xl:flex-row py-2 xl:gap-2'>
              <p className='font-semibold'>Don`t you have an account yet?</p>
              <Link to={'/Register'}><p className='text-blue-600 font-semibold'>Register</p></Link>
            </div>
            <div className='w-full flex flex-col items-end md:flex-row h-1/5 '>
              <button onClick={() => handleSignIn()}
                type="submit"
                className="h-[5vh]  text-white bg-[url('../public/images/madera.png')]  text-2xl font-bold rounded w-full  shadow-md shadow-[#666]"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full h-full md:w-1/2 shadow-md rounded hidden lg:block bg-white p-6">
        <img
          src={imagenmate}
          alt="Login"
          className="w-full h-full object-cover hidden md:block" />
      </div>

      <Toaster
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
    </div >
  );
}

export default SignIn;