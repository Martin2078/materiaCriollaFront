import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../AboutUs.css'
import { useDispatch, useSelector } from 'react-redux'
import login from '../redux/actions/singInAction';

const ContactForm = () => {
  const dispatch = useDispatch()
  const { user, token } = useSelector((store) => store.profile)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    messageType: 'General Inquiry',
    message: '',
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
    if (formData.name && formData.email && formData.messageType && formData.message) {
      toast.success('Message sent succesfully!', {
        position: 'top-center',
        autoClose: 5000,
        className: 'custom-toast-success',
        icon: null,
      });
    } else {
      if (!formData.name) {
        toast.error('Please enter your name');
      }
      if (!formData.email) {
        toast.error('Please enter your email');
      }
      if (!formData.messageType) {
        toast.error('Please select the type of message');
      }
      if (!formData.message) {
        toast.error('Please enter your message');
      }
    }
  };

  useEffect(() => {
    if (!token || !token.length) {
      if (localStorage.length > 0) {
        const tokenStorage = localStorage.getItem('token')
        const userStorage = JSON.parse(localStorage.getItem('user'))
        const data2 = { user: userStorage, token: tokenStorage }
        dispatch(login(data2))
      }
    }
  }, [token])

  return (
    <div className="register-container  w-full h-full md:h-screen flex flex-col md:flex-row lg:px-5 bg-white">
      <div className="w-full md:w-1/2 flex flex-col bg-white items-center justify-center md:p-4 ">
        <form className="bg-white shadow-2xl px-6  border-b pb-4 w-full flex flex-col items-center rounded-lg" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold mb-1 pt-5">Contact Us</h1>
          <div className="mb-4 w-full">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-0">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input  px-2 py-2 border rounded-bl-full w-full"
              onChange={handleInputChange}
              value={formData.name}
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-0">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input  px-2 py-2 border rounded-ee-full w-full"
              onChange={handleInputChange}
              value={formData.email}
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="messageType" className="block text-gray-700 font-bold mb-0">
              Message Type
            </label>
            <select
              id="messageType"
              name="messageType"
              className="form-input px-3 py-2 border rounded w-full"
              onChange={handleInputChange}
              value={formData.messageType}
            >
              <option value="General Inquiry">General Inquiry</option>
              <option value="Product Support">Product Support</option>
              <option value="Billing Question">Billing Question</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="message" className="block text-gray-700 font-bold mb-0">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="form-input px-3 py-2 border rounded w-full"
              style={{ minHeight: '150px', width: '100%', resize: 'none' }}
              onChange={handleInputChange}
              value={formData.message}
            ></textarea>
          </div>
          <div className='flex flex-col w-full'>
            <button
              type="submit"
              className="text-white text-2xl font-bold py-2 rounded mt-4 w-full"
              style={{ backgroundImage: 'url("public/images/madera.png")', backgroundSize: 'cover' }}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
      <div className="contact-info bg-white w-full md:w-1/2 shadow-md lg:p-8 rounded  sm:p-44" style={{ position: 'relative', zIndex: 1 }}>
        <div className="video-background px-2 py-2" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <video className='rounded-lg' autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
            <source src="../public/videos/matevideo1.mp4" />
          </video>
        </div>
        <div className='contact-info'>
          <h1
            className=" text-white font-bold mb-4 " style={{ position: 'relative', zIndex: 2 }}> Our Mission</h1>
          <p className="text-white" style={{ position: 'relative', zIndex: 2 }}>
            At Materia Criolla, we're dedicated to sharing the tradition of mate with the world through high-quality products, fostering community, and promoting well-being.
          </p>

          <h1 className=" text-white font-bold mt-6 mb-4" style={{ position: 'relative', zIndex: 2 }}>Our Vision</h1>
          <p className="text-white" style={{ position: 'relative', zIndex: 2 }}>
            Our vision at Materia Criolla is to be the global symbol of quality mate experiences, uniting people in camaraderie and wellness worldwide.
          </p>
          <h1 className=" text-white font-bold mt-6 mb-4" style={{ position: 'relative', zIndex: 2 }}>Our Values</h1>
          <ul className="list-disc list-inside text-white" style={{ position: 'relative', zIndex: 2 }}>
            <li >Integrity</li>
            <li >Innovation</li>
            <li >Teamwork</li>
            <li >Passion</li>
          </ul>

        </div>
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

export default ContactForm;