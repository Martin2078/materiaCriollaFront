import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const tokenStorage=localStorage.getItem('token')
const headers = ()=> {
    return {
  headers: { "Authorization": `Bearer ${tokenStorage}` }
    }
}

const addCheckout = createAsyncThunk('addCheckout', async (data) => {
    let userStorage=JSON.parse(localStorage.getItem('user'))
    try {
        const response = await axios.post(`https://materiacriollaback.onrender.com/checkout/${userStorage._id}`,data,headers())
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(response.data.response.user))
        return {
            user:response.data.response.user,
            message:response.data.message
        }
    } catch (error) {
        return{message:error.response.data.message}
    }
})

const deleteCheckout = createAsyncThunk('deleteCheckout', async (data) => {
    try {
        const response = await axios.delete(`https://materiacriollaback.onrender.com/checkout/${data}`,headers())
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(response.data.response.user))
        return {
            user:response.data.response.user,
            message:response.data.message
        }
    } catch (error) {
        return{message:error.response.data.message}
    }
})

const updateCheckout = createAsyncThunk('updateCheckout', async (data) => {
    let userStorage=JSON.parse(localStorage.getItem('user'))
    try {
        const response = await axios.put(`https://materiacriollaback.onrender.com/checkout/${userStorage._id}`,data,headers())
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(response.data.response.user))
        return {
            user:response.data.response.user,
            message:response.data.message
        }
    } catch (error) {
        return{message:error.response.data.message}

    }
})

const checkoutActions={addCheckout,deleteCheckout,updateCheckout}
export default checkoutActions
