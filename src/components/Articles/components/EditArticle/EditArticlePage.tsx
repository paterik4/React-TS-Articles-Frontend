import React from 'react'
import { useParams } from 'react-router-dom';
import exportApiFetchs from '../../../../Api/API';
import { API_URL } from '../../../../enviroment';
import exportAuthService from '../../../../services/auth.service';
import { EditArticle } from './Components/EditArticle';

interface EditArticlePageProps {
}

export const EditArticlePage: React.FC<EditArticlePageProps> = ({}) => {
        
    const { slug } = useParams<{slug?: string}>()

    const {
            data: article,
            error,
            isPending
    } = exportApiFetchs.FetchArticleData(API_URL + 'articles/' + slug )

    const user = exportAuthService.getCurrentUser()
    
    return (
        <div>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {user ? <EditArticle article={article} /> : <p className="text-3xl py-10">Authorized access only!</p>}
        </div>
    );
}