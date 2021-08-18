import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
    Grid,
    makeStyles,
    Typography
} from '@material-ui/core'
import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useHistory, useParams } from 'react-router-dom'
import exportAuthService from '../../../services/auth.service'
import { toast } from 'react-toastify'

const useStyles = makeStyles((theme) => ({
    accordion: {
    },
    accordionSummary: {
    }
}))

interface AdminProps {
    users: any
    articles: any
}

export const Admin: React.FC<AdminProps> = ({ users, articles }) => {
    const classes = useStyles()
    const [expanded, setExpanded] = React.useState('')
    const history = useHistory()

    const currentUser = exportAuthService.getCurrentUser()

    const handleChange = (panel: any) => (event: any, isExpanded: any) => {
        setExpanded(isExpanded ? panel : false)
    }

    const deleteUser = (email: string, username: string) => {
        exportAuthService.deleteUser(email).then(response => {
            if(response.status === 200)
            {
                toast.success(username + "'s profile has been deleted")
            }
        }).catch(e=> {
            toast.success(e.message)
        })
    }

    const deleteArticle = (slug: any) => {
        exportAuthService.deleteArticle(slug).then(response => {
            if(response.status === 200)
            {
                toast.success("Article successfully deleted")
            }
        }).then(() => {
            setTimeout(() => window.location.reload(), 1000)
        }).catch(e => toast.error(e.message))
    }

    return (
        <div className="w-full">
            <Grid spacing={4} container>
                <Grid item sm={6}>
                    {users ? (
                        users.map((user: any) => (
                            <Accordion
                                expanded={expanded === user.id}
                                onChange={handleChange(user.id)}
                                key={user.id}
                                className={classes.accordion}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    className={classes.accordionSummary}
                                    aria-controls="panel1bh-content"
                                    id={user.id}
                                >
                                    <p className="">{user.username}</p>
                                </AccordionSummary>
                                <AccordionDetails>
                                <div className="flex flex-col justify-start text-left space-y-2">
                                        <p className="pb-1">{user.email}</p>
                                        <p className="pb-1">{user.bio? user.bio : "No bio given yet."}</p>
                                        {user.username !== currentUser.user.username ?
                                        <React.Fragment>
                                        <p className="h-px border border-gray-200 w-full"></p>
                                        <div className="flex space-x-8 pt-1">
                                                <button 
                                                className="text-red transform hover:scale-125"
                                                onClick={() => {deleteUser(user.email, user.username)}}
                                                >
                                                    Delete
                                                </button> 
                                        </div>
                                        </React.Fragment>
                                        : null}
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    ) : (
                        <p>Loading... </p>
                    )}
                </Grid>
                <Grid item sm={6}>
                    {articles ? (
                        articles.map((article: any) => (
                            <Accordion
                                expanded={expanded === article.id}
                                onChange={handleChange(article.id)}
                                key={article.id}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id={article.id}
                                >
                                    <p className="">{article.title}</p>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="flex flex-col justify-start text-left">
                                        <p className="pb-1">{article.description}</p>
                                        <p className="h-px border border-red w-full"></p>
                                        <p className="py-5">{article.body}</p>
                                        <p className="pb-5">{article.author.username}</p>
                                        <p className="h-px border border-gray-200 w-full"></p>
                                        <div className="flex space-x-8 pt-1">
                                            <button 
                                            className="text-blue-600 transform hover:scale-125"
                                            onClick={() => history.push("/articles/"+article.slug+"/editArticle")}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                            className="text-red transform hover:scale-125"
                                            onClick={() => {deleteArticle(article.slug)}}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    ) : (
                        <p>Loading... </p>
                    )}
                </Grid>
            </Grid>
        </div>
    )
}
