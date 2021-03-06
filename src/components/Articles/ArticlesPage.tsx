import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import exportApiFetchs from '../../Api/API';
import { API_URL } from '../../enviroment';
import { Articles } from './components/AllArticles/Articles';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Tags } from './components/Tags/Tags';

const useStyles = makeStyles((theme: any) => ({
    ArticlesPageContainer: {
        margin: '4vh 8vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left'
    }
}))

interface ArticlesPageProps {

}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({}) => {

    const classes = useStyles()

    const {
        data: articles,
        error,
        isPending
    } = exportApiFetchs.FetchData(API_URL + 'articles')

    /* console.log(articles) */

    const handleChange = (event: any) => {
        /* console.log(event.target.value) */
        event.target.value? 
            (localStorage.setItem('searchText', event.target.value)):
            (localStorage.removeItem('searchText'))
    }

        return (
            <div className={classes.ArticlesPageContainer}>
            <div className="flex flex-row justify-between pr-40 items-center">
                <h1 className="text-left font-poppins text-4xl">Articles</h1>
                <Link to="/createArticle">
                    <div className="text-red border border-red rounded-lg p-2 w-auto align-middle hover:bg-red hover:text-white"> Add new article</div>
                </Link>
            </div>
            <p className="text-left font-poppins text-black-light text-md py-2">You can search articles by title, by slug and with clicking one of the tags cards.</p>
            <SearchBar handleChange={handleChange} />
            <Tags />
            <Articles />
        </div>
        );
}