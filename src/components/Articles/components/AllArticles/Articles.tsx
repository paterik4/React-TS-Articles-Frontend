import { makeStyles } from '@material-ui/core';
import React from 'react'
import exportApiFetchs from '../../../../Api/API';
import { API_URL } from '../../../../enviroment';
import { AllArticles } from './components/AllArticles';
import { ArticlesBySlug } from './components/ArticlesBySlug';

const useStyles = makeStyles((theme: any) => ({
    articlesContainer:  {
        padding: '0vh 0vw'
    }
}))

interface ArticlesProps {

}

export const Articles: React.FC<ArticlesProps> = ({}) => {

    const classes = useStyles()

    const {
        data: articles,
        error,
        isPending
    } = exportApiFetchs.FetchData(API_URL + 'articles')

    const selectedTag = localStorage.getItem('tagName')!

    /* console.log(articles) */

        return (
        <div className={classes.articlesContainer}>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {articles.length > 0 ? <AllArticles selectedTag={selectedTag} articles={articles} /> : 
            <p className="text-xl text-left">There are no articles found. Create one to make it visible here.</p>}
        </div>);
}