import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const api = 'https://materiacriollaback.onrender.com';
// Acción asincrónica para cerrar sesion
const signOut = createAsyncThunk('signOut', async (data) => {
    let headers = { headers: { 'Authorization': `Bearer ${data}` } }
    try {
        const res=await axios.post(api + '/auth/signOut',null,headers)
        localStorage.clear()
        return res.data.message
    } catch (error) {
        console.log("error", error)
    }
})
export default signOut