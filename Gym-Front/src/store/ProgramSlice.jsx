import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../config/axiosInstance'

export const getPrograms = createAsyncThunk('programs/getPrograms', async () => {
  const response = await axiosInstance.get('/programas')
  return response.data.programas
})

const initialState = {
  programs: [],
  isLoading: false,
  isError: false
}

const programsSlice = createSlice({
  name: 'programs',
  initialState,
  reducers: {
    localPrograms: (state, action) => {
      state.isLoading = false
      state.programs = action.payload
      state.isError = null
    },
    logout: (state) => (state = initialState),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPrograms.pending, (state) => {
        state.isLoading = true
        state.programs = []
        state.isError = null
      })
      .addCase(getPrograms.fulfilled, (state, action) => {
        state.isLoading = false
        state.programs = action.payload
        state.isError = null
      })
      .addCase(getPrograms.rejected, (state, action) => {
        state.isLoading = false
        state.programs = []
        state.isError = action.error.message
      })
  }
})

export const { localPrograms, logout } = programsSlice.actions
export default programsSlice.reducer