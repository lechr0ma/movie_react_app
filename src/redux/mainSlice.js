import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    isLoading: true,
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
export const {fetchItems, fetchItemsOK, fetchItemsBad, getMoreItems, changeQuery} = mainSlice.actions
export default mainSlice