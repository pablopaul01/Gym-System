import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../config/axiosInstance'

export const getPagosMensual = createAsyncThunk('pagos/getPagosMensual', async (mes) => {
  const response = await axiosInstance.get(`/reporte/pagosMensual/${mes}`)
  return response.data.total
})

const initialState = {
  pagosMensual: 0,
  isLoading: false,
  isError: false
}

const monthyPaymentsSlice = createSlice({
  name: 'pagos',
  initialState,
  reducers: {
    localMonthlyPayments: (state, action) => {
      state.isLoading = false
      state.pagosMensual = action.payload
      state.isError = null
    },
    logout: (state) => (state = initialState),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPagosMensual.pending, (state) => {
        state.isLoading = true
        state.pagosMensual = 0
        state.isError = null
      })
      .addCase(getPagosMensual.fulfilled, (state, action) => {
        state.isLoading = false
        state.pagosMensual = action.payload
        state.isError = null
      })
      .addCase(getPagosMensual.rejected, (state, action) => {
        state.isLoading = false
        state.pagosMensual = 0
        state.isError = action.error.message
      })
  }
})

export const { localMonthlyPayments, logout } = monthyPaymentsSlice.actions
export default monthyPaymentsSlice.reducer