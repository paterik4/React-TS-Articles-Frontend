import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
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
    searchText: string
}

export const Articles: React.FC<ArticlesProps> = (searchText) => {

    const classes = useStyles()

    const {
        data: articles,
        error,
        isPending
    } = exportApiFetchs.FetchData(API_URL + 'articles')

    /* console.log(articles) */

    const {
        data2: articlesBySlug,
        error2,
        isPending2
    } = exportApiFetchs.FetchArticlesBySlugData(API_URL + 'articles/' + searchText)

    const selectedTag = localStorage.getItem('tagName')!

    /* console.log(articles) */

        return (
        <div className={classes.articlesContainer}>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {articles && searchText? <AllArticles selectedTag={selectedTag} articles={articles} /> : <ArticlesBySlug articles={articlesBySlug} />}
        </div>);
}