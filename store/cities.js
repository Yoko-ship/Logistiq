import { createSlice } from "@reduxjs/toolkit";

export const cityHanlder = createSlice({
    name:"city",
    initialState:{
        road:[],
        money:0
    },
    reducers:{
        addRoad(state,action){
            state.road.push(action.payload)
        },
        addMoney(state,action){
            state.money += action.payload
        }
    }
}) 
export const { addRoad,addMoney} = cityHanlder.actions
export default cityHanlder.reducer