import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {MainSchema} from '../../../common/validators/MainSchema';


const Form = ({addTask})=> {
    const {handleSubmit,register, reset, formState:{errors}} = useForm({
        resolver: yupResolver(MainSchema)
    })
    const onSubmit = data =>{
        const {title, description, date} = data
        addTask(title, description, date)
        reset()
    }
    const errorStyle = {
        color: 'red',
        fontWeight: 'bolder',
        fontSize: 'smaller',
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p><input {...register('title')} placeholder={'Title'}/></p>
            <p style={errorStyle}>{errors.title ? errors.title.message: null}</p>
            <p><input {...register('description')} placeholder={'Description'}/></p>
            <p style={errorStyle}>{errors.description ? errors.description.message: null}</p>
            <p><input {...register('date')} type={"date"}/></p>
            <p style={errorStyle}>{errors.date ? errors.date.message: null}</p>
            <p><button type={'submit'}>Create</button></p>
        </form>
    )
}

export default Form