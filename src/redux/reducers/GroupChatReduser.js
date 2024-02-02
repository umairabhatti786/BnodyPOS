import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groupMembers: [],
  activeTab: 0,
  messagesTabData: [],
  individualTabData: [],
  groupTabData: [],
};

const groupMemberSlice = createSlice({
  name: "groupChat",
  initialState,
  reducers: {
    setGroupMember: (state, action) => {
      state.groupMembers.push(action.payload);
    },
    removeGroupMember: (state, actions) => {
      state.groupMembers = state.groupMembers.filter(
        (item) => item.uid != actions.payload.uid
      );
    },

    emptyGroupMember: (state, actions) => {
      state.groupMembers = initialState.groupMembers;
    },
    setActiveTab: (state, actions) => {
      state.activeTab = actions.payload;
    },

    setMessagesTab: (state, actions) => {
      state.messagesTabData = actions.payload;
    },
    setIndividualTab: (state, actions) => {
      state.individualTabData = actions.payload;
    },
    setGroupsTab: (state, actions) => {
      state.groupTabData = actions.payload;
    },
  },
});

export const {
  setGroupMember,
  removeGroupMember,
  emptyGroupMember,
  setActiveTab,
  setMessagesTab,
  setIndividualTab,
  setGroupsTab,
} = groupMemberSlice.actions;

export default groupMemberSlice.reducer;
