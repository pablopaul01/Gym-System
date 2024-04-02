import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../config/axiosInstance'

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const response = await axiosInstance.get('/usuarios')
  return response.data.users
})

const initialState = {
  users: [],
  isLoading: false,
  isError: false
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    localUsers: (state, action) => {
      state.isLoading = false
      state.users = action.payload
      state.isError = null
    },
    logout: (state) => (state = initialState),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true
        state.users = []
        state.isError = null
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload
        state.isError = null
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false
        state.users = []
        state.isError = action.error.message
      })
  }
})

export const { localUsers, logout } = usersSlice.actions
export default usersSlice.reducer