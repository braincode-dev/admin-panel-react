const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filtersLoadingStatus: 'idle',
    filters: [],
    activeFilter: 'all',
    filteredHeroes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle',
                filteredHeroes: state.activeFilter === 'all' ?
                                    action.payload :
                                    action.payload.filter(item => item.element === state.activeFilter)
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETED':
            const newListHeroes = state.heroes.filter(items => items.id !== action.payload);
            return {
                ...state,
                heroes: newListHeroes,
                filteredHeroes: state.activeFilter === 'all' ? 
                                    newListHeroes : 
                                    newListHeroes.filter(item => item.element === state.activeFilter)
            }
        case 'HERO_CREATED':
            const newArrListHeroes = [...state.heroes, action.payload];
            return {
                ...state,
                heroes: newArrListHeroes,
                filteredHeroes: state.activeFilter === 'all' ? 
                                    newArrListHeroes : 
                                    newArrListHeroes.filter(item => item.element === state.activeFilter)
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'CHANGE_FILTER_ACTIVE':
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes: state.activeFilter === 'all' ? 
                                    state.heroes : 
                                    state.heroes.filter(item => item.element === state.activeFilter)
            }     
        default: return state
    }
}

export default reducer;