import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  default: {
    backgroundColor: "#f5f5f5",
    sidebar: "#ffffff",
    sidebarText: "#000"
  },
  projectManagement: {
    backgroundColor: "rgb(0, 121, 191)",
    sidebar: "#0066a0",
    sidebarText: "#ffffff"
    //backgroundColor: "#f5f5f5"
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
