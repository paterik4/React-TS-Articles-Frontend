import { Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

const useStyles = makeStyles((theme: any) => ({
    tagsContainer: {
        padding: '0vh 0vw',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column'
    },
    paper: {
        fontFamily: 'Poppins',
        display: 'flex',
        textDecoration: 'none',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2vh 0vw',
        textAlign: 'center',
        width: '5vw',
        maxWidth: '10vw',
        margin: '0 auto',
        color: theme.palette.text.primary,
        borderRadius: '15px',
        height: '4vh',
        '&:hover': {
            color: '#b42318',
            boxShadow: '0px 0px 12px #b42318'
        },
        '&:focus': {
            color: '#b42318',
            boxShadow: '0px 0px 12px #b42318'
        },
        '&:active': {
            color: '#b42318',
            boxShadow: '0px 0px 12px #b42318'
        }
    },
    paperActive: {
        fontFamily: 'Poppins',
        display: 'flex',
        textDecoration: 'none',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2vh 0vw',
        textAlign: 'center',
        width: '5vw',
        maxWidth: '10vw',
        margin: '0 auto',
        color: '#b42318',
        borderRadius: '15px',
        boxShadow: '0px 0px 12px #b42318',
        height: '4vh',
        '&:hover': {
            color: '#b42318',
            boxShadow: '0px 0px 12px #b42318'
        },
        '&:focus': {
            color: '#b42318',
            boxShadow: '0px 0px 12px #b42318'
        },
        '&:active': {
            color: '#b42318',
            boxShadow: '0px 0px 12px #b42318'
        }
    },
    container: {
        maxWidth: '60vw',
        display: 'flex',
        flexDirection: 'row',
        padding: '0',
        textAlign: 'left'
    },
    title: {
        fontSize: '1.1rem',
        fontFamily: 'Poppins'
    },
    tagsA: {
        textDecoration: 'none'
    }
}))

interface TagCardsProps {
    tags: string[]
}

export const TagCards: React.FC<TagCardsProps> = ({ tags }) => {
    const classes = useStyles()

    const [active, setActive] = useState(0)
    const [artTag, setArtTag] = useState('All')

    useEffect(() => {
        try {
            const json = localStorage.getItem('tagIndex')
            const index = JSON.parse(json!)

            if (index) setActive(index)

            const json2 = localStorage.getItem('tagName')

            if (json2) setArtTag(json2)
        } catch (err) {
            console.log(err)
        }
    }, [])

    const handleChange = (newValue: any, newIndex: any) => {
        /* console.log(newValue, newIndex) */
        setActive(newIndex)
        localStorage.setItem('tagIndex', newIndex)
        localStorage.setItem('tagName', newValue)
        window.location.reload()
    }

    return (
        <div className={classes.tagsContainer}>
            <Grid container className={classes.container}>
                {tags ? (
                    tags.map((item: any, i: number) => (
                        <Grid key={item.id} className="pr-4 pb-4" item>
                            <p
                                onClick={() => handleChange(item.tag, i)}
                                className="cursor-pointer"
                            >
                                <Paper
                                    className={
                                        i === active
                                            ? classes.paperActive
                                            : classes.paper
                                    }
                                    elevation={10}
                                >
                                    <Typography
                                        className={classes.title}
                                        align="center"
                                        variant="h3"
                                    >
                                        {item.tag}
                                    </Typography>
                                </Paper>
                            </p>
                        </Grid>
                    ))
                ) : (
                    <div>Loading...</div>
                )}
            </Grid>
        </div>
    )
}
