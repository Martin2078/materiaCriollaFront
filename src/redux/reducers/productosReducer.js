import { createReducer } from "@reduxjs/toolkit"
import getProductos from '../actions/productosAction'

const initialState = {
    products: [],
    error: null,
    loading:false,
    message:null
}

const getProductsReducer = createReducer(initialState, (builder) =>
    builder
        .addCase(getProductos.fulfilled, (state, action) => {
            const newState = {
                ...state,
            }
            if (action.payload.error) {
                newState.error = action.payload.error
                newState.products = initialState.products
            } else {
                newState.products = action.payload.response
                newState.error = null
            }
            return newState
        })
        .addCase(getProductos.pending, (state, action) => {
            const newState = {
                ...state,
                loading:true,
                message:'Getting products...'
            }
            return newState
        })
)

export default getProductsReducer