import { makeStyles } from '@material-ui/core';
import React from 'react'
import exportAuthService from '../../services/auth.service';

const useStyles = makeStyles((theme: any) => ({
    pageSection: {
        padding: '4vh 0vw'
    }
}))

interface HomePageProps {

}

export const HomePage: React.FC<HomePageProps> = () => {

    const currentUser = exportAuthService.getCurrentUser()

    const classes = useStyles();

        return (
            <div className={classes.pageSection}>
            { currentUser ? ( <div>
                    <h1 className="text-5xl py-10">Welcome To SPA Articles App</h1>
                    <p>You are logged in as {currentUser.user.username}.</p>
                </div> )
                :
                ( <div>
                <h1 className="text-5xl py-10">Welcome To SPA Articles App</h1>
                <p>To see the articles please <a className="text-red font-bold hover:text-red-light" href="/register">register</a> or 
                if you already have an account please <a className="text-red font-bold hover:text-red-light" href="/login">login</a>!</p>
                </div> )
            }
            </div>
        );
}