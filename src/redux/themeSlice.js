import { createSlice } from '@reduxjs/toolkit';
import { hover } from '@testing-library/user-event/dist/hover';

const initialState = {
  default: {
    backgroundColor: "#f5f5f5",
    sidebar: "#ffffff",
    sidebarText: "#000",
    hoverBackground: "#f5f5f5",
    hoverBackgroundMain:"#f5f5f5",
  },
  projectManagement: {
    backgroundColor: "rgb(0, 121, 191)",
    sidebar: "#0066a0",
    sidebarText: "#ffffff",
    hoverBackground: "#004080",
    hoverBackgroundMain:" #004080"
    
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
