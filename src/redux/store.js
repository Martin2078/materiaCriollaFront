import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducers/singInReducer"
import registerReducer from "./reducers/registerReducer"
import productsReducer from './reducers/productosReducer'
import categoriesReducer from './reducers/categoriesReducer'
import paymentReducer from './reducers/paymentReducer'

const store = configureStore({
    reducer: {
        register: registerReducer,
        profile: authReducer,
        products: productsReducer,
        categories: categoriesReducer,
        payment: paymentReducer
    }
})

export default store
