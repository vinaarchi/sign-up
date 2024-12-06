import {createSlice} from "@reduxjs/toolkit"
import { callAPI } from "@/config/axios";

const postSlice = createSlice ({
    name:"posts",
    initialState:[{}],
    reducers:{
        setPosts:(initialState, action) =>{
            return [...action.payload]
        }
    }
})

//Export action
export const {setPosts} = postSlice.actions;

//untuk nginput ke global store

//Export reducer
export default postSlice.reducer
//untuk menampung data ke global store



// Call API function
export const getPostsList = () =>{
    return async (dispatch:any) => {
        try{
            const res = await callAPI.get("./posts")
            dispatch(setPosts(res.data))
        }catch(error){
            console.log(error)
        }
    }
}