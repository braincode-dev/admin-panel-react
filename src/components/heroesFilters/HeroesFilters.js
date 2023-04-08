import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilterActive, fetchFilters } from './heroesFiltersSlice';

import Spiner from '../spinner/Spinner';

const HeroesFilters = () => {

    const { filters, activeFilter, filtersLoadingStatus } = useSelector(state => state.filtersReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters());
    }, [])

    const onChangeActiveFilter = (value) => {
        dispatch(changeFilterActive(value));
    }

    const renderButtons = (arr) => {
        return arr.map(({name, label, className}) => {
            let clazz = `btn ${className} `;
            if (name === activeFilter){
                clazz += 'active';
            }

            return (
                <button 
                    key={name} 
                    className={clazz}
                    onClick={() => onChangeActiveFilter(name)}
                    >{label}</button>
            )
        });
    }

    if(filtersLoadingStatus === 'loading'){
        return <Spiner/>;
    }

    const items = renderButtons(filters);
    
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {items}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;