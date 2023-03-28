const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
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
                heroesLoadingStatus: 'idle'
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
                heroes: newListHeroes
            }
        case 'HERO_CREATED':
            const newArrListHeroes = [...state.heroes, action.payload];
            return {
                ...state,
                heroes: newArrListHeroes
            }
        default: return state
    }
}

export default reducer;