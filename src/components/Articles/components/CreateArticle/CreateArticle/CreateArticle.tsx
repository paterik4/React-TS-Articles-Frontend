import { Grid } from '@material-ui/core'
import React from 'react'
import exportAuthService from '../../../../../services/auth.service'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useHistory } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import exportApiFetchs from '../../../../../Api/API'
import { API_URL } from '../../../../../enviroment'

interface CreateArticleProps {}

export const CreateArticle: React.FC<CreateArticleProps> = () => {
    const history = useHistory()

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required')
            .min(10, 'Title must be at least 10 characters')
            .max(40, 'Description must not exceed 40 characters'),
        description: Yup.string()
            .required('Description is required')
            .min(20, 'Description must be at least 20 characters')
            .max(60, 'Description must not exceed 60 characters'),
        body: Yup.string()
            .required('Article body is required')
            .min(40, 'Article body must be at least 40 characters')
            .max(250, 'Article body must not exceed 250 characters'),
        tagList: Yup.array().min(1, 'Select atleast one tag')
    })

    const {
        data2: tags,
        error2,
        isPending2
    } = exportApiFetchs.FetchTagsData(API_URL + 'tags')

    const onSubmit = (data: any) => {
        const user = exportAuthService.getCurrentUser()
        const userId = user.user.id
        const tagList = data.tagList
        tagList.push('All')
        exportAuthService
            .createArticle(
                data.title,
                data.description,
                data.body,
                tagList
            )
            .then((response) => {
                if (response.status === 201) {
                    history.push('/articles')
                }
            })
            .then((response) => {
                toast.success('Article created successfully')
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

    const currentUser = exportAuthService.getCurrentUser()

    return (
        <div className="pt-20">
            <h1 className="text-2xl text-black">Create new Article</h1>
            <p className="text-black-light">Fill all the required(*) fields!</p>
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    body: '',
                    toggle: false,
                    tagList: []
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="grid grid-rows-5 grid-flow-col gap-4 auto-rows-max pt-10 px-40">
                            <div className="form-group">
                                <label className="inputLabel">Title*</label>
                                <Field name="title" />
                                {errors.title && touched.title ? (
                                    <div className="invalid-feedback">
                                        {errors.title}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label className="inputLabel">
                                    Description*
                                </label>
                                <Field name="description" />
                                {errors.description && touched.description ? (
                                    <div className="invalid-feedback">
                                        {errors.description}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-check">
                                <p className="text-left pb-2">Tags*</p>
                                <div
                                    role="group"
                                    aria-labelledby="checkbox-group"
                                    className="form-check2"
                                >
                                    {tags ? (
                                        tags.map(
                                            (item: any, i: number) =>
                                                item.tag !== 'All' && (
                                                    <div
                                                        key={i}
                                                        className="checkBoxText"
                                                    >
                                                        <Field
                                                            type="checkbox"
                                                            name="tagList"
                                                            value={item.tag}
                                                        />
                                                        <label htmlFor="checkbox">
                                                            {item.tag}
                                                        </label>
                                                    </div>
                                                )
                                        )
                                    ) : (
                                        <div>Loading...</div>
                                    )}
                                </div>
                                {errors.tagList && touched.tagList ? (
                                    <div className="invalid-feedback">
                                        {errors.tagList}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group row-span-3">
                                <label className="inputLabel">
                                    Article Body*
                                </label>
                                <Field name="body" as={CustomInputComponent} />
                                {errors.body && touched.body ? (
                                    <div className="invalid-feedback">
                                        {errors.body}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-center">
                            <button
                                type="submit"
                                className="border-2 border-red rounded-md px-6 py-2 w-auto text-red font-bold hover:bg-red hover:text-white"
                            >
                                Add Article
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
