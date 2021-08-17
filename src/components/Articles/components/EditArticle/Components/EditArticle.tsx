import { Tooltip, Typography } from '@material-ui/core'
import React, { RefObject, useCallback, useEffect, useRef } from 'react'
import exportAuthService from '../../../../../services/auth.service'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import exportApiFetchs from '../../../../../Api/API'
import { API_URL } from '../../../../../enviroment'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { withStyles } from '@material-ui/styles'

interface EditArticleProps {
    article: any;
}

export const EditArticle: React.FC<EditArticleProps> = ({ article }) => {

    const history = useHistory()
    const formikRef = useRef(article)
    const { slug } = useParams<{ slug?: string }>()

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

    const user = exportAuthService.getCurrentUser()

    const onSubmit = (data: any) => {
        const addNewTags = (newTags: string) => {
            const newTagsArr = newTags.split(',')
            newTagsArr.map((tag: any) => 
                exportAuthService.createTag(tag)
            )
        }
        addNewTags(data.newTags)
        const tagList = data.tagList
        data.newTags.length > 0 && tagList.push(data.newTags)
        exportAuthService
            .editArticle(
                slug,
                data.title,
                data.description,
                data.body,
                tagList
            )
            .then((response) => {
                toast.success('Article updated successfully')
                setTimeout(() => history.push('/articles/'+slug), 1000)
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

    useEffect(() => {
        if(formikRef.current)
        {
            formikRef.current.setFieldValue("title", article.title)
            formikRef.current.setFieldValue("description", article.description)
            formikRef.current.setFieldValue("body", article.body)
            formikRef.current.setFieldValue("tagList", article.tagList)
        }
    })

        return (
            <div className="pt-20">
            <h1 className="text-2xl text-black">Update Article</h1>
            <p className="text-black-light">Fill all the required(*) fields!</p>
            {article ? (
            <Formik
                initialValues={{
                    title: article.title,
                    description: article.description,
                    body: article.body,
                    toggle: false,
                    tagList: article.tagList,
                    newTags: '',
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                innerRef={formikRef}
            >
                { props => (
                    <Form>
                        {() => {
                            props.setFieldValue("title", article.title)
                            props.setFieldValue("description", article.description)
                            props.setFieldValue("body", article.body)
                            props.setFieldValue("tagList", article.tagList)
                        }}
                        <div className="grid grid-rows-5 grid-flow-col gap-4 auto-rows-max pt-10 px-40">
                            <div className="form-group">
                                <label className="inputLabel">Title*</label>
                                <Field name="title" />
                                {props.errors.title && props.touched.title ? (
                                    <div className="invalid-feedback">
                                        {props.errors.title}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label className="inputLabel">
                                    Description*
                                </label>
                                <Field name="description" />
                                {props.errors.description && props.touched.description ? (
                                    <div className="invalid-feedback">
                                        {props.errors.description}
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
                                        <div>Loading...</div>
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
                                {props.errors.body && props.touched.body ? (
                                    <div className="invalid-feedback">
                                        {props.errors.body}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-10">
                            <button
                                type="submit"
                                className="border-2 border-red rounded-md px-6 py-2 w-auto text-red font-bold hover:bg-red hover:text-white"
                            >
                                Update Article
                            </button>
                            <Link to={'/articles/'+slug}>
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