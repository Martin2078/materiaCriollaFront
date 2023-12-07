import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import edit from "../../public/images/edit.png"
import borrar from "../../public/images/borrar.png"
import EditProduct from "./EditProduct";
import añadirWhite from "../../public/images/añadirWhite.png"
import CreateProducto from "../components/CreateProducto";
import { toast, Toaster } from 'react-hot-toast'
import checkoutActions from "../redux/actions/checkoutAction";
import login from "../redux/actions/singInAction";
const deleteCheckout = checkoutActions.deleteCheckout
const Admin = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((store) => store.profile)

  const [productos, setProductos] = useState([])
  const [change, setChange] = useState(false)
  const [producto, setProducto] = useState({})
  const [productoModificado, setProductoModificado] = useState({})
  const [productoBorrado, setProductoBorrado] = useState({})
  const [searchv, setSearchv] = useState("")
  const [productosFiltrados, setProductosFiltrados] = useState(productos)
  const [show, setShow] = useState(false)
  const [categorias, setCategorias] = useState([])
  const [next, setNext] = useState()
  const [prev, setPrev] = useState()
  const [page, setPage] = useState(1)
  const [maxPages, setMaxPages] = useState()

  const search = useRef();
  useEffect(() => {
    if (!token || !token.length) {
      if (localStorage.length > 0) {
        const tokenStorage = localStorage.getItem('token')
        const userStorage = JSON.parse(localStorage.getItem('user'))
        const data = { user: userStorage, token: tokenStorage }
        dispatch(login(data))
      }
    } else {
      getProducts()
      getCategory()
    }
  }, [productoModificado, page, token])




  const getCategory = async () => {
    await axios("https://materiacriollaback.onrender.com/categorys")
      .then((res) => {
        setCategorias(res.data.response)
      })
      .catch((err) => console.log(err));
  }

  const getProducts = async () => {
    const id = user._id
    await axios(`https://materiacriollaback.onrender.com/productos/userproducts/${id}?page=${page}&category=${categorias.join(",")}`)
      .then((res) => {
        setProductos(res.data.response)
        setProductosFiltrados(res.data.response)
        setNext(res.data.pages.next)
        setPrev(res.data.pages.prev)
        setMaxPages(res.data.pages.maxPages)

      })
      .catch((err) => console.log(err));

  }

  function pagination(start, max) {
    let template = []
    for (let i = start; i < max; i++) {
      template.push(<button className={`${page == i ? "text-blue-700 font-bold" : ""}`} onClick={() => setPage(i)}>{i}...</button>)
    }
    template.push(<button className={`${page == max ? "text-blue-700 font-bold" : ""}`} onClick={() => setPage(max)}>{max}...</button>)
    return template
  }
  const handleSearch = (e) => {
    filter(e.target.value)
  }

  const modificarProducto = async (producto) => {
    await axios.put(`https://materiacriollaback.onrender.com/productos/userproducts`, producto)
      .then((res) => {

        setProductoModificado(res.data.response)
        getProducts()
      }

      )

  }

  const filter = (data) => {

    if (data.length > 0) {
      let filtrados = productos.filter(produ => produ.name.toLowerCase().includes(data.toLowerCase()))
      setProductosFiltrados(filtrados)
    } else {
      setProductosFiltrados(productos)
    }
  }

  const handleCreate = async (producto) => {

    await axios.post(`https://materiacriollaback.onrender.com/productos/createproduct`, producto)
      .then((res) => {
        setProductoModificado(res.data.response)

        if (res.data.success) {
          toast.success("A product has beed created succesfully")

        } else {
          toast.error("Error creating product: " + res.data.message)
        }
      })


  }

  const showCreate = () => {
    setShow(true)
  }


  const handleEditProduct = (data) => {
    setChange(true)
    setProducto(data)

  }

  const handleDelete = async (data) => {
    await axios.delete(`https://materiacriollaback.onrender.com/productos/userproducts/delete/${data}`)
      .then((res) => {
        dispatch(deleteCheckout(data))
        setProductoModificado(res.data.response)
        getProducts()
      })

  }

  const cardStyle = {


    border: '1px solid #000',
    padding: '16px',

    display: 'flex',
    flexDirection: 'column',

    borderRadius: '10px',
    maxWidth: '300px',

  };


  const filterInputStyle = {

    height: '40px',
    fontSize: '16px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',

  };

  const checkboxStyle = {
    width: '20px',
    height: '20px',
    marginRight: '8px',
  };

  const colorContainerStyle = {
    display: 'flex',
    gap: '8px',
  };

  const imageStyle = {
    width: '6rem',
    height: '6rem',
    objectFit: 'contain',


  };



  return (

    <div className='h-full w-full flex flex-col items-center gap-5'>
      <Toaster position='top-center' toastOptions={{ success: { duration: 2000 }, error: { duration: 2000 } }} />
      <div className="flex flex-col items-center gap-5 lg:flex-row w-full justify-between px-5 pt-4">
        <h1 className="font-bold text-2xl sm:text-3xl">My products</h1>
        <input type="search" onChange={(e) => { handleSearch(e); setPage(1) }} ref={search} style={filterInputStyle} className="outline-none w-5/6 lg:w-2/6" placeholder="search your Product" />
      </div>
      <div onClick={() => { showCreate() }} className="flex items-center cursor-pointer h-10 lg:h-16 w-11/12 lg:w-1/3 rounded-xl bg-[url('/images/madera.png')] items gap-2 lg:gap-5 justify-center text-center">
        <p className="text-xl lg:text-2xl text-white font-semibold ">Create a new product</p>
        <img src={añadirWhite} className="w-8 lg:w-10 h-8 lg:h-10 " alt="" />
      </div>
      {change && <EditProduct modificarProducto={modificarProducto} producto={producto} change={change} setChange={setChange} />}
      {show ? <CreateProducto show={show} setShow={setShow} user={user} categorias={categorias} handleCreate={handleCreate} /> : null}

      <div className="lg:overflow-y-scroll flex flex-col items-center justify-center md:flex-row md:flex-wrap gap-x-5 gap-y-20 pt-20 pb-5 h-full  lg:h-[78vh] w-full">
        {productosFiltrados.map((product) => (
          <div key={product._id} className="w-[90vw] min-[425px]:w-[80vw] md:w-[40vw] lg:w-[25vw] xl:w-[20vw] h-[35vh] md:h-[40vh] px-4 border border-black shadow-md shadow-[#666] rounded-md flex flex-col justify-center items-center ">
            <div className="h-1/6 w-full flex items-center justify-center">
              <img src={product.product_photo} alt="" style={imageStyle} className="bg-white border-solid -translate-y-8 border-black border-2 rounded-full" />
            </div>
            <div className="w-full h-4/6 flex flex-col items-center justify-start">
              <div className="w-full h-3/4">
                <h2 className='text-black text-lg lg:text-xl font-bold text-center h-1/3 '>{product.name.length>40? `${product.name.slice(0,40)}...` : product.name}</h2>
                <p className="text-start overflow-hidden ">{product.description.length > 90 ? `${product.description.slice(0, 90)}...` : product.description}</p>
              </div>
              <div className="w-full h-1/4">
                  <p className="font-bold">Stock left: {product.quantity}</p>
                  <p className="font-bold">Actual price: {product.price}</p>
              </div>
            </div>
            <div className="h-1/6 w-full flex items-center justify-between">
              <button onClick={() => handleEditProduct(product)}><img src={edit} className="w-7  " /> </button>
              <button onClick={() => handleDelete(product._id)}><img src={borrar} className="w-7" /> </button>
            </div>
          </div>
        ))}


      </div>

    </div>

  );
}

export default Admin;