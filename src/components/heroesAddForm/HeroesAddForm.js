import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useHttp } from '../../hooks/http.hook';

import { heroCreated } from "../../actions";
import './HeroesAddForm.scss';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const {request} = useHttp();
    const dispatch = useDispatch();

    const onSubmit = (value) => {
        const newHero = {
            id: +uuidv4(),
            name: value.name,
            description: value.text,
            element: value.element
        };

        request(`http://localhost:3001/heroes`, 'POST', JSON.stringify(newHero))
            .then(console.log('Created!'))
            .then(dispatch(heroCreated(newHero)))
            .catch(err => console.log(err));
    }

    return (
        <Formik
            initialValues={{name: '', text: '', element: ''}}
            validationSchema={Yup.object({
                name: Yup.string().required('This Field is Required').min(3, 'Short!'),
                text: Yup.string().required('This Field is Required').min(5, 'Short!'),
                element: Yup.string().required('This Field is Required')
            })}
            onSubmit={(values) => { 
                onSubmit(values);
            }}
        >
        {({isSubmitting}) => (
            <Form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field 
                        type="text" 
                        name="name" 
                        className="form-control" 
                        id="name" 
                        placeholder="Как меня зовут?"/>
                        <ErrorMessage name="name" className='error' component="div"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="text" className="form-label fs-4">Описание</label>
                    <Field
                        as="textarea"
                        name="text" 
                        className="form-control" 
                        id="text" 
                        placeholder="Что я умею?"
                        style={{"height": '130px'}}/>
                    <ErrorMessage name="text" className='error' component="div"/>    
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field
                        as="select" 
                        className="form-select" 
                        id="element" 
                        name="element">
                        <option >Я владею элементом...</option>
                        <option value="fire">Огонь</option>
                        <option value="water">Вода</option>
                        <option value="wind">Ветер</option>
                        <option value="earth">Земля</option>
                    </Field>
                    <ErrorMessage name="element" className='error'  component="div"/>
                </div>

                <button disabled={isSubmitting} type="submit" className="btn btn-primary">Создать</button>
            </Form>
        )}
        </Formik>
    )
}

export default HeroesAddForm;