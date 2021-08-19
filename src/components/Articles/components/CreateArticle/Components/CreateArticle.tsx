import { Tooltip, Typography } from '@material-ui/core'
import React from 'react'
import exportAuthService from '../../../../../services/auth.service'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useHistory } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import exportApiFetchs from '../../../../../Api/API'
import { API_URL } from '../../../../../enviroment'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { withStyles } from '@material-ui/styles'

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
        tagList: Yup.array(),
        newTags: Yup.string()
    })

    const {
        data2: tags,
        error2,
        isPending2
    } = exportApiFetchs.FetchTagsData(API_URL + 'tags')

    const onSubmit = (data: any) => {
        const addNewTags = (newTags: string) => {
            const newTagsArr = newTags.split(',')
            newTagsArr.map((tag: any) => 
                exportAuthService.createTag(tag)
            )
        }
        addNewTags(data.newTags)
        const tagList = data.tagList
        tagList.push('All')
        data.newTags.length > 0 && tagList.push(data.newTags)
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

    const HtmlTooltip = withStyles((theme: any) => ({
        tooltip: {
            backgroundColor: '#363537',
            color: '#F7F7F7',
            maxWidth: 350,
            fontSize: '1rem',
            border: '1px solid #F7F7F7',
        },
    }))(Tooltip);

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
                    tagList: [],
                    newTags: '',
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
                                <p className="text-left pb-2">Tags (Optional)</p>
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
                                        <React.Fragment>
                                            {error2 && <div>{error2}</div>}
                                            {isPending2 && <div>Loading...</div>}
                                        </React.Fragment>
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="inputLabel">
                                    Add new tag (Optional)
                                    <HtmlTooltip 
                                    title={
                                        <React.Fragment>
                                            <Typography className="font-bold">
                                                You can add one tag by typing:
                                            </Typography>
                                            <Typography className="text=">
                                                e.g: TagName
                                            </Typography>
                                            <Typography className="font-bold">
                                                or you can add 2 or more tags by typing:
                                            </Typography>
                                            <Typography className="text=">
                                                e.g: TagName,TagName2,TagName3
                                            </Typography>
                                        </React.Fragment>
                                    }>
                                        <InfoOutlinedIcon />
                                    </HtmlTooltip>
                                </label>
                                <Field name="newTags" />
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
