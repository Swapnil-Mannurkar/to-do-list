import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
  isLogin: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialValues,
  reducers: {
    toggleLogin(state) {
      state.isLogin = !state.isLogin;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
