import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../config/axiosInstance'

export const getPagosMensualMedio = createAsyncThunk('pagos/getPagosMensualMedio', async (mes) => {
  const response = await axiosInstance.get(`/reporte/pagosMensualPorMedio/${mes}`)
  return response.data.pagosPorMedio
})

const initialState = {
  pagosMensualMedios: [],
  isLoading: false,
  isError: false
}

const monthyPaymentsMethodSlice = createSlice({
  name: 'pagos',
  initialState,
  reducers: {
    localMonthlyPaymentsMethod: (state, action) => {
      state.isLoading = false
      state.pagosMensualMedios = action.payload
      state.isError = null
    },
    logout: (state) => (state = initialState),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPagosMensualMedio.pending, (state) => {
        state.isLoading = true
        state.pagosMensualMedios = []
        state.isError = null
      })
      .addCase(getPagosMensualMedio.fulfilled, (state, action) => {
        state.isLoading = false
        state.pagosMensualMedios = action.payload
        state.isError = null
      })
      .addCase(getPagosMensualMedio.rejected, (state, action) => {
        state.isLoading = false
        state.pagosMensualMedios = []
        state.isError = action.error.message
      })
  }
})

export const { localMonthlyPaymentsMethod, logout } = monthyPaymentsMethodSlice.actions
export default monthyPaymentsMethodSlice.reducer