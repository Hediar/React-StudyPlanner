import { createSlice } from "@reduxjs/toolkit";

const initialState = { id: "" };

const currentuserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUser } = currentuserSlice.actions;
export default currentuserSlice.reducer;
