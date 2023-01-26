import { createSlice } from "@reduxjs/toolkit";

const bodyStyle = document.body.style;

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    value: false,
  },
  reducers: {
    showModal: (state) => {
      state.value = true;
      bodyStyle.overflowY = "hidden"
    },
    removeModal: (state) => {
      state.value = false;
      bodyStyle.overflowY = "auto"
    },
  },
});

export const selectModal = (state) => state.modal.value;
export const { removeModal, showModal } = modalSlice.actions;
export default modalSlice.reducer;
