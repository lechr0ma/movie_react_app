import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    isLoading: false,
    isError: false,
    error: '',
}
const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        getError: (state, action) => {
            state.isLoading = false
            state.isError = true
            state.error = action.payload
        },
        closeError: (state) => {
            state.isError = false
            state.error = ''
        },
        getLoading: (state) => {
            state.isLoading = true
            state.isError = false
            state.error = ''
        },
        loadingOK: (state, action) => {
            state.isLoading = false
            state.isError = false
            state.error = action.payload
        }
    }
})
export const {getError, getLoading, loadingOK, closeError} = mainSlice.actions
export default mainSlice