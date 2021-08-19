import React, { useEffect, useRef } from 'react'
import exportAuthService from '../../../../../services/auth.service'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'

interface EditProfileProps {
    users: any
}

export const EditProfile: React.FC<EditProfileProps> = ({users}) => {


    const history = useHistory()
    const { username } = useParams<{ username?: string }>()
    const user = users.find((u: any) => u.username === username)
    const formikRef = useRef(user)

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required')
            .min(5, 'Username must be at least 5 characters')
            .max(20, 'Username must not exceed 20 characters')
            .test((username: any) => {
                const userFound = users.find((u: any) => u.username === username)
                if((userFound && user && (userFound.username !== null && userFound.username !== user.username))){
                    return new Yup.ValidationError('Username already exists', undefined, 'username')
                }
                else
                {
                    return true
                }
            }),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        bio: Yup.string()
            .min(40, 'Bio must be at least 40 characters')
            .max(150, 'Bio must not exceed 150 characters'),
        image: Yup.string()
    })

    const onSubmit = (data: any) => {
        exportAuthService
            .editProfile(
                data.username,
                data.email,
                data.bio,
                data.image
            )
            .then((response) => {
                toast.success(username+"'s profile updated successfully")
                setTimeout(() => history.push('/profile/'+data.username), 1000)
            })
            .catch((err) => {
                toast.error('Something went wrong')
            })
    }

    const CustomInputComponent = (props: any) => (
        <textarea
            className="resize-y max-h-52 min-h-32 my-custom-input"
            {...props}
        />
    )

    useEffect(() => {
        if(formikRef.current)
        {
            formikRef.current.setFieldValue("username", user.username);
            formikRef.current.setFieldValue("email", user.email)
            formikRef.current.setFieldValue("bio", user.bio)
            formikRef.current.setFieldValue("image", user.image)
        }
    })

        return (
            <div className="pt-20">
            <h1 className="text-2xl text-black">Update Profile</h1>
            <p className="text-black-light">Fill all the required(*) fields!</p>
            {user ? (
            <Formik
                initialValues={{
                    username: user.username,
                    email: user.email,
                    bio: user.bio,
                    image: user.image,
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                innerRef={formikRef}
            >
                { props => (
                    <Form>
                        <div className="grid grid-rows-5 grid-flow-col gap-4 auto-rows-max pt-10 px-40">
                            <div className="form-group">
                                <label className="inputLabel">Username*</label>
                                <Field name="username" />
                                {props.errors.username && props.touched.username ? (
                                    <div className="invalid-feedback">
                                        {props.errors.username}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label className="inputLabel">
                                    Email*
                                </label>
                                <Field name="email" />
                                {props.errors.email && props.touched.email ? (
                                    <div className="invalid-feedback">
                                        {props.errors.email}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label className="inputLabel">
                                    Image
                                </label>
                                <Field name="image" />
                                {props.errors.image && props.touched.image ? (
                                    <div className="invalid-feedback">
                                        {props.errors.image}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group row-span-3">
                                <label className="inputLabel">
                                    Bio
                                </label>
                                <Field name="bio" as={CustomInputComponent} />
                                {props.errors.bio && props.touched.bio ? (
                                    <div className="invalid-feedback">
                                        {props.errors.bio}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-10">
                            <button
                                type="submit"
                                className="border-2 border-red rounded-md px-6 py-2 w-auto text-red font-bold hover:bg-red hover:text-white"
                            >
                                Update Profile
                            </button>
                            <Link to={'/profile/'+username}>
                                <button
                                    className="border-2 border-red rounded-md px-6 py-2 w-auto text-red font-bold hover:bg-red hover:text-white"
                                >
                                    Cancel
                                </button>
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
            ) : (<p>Loading...</p>)}
        </div>
        );
}