import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { restURL } from '../../utils/configProvider';

const initialState = null;

export const loadUser = createAsyncThunk('user/loadUser', () => {
    return axios.get(restURL + '/api/user').then(result => result.data)
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => null,
  },
  extraReducers: (builder) => {
    builder.addCase(loadUser.pending, state => null)
    builder.addCase(loadUser.rejected, state => null)
    builder.addCase(loadUser.fulfilled, (state, action) => state = action.payload.data)
  }
})

// Action creators are generated for each case reducer function
export const { clearUser } = userSlice.actions

export default userSlice.reducer;