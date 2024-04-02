import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../config/axiosInstance'

export const getMembers = createAsyncThunk('members/getMembers', async () => {
  const response = await axiosInstance.get('/alumnos')
  return response.data.alumnos
})

const initialState = {
  members: [],
  isLoading: false,
  isError: false
}

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    localMembers: (state, action) => {
      state.isLoading = false
      state.members = action.payload
      state.isError = null
    },
    logout: (state) => (state = initialState),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMembers.pending, (state) => {
        state.isLoading = true
        state.members = []
        state.isError = null
      })
      .addCase(getMembers.fulfilled, (state, action) => {
        state.isLoading = false
        state.members = action.payload
        state.isError = null
      })
      .addCase(getMembers.rejected, (state, action) => {
        state.isLoading = false
        state.members = []
        state.isError = action.error.message
      })
  }
})

export const { localUsers, logout } = membersSlice.actions
export default membersSlice.reducer