export const crudReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH':
            return {
                isLoading: false,
                data: action.payload,
            }
        case 'EDIT': {
            return {
                ...state, data: state.data.map(e => e.id === action.payload.id ? action.payload : e)
            }
        }
        case 'DELETE': {
            return {
                ...state, data: state.data.filter(e => e.id !== action.payload.id)
            }
        }
        case 'ADD': {
            return {
                ...state, data: [action.payload, ...state.data]
            }
        }
        default: {
            return state
        }
    }
}