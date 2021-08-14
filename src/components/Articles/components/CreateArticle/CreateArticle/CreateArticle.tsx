import { Grid } from '@material-ui/core';
import React from 'react'
import exportAuthService from '../../../../../services/auth.service';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useHistory } from 'react-router-dom';

interface CreateArticleProps {

}

type UserSubmitForm = {
    title: string
    description: string
    body: string,
    tagList: string[],
    favoriteCount: number,
}

export const CreateArticle: React.FC<CreateArticleProps> = () => {

    const history = useHistory();

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string()
            .required('Description is required')
            .min(6, 'Description must be at least 6 characters')
            .max(40, 'Description must not exceed 40 characters'),
        body: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Article body is required')
            .min(20, 'Article body must be at least 20 characters')
            .max(100, 'Article body must not exceed 100 characters'),
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<UserSubmitForm>({
        resolver: yupResolver(validationSchema)
    })

    const onSubmit = (data: UserSubmitForm) => {
        exportAuthService
            .register(data.username, data.email, data.password)
            .then((response) => {
                if (response.status === 201) {
                    history.push('/articles')
                }
            })
            .then((response) => {
                toast.success('Registration successful')
            })
            .catch((err) => {
                toast.error('Something went wrong')
            })
    }

    const currentUser = exportAuthService.getCurrentUser()

        return (
        <div className="py-10">
            <h1 className="text-2xl text-black">Create new Article</h1>
            <p className="text-black-light">Fill all the required(*) fields!</p>
            <div className="">
                <Grid container>
                    <Grid item sm={6}>    
                    <div className="form-group">
                            <label className="inputLabel">Password</label>
                            <input
                                type="password"
                                {...register('password')}
                                className={`form-control ${
                                    errors.password ? 'is-invalid' : ''
                                }`}
                            />
                            <div className="invalid-feedback">
                                {errors.password?.message}
                            </div>
                        </div>
                    </Grid>
                    <Grid item sm={6}></Grid>
                    <Grid item sm={6}></Grid>
                    <Grid item sm={6}></Grid>
                </Grid>
            </div>
        </div>
        );
}