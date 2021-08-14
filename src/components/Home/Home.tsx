import { makeStyles } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles((theme: any) => ({
    pageSection: {
        padding: '4vh 0vw'
    }
}))

interface HomePageProps {

}

export const HomePage: React.FC<HomePageProps> = () => {

    const classes = useStyles();

        return (
            <div className={classes.pageSection}>
                <h1 className="text-5xl py-10">Welcome To SPA Articles App</h1>
                <p>To see the articles please <a className="text-red font-bold hover:text-red-light" href="/register">register</a> or 
                if you already have an account please <a className="text-red font-bold hover:text-red-light" href="/login">login</a>!</p>
            </div>
        );
}