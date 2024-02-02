import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  advanceSearchUser: [],
};

const searchSlice = createSlice({
  name: "advanceSearch",
  initialState,
  reducers: {
    setAdvanceSearch: (state, action) => {
      // console.log('PayloadData', action.payload);
      state.advanceSearchUser = action.payload;
    },
  },
});

export const { setAdvanceSearch } = searchSlice.actions;

export default searchSlice.reducer;
