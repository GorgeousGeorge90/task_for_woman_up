import * as yup from 'yup';

/**
 * Схема валидации для форм в
 * Main компоненте.
 *
 */

export const MainSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    date: yup.string().required(),
})
