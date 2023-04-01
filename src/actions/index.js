 import { createAction } from "@reduxjs/toolkit";
 
 export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
}

export const heroesFetching = createAction('HEROES_FETCHING');
export const heroesFetched = createAction('HEROES_FETCHED');
export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');
export const heroDeleted = createAction('HERO_DELETED');
export const heroCreated = createAction('HERO_CREATED');

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(dispatch(filtersFetchingError()))
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const filtersFetched = (data) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: data
    }
}

export const changeFilterActive = (name) => {
    return {
        type: 'CHANGE_FILTER_ACTIVE',
        payload: name
    }
}