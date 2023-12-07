import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const products = createAsyncThunk('getProducts', async () => {
    try {
        const response = await axios.get('https://materiacriollaback.onrender.com/productos')
        return response.data
    } catch (error) {
        return {error}
    }
})

export default products