import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    filtersLoadingStatus: 'idle',
    filters: [],
    activeFilter: 'all'
}

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/filters");
    }
);

const heroesFiltersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        changeFilterActive: (state, action) => {
            state.activeFilter = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => {
                state.filtersLoadingStatus = 'loading';
            })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filters = action.payload;
                state.filtersLoadingStatus = 'idle';
            })
            .addCase(fetchFilters.rejected, state => { 
                state.filtersLoadingStatus = 'error';
            })
            .addDefaultCase(
                () => {}
            )
    }
});

const {actions, reducer} = heroesFiltersSlice;
export default reducer;
export const {
    filtersFetching,
    filtersFetchingError,
    filtersFetched,
    changeFilterActive
} = actions;