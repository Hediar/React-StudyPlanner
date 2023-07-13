import { createSlice } from "@reduxjs/toolkit";

const initialState = { id: "", isLogin: false };

const currentuserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      return { id: action.payload, isLogin: true };
    },
    logoutUser: (state, action) => {
      return { id: "", isLogin: false };
    },
  },
});

export const { loginUser, logoutUser } = currentuserSlice.actions;
export default currentuserSlice.reducer;
