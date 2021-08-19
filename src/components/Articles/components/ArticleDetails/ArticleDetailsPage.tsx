import React from 'react'
import { useParams } from 'react-router-dom';
import exportApiFetchs from '../../../../Api/API';
import { API_URL } from '../../../../enviroment';
import exportAuthService from '../../../../services/auth.service';
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
        /* console.log(article) */

        const user = exportAuthService.getCurrentUser()

        return (
        <div>
                {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>}
                {user ? <ArticleDetails article={article} /> : <p className="text-3xl py-10">Authorized access only!</p>}
        </div>
        );
}