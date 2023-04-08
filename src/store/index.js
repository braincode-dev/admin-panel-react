import { configureStore } from '@reduxjs/toolkit';
import heroesReducer from '../components/heroesList/heroesSlice';
import filtersReducer from '../components/heroesFilters/heroesFiltersSlice';

const srtingMiddleware = () => (next) => (action) => {
    if (typeof action === 'string'){
        return next({
            type: action
        })
    }
    return next(action);
}

const store = configureStore({
    reducer: {heroesReducer, filtersReducer},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(srtingMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;