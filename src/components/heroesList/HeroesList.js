import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { createSelector } from 'reselect';

import { fetchHeroes, heroDeleted } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import './heroesList.scss';


const HeroesList = () => {

    const filteredHeroesSelector = createSelector(
        state => state.filtersReducer.activeFilter,
        state => state.heroesReducer.heroes,
        (actFilter, allHeroes) => {
            if (actFilter === 'all'){
                return allHeroes;
            } else {
                return allHeroes.filter(item => item.element === actFilter);
            }
        }
    );

    const filteredHeroes = useSelector(filteredHeroesSelector);
    const heroesLoadingStatus = useSelector(state => state.heroesReducer.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes(request));

        // eslint-disable-next-line
    }, []);

    const onDelete = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(() => dispatch(heroDeleted(id)))
            .catch(err => console.log(err));   
    }, [request]);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return (
                // <CSSTransition
                //     key={id}
                //     timeout={500}
                //     classNames="hero">
                    <HeroesListItem 
                        key={id}
                        {...props}
                        onDelete={() => onDelete(id)}
                        />
                // </CSSTransition>
            ) 
            
            
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {/* <TransitionGroup> */}
                {elements}
            {/* </TransitionGroup> */}
        </ul>
    )
}

export default HeroesList;