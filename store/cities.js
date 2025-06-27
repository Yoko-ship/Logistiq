import { createSlice } from "@reduxjs/toolkit";

export const cityHanlder = createSlice({
    name:"city",
    initialState:{
        road:[],
        money:0,
        transport:[]
    },
    reducers:{
        addRoad(state,action){
            state.road.push(action.payload)
        },
        addMoney(state,action){
            state.money += action.payload
        },
        addTransport(state,action){
            state.transport = action.payload
        }
    }
}) 
export const { addRoad,addMoney, addTransport} = cityHanlder.actions
export default cityHanlder.reducer