import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/authentication/AuthSlice';
import sellItemSlice from './features/sellItem/sellItemSlice';
import searchReducer from './features/auctions/SearchSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    sellItem: sellItemSlice,
    search: searchReducer,
  },
});
export default store;
