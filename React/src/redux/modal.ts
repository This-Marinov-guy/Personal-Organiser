import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    value: false,
  },
  reducers: {
    showModal: (state) => {
      state.value = true;
    },
    removeModal: (state) => {
      state.value = false;
    },
  },
});

export const selectModal = (state) => state.modal.value;
export const { removeModal, showModal } = modalSlice.actions;
export default modalSlice.reducer;
