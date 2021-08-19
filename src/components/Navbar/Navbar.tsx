import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import exportAuthService from '../../services/auth.service'
import { adminUsers } from '../../enviroment'

const useStyles = makeStyles((theme?: any) => ({
    navbar: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        verticalAlign: 'middle',
        margin: '4vh 8vw',
        fontFamily: 'Poppins' || 'Helvetica Neue',
        color: '#363537',
        lineHeight: '6vh'
    },
    BrandText: {
        margin: '0vh 0vw',
        fontSize: '2.5em',
        color: '#b42318',
        textDecoration: 'none',
        fontWeight: 600
    },
    links: {
        display: 'inline-block',
        verticalAlign: 'middle',
        margin: '0 auto',
        textAlign: 'center',
        '& a': {
            margin: '1vh 0vw',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '2rem',
            padding: '0.5vh 0vw',
            color: '#363537',
            verticalAlign: 'middle',
            '&:hover, &:focus, &:active':{
                color: '#b42318'
            }
        }
    },
    Links: {
        margin: '0vh 0vw 0vh 0vw',
        width: '20vw',
        '& a': {
            margin: '1vh 0.5vw',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            color: '#363537',
            '&:hover, &:focus, &:active': {
                color: '#b42318'
            }
        }
    },
    borderUnderline: {
        width: '100vw',
        height: '0.1vh',
        background: '#B42318',
        margin: '0 auto',
        borderColor: '#B42318',
        boxShadow: '0px 6px 10px 0.2px #b42318'
    }
}))

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
    const classes = useStyles()
    const history = useHistory();

    const currentUser = exportAuthService.getCurrentUser()

    const logOut = () => {
        exportAuthService.logout();
        history.push('/login')
        window.location.reload(false);
    }

    return (
        <>
            <nav className={classes.navbar}>
                <h1 className={classes.BrandText}>
                    <Link to="/">PWD Articles</Link>
                </h1>
                <div className={classes.Links}>
                    {currentUser ? (
                        <div>
                            {adminUsers.includes(currentUser.user.username) &&
                                <Link to="/admin">Admin Page</Link>
                            } 
                            <Link to="/articles">Articles</Link>
                            <Link to={"/profile/"+currentUser.user.username}>{'Profile'}</Link>
                            <Link to="/login" onClick={logOut}>
                                Log out
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>
                    )}
                </div>
            </nav>
            <div className={classes.borderUnderline}></div>
        </>
    )
}
