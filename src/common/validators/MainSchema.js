import * as yup from 'yup';

export const MainSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    date: yup.string().required(),
})
