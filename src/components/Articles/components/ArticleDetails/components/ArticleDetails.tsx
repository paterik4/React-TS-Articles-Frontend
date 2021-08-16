import React from 'react'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'
import exportAuthService from '../../../../../services/auth.service'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

interface ArticleDetailsProps {
    article: any
}

export const ArticleDetails: React.FC<ArticleDetailsProps> = ({ article }) => {
    const articleAuthor = localStorage.getItem('articleAuthor')

    const { slug } = useParams<{ slug?: string }>()

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

    return (
        <div className="py-10 px-40 max-w-screen-2xl">
            {article ? (
                <div className="flex flex-col text-left">
                    <p className="text-4xl pb-10">Article Details</p>
                    <div className="flex items-center justify-between align-middle">
                        <p className="text-3xl">{article.title}</p>
                        <div className="flex items-center justify-end">
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
                                <StarBorderIcon fontSize="medium" className="" />
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
                                <p className="mx-2 py-1 px-4 w-auto align-middle text-center text-red border border-red rounded-full">
                                    {element}
                                </p>
                            ))}
                    </div>
                    <div className="pt-10 text-sm text-black-light">
                        <p>Author: {articleAuthor}</p>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}
