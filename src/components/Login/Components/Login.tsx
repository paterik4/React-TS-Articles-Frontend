import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import exportAuthService from '../../../services/auth.service'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

interface LoginProps {
    submitFN: (data: any) => void;
}

type UserSubmitForm = {
    email: string
    password: string
}

export const Login: React.FC<LoginProps> = ({submitFN}) => {

    const history = useHistory();
    
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(20, 'Password must not exceed 20 characters')
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<UserSubmitForm>({
        resolver: yupResolver(validationSchema)
    })

    const onSubmit = (data: UserSubmitForm) => {
        submitFN(data)
    }

    const currentUser = exportAuthService.getCurrentUser()

    return (
        <div className="align-middle sm:mx-auto sm:w-full sm:max-w-md py-16">
            <div className="register-form bg-white-light py-8 px-6 shadow-lg rounded-lg">
                {!currentUser? (
                <>
                    <h1 className="text-4xl pt-2 pb-10 text-red">Please Login!</h1>
                    <form
                        className="rounded align-middle space-y-4 bg-white-light"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="form-group">
                            <label className="inputLabel">Email</label>
                            <input
                                type="text"
                                {...register('email')}
                                className={`form-control ${
                                    errors.email ? 'is-invalid' : ''
                                }`}
                            />
                            <div className="invalid-feedback">
                                {errors.email?.message}
                            </div>
                        </div>

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

                        <div className="form-buttons">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </form>
                </>
                ):(<h1>You already logged in!</h1>)}
            </div>
        </div>
    )
}
