import {createReducer} from "@reduxjs/toolkit"
import {heroesFetched,
        heroesFetchingError,
        heroDeleted,
        heroCreated,
        heroesFetching
    } from '../actions';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroesReducer = createReducer(initialState, {
        [heroesFetching]: state => {
            state.heroesLoadingStatus = 'loading';
        },
        [heroesFetched]: (state, action) => {
            state.heroes = action.payload;
                state.heroesLoadingStatus = 'idle';
        },
        [heroesFetchingError]: state => {
            state.heroesLoadingStatus = 'error';
        },
        [heroCreated]: (state, action) => {
            state.heroes.push(action.payload);
        },
        [heroDeleted]: (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        }
    },
    [],
    state => state
)

// const heroesReducer2 = createReducer(initialState, builder => {
//     builder
//         .addCase(heroesFetching, state => {
//             state.heroesLoadingStatus = 'loading';
//         })
//         .addCase(heroesFetched, (state, action) => {
//             state.heroes = action.payload;
//             state.heroesLoadingStatus = 'idle';
//         })
//         .addCase(heroesFetchingError, state => {
//             state.heroesLoadingStatus = 'error';
//         })
//         .addCase(heroCreated, (state, action) => {
//             state.heroes.push(action.payload); 
//         })
//         .addCase(heroDeleted, (state, action) => {
//             state.heroes = state.heroes.filter(item => item.id !== action.payload);
//         })
//         .addDefaultCase(() => {}) 
// })

// const heroesReducer = (state = initialState, action) => {
//     switch (action.type) {
        // case 'HEROES_FETCHING':
        //     return {
        //         ...state,
        //         heroesLoadingStatus: 'loading'
        //     }
        // case 'HEROES_FETCHED':
        //     return {
        //         ...state,
        //         heroes: action.payload,
        //         heroesLoadingStatus: 'idle'
        //     }
        // case 'HEROES_FETCHING_ERROR':
        //     return {
        //         ...state,
        //         heroesLoadingStatus: 'error'
        //     }
        // case 'HERO_DELETED':
        //     const newListHeroes = state.heroes.filter(items => items.id !== action.payload);
        //     return {
        //         ...state,
        //         heroes: newListHeroes
        //     }
        // case 'HERO_CREATED':
        //     const newArrListHeroes = [...state.heroes, action.payload];
        //     return {
        //         ...state,
        //         heroes: newArrListHeroes
        //     }
    //     default: return state
    // }
// }

export default heroesReducer;