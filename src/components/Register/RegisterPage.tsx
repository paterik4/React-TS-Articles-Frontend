import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import exportAuthService from '../../services/auth.service'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Tooltip } from '@material-ui/core'

interface RegisterPageProps {}

type UserSubmitForm = {
    username: string
    email: string
    password: string
    confirmPassword: string
    acceptTerms: boolean
}

export const RegisterPage: React.FC<RegisterPageProps> = (props: any) => {
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required')
            .min(5, 'Username must be at least 5 characters')
            .max(20, 'Username must not exceed 20 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(20, 'Password must not exceed 20 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf(
                [Yup.ref('password'), null],
                'Confirm Password does not match'
            ),
        acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
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
                    props.history.push('/')
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
        <div className="align-middle sm:mx-auto sm:w-full sm:max-w-md py-16">
            <div className="register-form bg-white-light py-8 px-6 shadow-lg rounded-lg">
            {!currentUser? (
                <>
                <h1 className="text-4xl pt-2 pb-10 text-red">
                    Please Register!
                </h1>
                <form
                    className="rounded align-middle space-y-4 bg-white-light"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="form-group">
                        <label className="inputLabel">Username</label>
                        <input
                            type="text"
                            {...register('username')}
                            className={`form-control ${
                                errors.username ? 'is-invalid' : ''
                            }`}
                        />
                        <div className="invalid-feedback">
                            {errors.username?.message}
                        </div>
                    </div>

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
                    <div className="form-group">
                        <label className="inputLabel">Confirm Password</label>
                        <input
                            type="password"
                            {...register('confirmPassword')}
                            className={`form-control ${
                                errors.confirmPassword ? 'is-invalid' : ''
                            }`}
                        />
                        <div className="invalid-feedback">
                            {errors.confirmPassword?.message}
                        </div>
                    </div>

                    <div className="form-check">
                        <div className="checkBoxText">
                            <input
                                type="checkbox"
                                {...register('acceptTerms')}
                                className={`form-check-input ${
                                    errors.acceptTerms ? 'is-invalid' : ''
                                }`}
                            />
                            <label
                                htmlFor="acceptTerms"
                                className="form-check-label"
                            >
                                I have read and agree to the Terms
                            </label>
                        </div>
                        <div className="invalid-feedback">
                            {errors.acceptTerms?.message}
                        </div>
                    </div>

                    <div className="form-buttons">
                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                        <Tooltip title="Resets the form">
                            <button
                                type="button"
                                onClick={() => reset()}
                                className="btn btn-warning"
                            >
                                Reset
                            </button>
                        </Tooltip>
                    </div>
                </form>
            </>
            ) : (<h1>You already have account!</h1>)}
            </div>
        </div>
    )
}
