import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  default: {
    backgroundColor: "#f5f5f5"
  },
  projectManagement: {
    backgroundColor: "rgb(0, 121, 191)"
  }
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state = action.payload;
    }
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
