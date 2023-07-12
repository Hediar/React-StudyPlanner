import { configureStore } from "@reduxjs/toolkit";
import currentuser from "../modules/currentuser";
const store = configureStore({
  reducer: {
    currentuser,
  },
});

export default store;
