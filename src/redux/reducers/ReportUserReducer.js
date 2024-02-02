import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reportUser: {
    category: "",
    reportedUserId: "",
  },
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setReportCategory: (state, action) => {
      state.reportUser.category = action.payload;
    },

    setReportUserId: (state, action) => {
      state.reportUser.reportedUserId = action.payload;
    },
  },

  setEmptyReportedUser: (state, action) => {
    state.reportUser = initialState.reportUser;
  },
});

export const { setReportCategory, setEmptyReportedUser, setReportUserId } =
  reportSlice.actions;

export default reportSlice.reducer;
