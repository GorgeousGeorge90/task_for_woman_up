import {useForm} from 'react-hook-form'

const Main = () => {
    const {handleSubmit,register, reset, formState:{errors}} = useForm()
    const onSubmit = data =>{
        console.log(data)
        reset()
    }
    return (
        <div>
            <div>

            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('title')} placeholder={'Title'}/>
                    <input {...register('description')} placeholder={'Description'}/>
                    <input {...register('date')} placeholder={'Final date'}/>
                    <button type={'submit'}>Create</button>
                </form>
            </div>
        </div>
    )
}

export default Main