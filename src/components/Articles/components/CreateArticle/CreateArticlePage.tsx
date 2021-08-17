import { makeStyles } from '@material-ui/core';
import React from 'react'
import { Link } from 'react-router-dom';
import { CreateArticle } from './Components/CreateArticle';

const useStyles = makeStyles((theme: any) => ({
    CreateArticleContainer: {
        padding: '0vh 0vw',
    }
}))

interface CreateArticlePageProps {

}

export const CreateArticlePage: React.FC<CreateArticlePageProps> = ({}) => {

    const classes = useStyles()
        return (
        <div className={classes.CreateArticleContainer}>
            <CreateArticle />
        </div>
        );
}