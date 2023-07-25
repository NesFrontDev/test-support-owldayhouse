"use client"
import { configureStore, createReducer } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice"

const store = configureStore({
    reducer:{
        cart:cartReducer,
    }
})

export default store