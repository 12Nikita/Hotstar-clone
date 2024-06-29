import { configureStore}from '@reduxjs/toolkit';
import userReducer from "../feature/user/userSlice";
import movieReducer from '../feature/movie/movieSlice';
const store= configureStore({
    reducer:{
        user:userReducer,
        movie:movieReducer,
    },
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware({
     serializableCheck:false,
    }),
});
export default store;