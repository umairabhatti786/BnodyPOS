import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  userData: {},
  otherUserData: {},
  deepLinkPostId: "",
};
const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setOtherUserData: (state, action) => {
      state.otherUserData = action.payload;
    },
    setDeepLinkPostId: (state, action) => {
      state.deepLinkPostId = action.payload;
    },
  },
});

export const { setUserData, setOtherUserData, setDeepLinkPostId } =
  authSlice.actions;
export default authSlice.reducer;
