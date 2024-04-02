import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './UserSlice'
import MemberSlice from './MemberSlice'
import ProgramSlice from './ProgramSlice'
import PaymentsSlice from './PaymentsSlice'
import MonthlyPaymentsSlice from './MonthlyPaymentsSlice'
import MonthlyPaymentsMethodSlice from './MonthlyPaymentsMethodSlice'
import MembersStats from './MembersStats'

const store = configureStore({
  reducer: {
    users: UserSlice,
    members: MemberSlice,
    programs: ProgramSlice,
    payments: PaymentsSlice,
    monthlyPayments: MonthlyPaymentsSlice,
    monthlyPaymentsMethod: MonthlyPaymentsMethodSlice,
    alumnosStats: MembersStats
  },
})

// export const resetSlices = () => {
//   store.dispatch(accountLogout())
//   store.dispatch(roomLogout())
//   store.dispatch(themeLogout())
//   store.dispatch(participantLogout())
//   store.dispatch(idLogout())
//   store.dispatch(debtLogout())
//   store.dispatch(purchaseLogout())
// }

export default store