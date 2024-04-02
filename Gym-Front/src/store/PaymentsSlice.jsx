import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../config/axiosInstance'

export const getPayments = createAsyncThunk('payments/getPayments', async () => {
  const response = await axiosInstance.get('/pagos')
  return response.data.pagos
})

const initialState = {
  payments: [],
  isLoading: false,
  isError: false
}

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    localPayments: (state, action) => {
      state.isLoading = false
      state.payments = action.payload
      state.isError = null
    },
    logout: (state) => (state = initialState),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPayments.pending, (state) => {
        state.isLoading = true
        state.payments = []
        state.isError = null
      })
      .addCase(getPayments.fulfilled, (state, action) => {
        state.isLoading = false
        state.payments = action.payload
        state.isError = null
      })
      .addCase(getPayments.rejected, (state, action) => {
        state.isLoading = false
        state.payments = []
        state.isError = action.error.message
      })
  }
})

export const { localPayments, logout } = paymentsSlice.actions
export default paymentsSlice.reducer