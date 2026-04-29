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
            }
        }
    }
)
export const {addTodo,removeTodo}=todoSlice.actions;
export default todoSlice.reducer;