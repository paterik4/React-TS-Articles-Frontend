import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import RouterLink from '../Router/Link'
import Grid from '@material-ui/core/Grid'
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '85vh',
        background: 'url(/404Page.svg) center center',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    paper: {
        minWidth: '15vw',
        maxWidth: '30vw',
        padding: theme.spacing(8),
        textAlign: 'center',
        margin: '0 auto',
        color: theme.palette.text.primary,
        boxShadow: '0px 0px 12px #ccc',
        borderRadius: '15px'
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        textAlign: 'center',
        alignItems: 'center',
        margin: '0 auto',
        paddingLeft: '20vw'
    },
    title: {
        marginBottom: theme.spacing(2)
    }
}))

interface NoMatchProps {

}

export const NoMatch: React.FC<NoMatchProps> = () => {
    const classes = useStyles()
    let location = useLocation()

    return (
        <div className={classes.root}>
            <Grid container className={classes.container}>
                <Grid item>
                    <Paper className={classes.paper} elevation={10}>
                        <Typography
                            className={classes.title}
                            align="center"
                            variant="h2"
                        >
                            404
                        </Typography>
                        <Typography paragraph align="center">
                            {'Nothing Found.'}
                        </Typography>
                        <Typography paragraph align="center">
                            No match for <code>{location.pathname}</code>
                        </Typography>
                        <Typography align="center">
                            <Link component={RouterLink} to="/">
                                {'Go back to the HomePage'}
                            </Link>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default NoMatch
