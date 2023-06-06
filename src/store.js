import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/auth.reducer";

const store = configureStore({
  reducer: {
    User: userReducer,
  },
});

export default store;
