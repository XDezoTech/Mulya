import { createSlice } from '@reduxjs/toolkit';

const sellItemSlice = createSlice({
  name: 'sellItem',
  initialState: {
    item_title: '',
    item_description: '',
    category: '',
    starting_price: 0,
    reserve_price: 0,
    buy_now_price: 0,
    bid_increment_limit: 0,
    start_time: null,
    end_time: null,
    photos: [],
  },
  reducers: {
    setItemTitle(state, action) {
      state.item_title = action.payload;
    },
    setItemDescription(state, action) {
      state.item_description = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setStartingPrice(state, action) {
      state.starting_price = action.payload;
    },
    setReservePrice(state, action) {
      state.reserve_price = action.payload;
    },
    setBuyNowPrice(state, action) {
      state.buy_now_price = action.payload;
    },
    setBidIncrementLimit(state, action) {
      state.bid_increment_limit = action.payload;
    },
    setStartTime(state, action) {
      state.start_time = action.payload;
    },
    setEndTime(state, action) {
      state.end_time = action.payload;
    },
    addPhoto(state, action) {
      state.photos.push(action.payload);
    },
    removePhoto(state, action) {
      const idx = action.payload;
      // remove exactly the photo at that index
      state.photos.splice(idx, 1);
    },
  },
});

export const {
  setItemTitle,
  setItemDescription,
  setCategory,
  setStartingPrice,
  setReservePrice,
  setBuyNowPrice,
  setBidIncrementLimit,
  setStartTime,
  setEndTime,
  addPhoto,
  removePhoto,
} = sellItemSlice.actions;

export default sellItemSlice.reducer;
