import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: "",
  show: false,
  handleYes: undefined,
  title: "Success"
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setSuccessModal: (state, action) => {
      state.message = action.payload.message;
      state.show = true;
      state.handleYes = action.payload.handleYes;
      state.title = action.payload.title || "Success";
    },
    setErrorModal: (state, action) => {
      state.message = action.payload.message;
      state.show = true;
      state.handleYes = action.payload.handleYes;
      state.title = action.payload.title || "Error";
    },
    closeModal: (state, action) => {
      state.show = false;
    },
  },
});

export const { setSuccessModal, setErrorModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
