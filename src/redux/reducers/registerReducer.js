import { createReducer } from "@reduxjs/toolkit";
import register from '../actions/registerAction'

const initialState = {
    data:{},
    error:null,
    message: null,
    loading:false
}

const registerReducer = createReducer(initialState, (builder) =>{
    builder
        .addCase(register.fulfilled, (state, action) => {
            const newState = {
                ...state
            }
            if (action.payload.error){
                newState.error = action.payload.error
                newState.data = initialState.data
            }else{
                newState.data = action.payload
                newState.error = null
            }
                return newState
        })
        .addCase(register.pending, (state, action) => {
            const newState = {
                ...state,
                loading:true,
                message:'Registering...'
            }
            return newState
        })
})

export default registerReducer