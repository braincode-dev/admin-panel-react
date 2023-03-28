import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtersFetching, filtersFetched, changeFilterActive } from '../../actions/index';
import Spiner from '../spinner/Spinner';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const { filters, activeFilter, filtersLoadingStatus } = useSelector(state => state);
    const { request } = useHttp();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(err => console.log(err))
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

    console.log(filtersLoadingStatus);
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