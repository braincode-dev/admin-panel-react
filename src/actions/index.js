export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroDeleted = (id) => {
    return {
        type: 'HERO_DELETED',
        payload: id
    }
}

export const heroCreated = (data) => {
    return {
        type: 'HERO_CREATED',
        payload: data
    }
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
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