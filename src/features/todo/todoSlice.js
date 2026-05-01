import { createSlice } from "@reduxjs/toolkit";

const todoSlice=createSlice(
    {
        name:'todo ',
        initialState:{
            todos:[]
        },
        reducers:{
            addTodo(state,action){
                const {text}=action.payload
                let newTodo={
                    id:Date.now(),
                    text
                }
                state.todos.push(newTodo)
            },
            removeTodo(state,action){
                const {id}=action.payload
                state.todos=state.todos.filter(val=>val.id!=id)
            },
            updateTodo(state,action){
                const {id}=action.payload;
                let data=action.payload;
                state.todos=state.todos.map((val)=>{
                    if(val.id==id){
                        return data;
                    }
                    return val;
                })

            }
        }
    }
)
export const {addTodo,removeTodo,updateTodo}=todoSlice.actions;
export default todoSlice.reducer;