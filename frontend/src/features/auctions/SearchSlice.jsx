import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
  recentSearches: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearSearch: (state) => {
      state.searchTerm = '';
    },
    addRecentSearch: (state, action) => {
      // Don't add duplicates
      if (!state.recentSearches.includes(action.payload)) {
        // Add to beginning, limit to 5 recent searches
        state.recentSearches = [
          action.payload,
          ...state.recentSearches.slice(0, 4),
        ];
      }
    },
    clearRecentSearches: (state) => {
      state.recentSearches = [];
    },
  },
});

export const {
  setSearchTerm,
  clearSearch,
  addRecentSearch,
  clearRecentSearches,
} = searchSlice.actions;

export default searchSlice.reducer;
