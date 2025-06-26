import { configureStore } from "@reduxjs/toolkit"
import cityReducer from "./cities"
export const store = configureStore({
    reducer:{
        city:cityReducer
    }
})