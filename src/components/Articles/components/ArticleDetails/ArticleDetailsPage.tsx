import React from 'react'
import { useParams } from 'react-router-dom';
import exportApiFetchs from '../../../../Api/API';
import { API_URL } from '../../../../enviroment';
import { ArticleDetails } from './components/ArticleDetails';

interface ArticleDetailsPageProps {

}

export const ArticleDetailsPage: React.FC<ArticleDetailsPageProps> = ({}) => {

        const { slug } = useParams<{slug?: string}>()

        const {
                data: article,
                error,
                isPending
        } = exportApiFetchs.FetchArticleData(API_URL + 'articles/' + slug )

        /* console.log(slug) */
        console.log(article)

        return (
        <div>
                <ArticleDetails article={article} />
        </div>
        );
}