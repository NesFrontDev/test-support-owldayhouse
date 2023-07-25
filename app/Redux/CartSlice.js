"use client"
import {createSlice} from '@reduxjs/toolkit'


const cartSlice = createSlice({
    name:"Cart",
    initialState:[],
    reducers:{
        add(state,action){
            state.push(action.payload)
        },
        remove(state,action){
            return state.filter((item)=>item.id !== action.payload)
        },
        removeLastItemById: (state, action) => {
            const idToRemove = action.payload;
            const lastIndex = state.slice().reverse().findIndex(item => item.id === idToRemove);
            if (lastIndex !== -1) {
              const indexToRemove = state.length - 1 - lastIndex;
              state.splice(indexToRemove, 1);
            }
        },
    }
})

export const {add,remove,removeLastItemById} = cartSlice.actions
export default cartSlice.reducer