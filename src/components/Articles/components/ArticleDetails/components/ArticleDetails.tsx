import React from 'react'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'
import exportAuthService from '../../../../../services/auth.service'
import {Link, useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

interface ArticleDetailsProps {
    article: any
}

export const ArticleDetails: React.FC<ArticleDetailsProps> = ({ article }) => {
    const articleAuthor = localStorage.getItem('articleAuthor')

    const { slug } = useParams<{ slug?: string }>()

    const comments = article.comments!

    console.log(comments)

    const history = useHistory()

    const favoriteArticle = () => {
        exportAuthService
            .favoriteArticle(slug)
            .then((response) => {
                if (response.status === 201) {
                    window.location.reload()
                }
            })
            .then(() => toast.success('Article successfully favorited'))
            .catch((e) => toast.error(e.message))
    }

    const unFavoriteArticle = () => {
        exportAuthService
            .unFavoriteArticle(slug)
            .then(() => window.location.reload())
            .then(() => toast.success('Article successfully Unfavorited'))
            .catch((e) => toast.error(e.message))
    }

    const handleSubmit = (data: any) => {
        exportAuthService
            .createComment(slug, data.comment)
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
            console.log(slug + "  ----------  " + data.comment)
    }

    const validationSchema = Yup.object().shape({
        comment: Yup.string()
            .required('Comment is required')
            .min(10, 'Comment must be at least 10 characters')
            .max(200, 'Comment must not exceed 200 characters')
    })

    return (
        <div className="py-10 px-40 max-w-screen-2xl">
            {article ? (
                <div className="flex flex-col text-left">
                    <p className="text-4xl pb-10">Article Details</p>
                    <div className="flex items-center justify-between align-middle">
                        <p className="text-3xl">{article.title}</p>
                        <div className="flex items-center justify-end">
                            <Link to="/editArticle">
                            <p className="cursor-pointer px-2 mx-8 rounded-lg border border-red text-red hover:text-white hover:bg-red"
                            >Edit article</p>
                            </Link>
                            <p className="text-right">
                                {article.favoriteCount} users favorited
                            </p>
                            <p
                                onClick={favoriteArticle}
                                className="rounded-md p-1 pr-2 text-orange text-sm flex items-center align-middle cursor-pointer hover:bg-gray-200"
                            >
                                <StarIcon fontSize="medium" className="" />
                                Favorite
                            </p>
                            <p
                                onClick={unFavoriteArticle}
                                className="rounded-md p-1 pr-2 text-black text-sm flex items-center align-middle cursor-pointer hover:bg-gray-200"
                            >
                                <StarBorderIcon
                                    fontSize="medium"
                                    className=""
                                />
                                Unfavorite
                            </p>
                        </div>
                    </div>
                    <p className="text-2xl pt-10 pb-2">{article.description}</p>
                    <div className="h-px border border-red w-full"></div>
                    <p className="text-lg py-10">{article.body}</p>
                    <div className="flex pt-10 align-middle">
                        <p className="pr-2 py-1">Tags:</p>
                        {article.tagList &&
                            article.tagList.map((element: any) => (
                                <p
                                    key={element}
                                    className="mx-2 py-1 px-4 w-auto align-middle text-center text-red border border-red rounded-full"
                                >
                                    {element}
                                </p>
                            ))}
                    </div>
                    <div className="pt-10 pb-2 text-sm text-black-light">
                        <p>Author: {articleAuthor}</p>
                    </div>
                    <div className="h-px border border-black-light w-full"></div>
                    <div className="pt-5 space-y-4 w-full">
                        <Formik
                            onSubmit={handleSubmit}
                            initialValues={{
                                comment: ''
                            }}
                            validationSchema={validationSchema}
                            className="flex"
                        >
                            {({ errors, touched }) => (
                                <Form className="w-full">
                                    <Field
                                        className="mr-4"
                                        name="comment"
                                        placeholder="Write comment"
                                    />
                                    <button
                                        className="border border-red text-red py-1 px-2 rounded-lg hover:text-white hover:bg-red"
                                        type="submit"
                                    >
                                        Comment
                                    </button>
                                    {errors.comment ? (
                                        <div className="invalid-feedback">
                                            {errors.comment}
                                        </div>
                                    ) : null}
                                </Form>
                            )}
                        </Formik>
                        <p>Comments ({comments ? comments.length : 0})</p>
                        <div>
                            {comments ? (
                                comments.map((comment: any) => (
                                    <div>{comment.body}</div>
                                ))
                            ) : (
                                <p>There are no comments for this article</p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}
