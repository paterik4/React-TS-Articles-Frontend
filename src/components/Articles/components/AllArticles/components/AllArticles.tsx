import {
    Card,
    CardActionArea,
    CardContent,
    Grid,
    makeStyles,
    Typography
} from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme: any) => ({
    GridItem: {
        margin: '0vh 0vw 0vh 0vw',
        padding: '0vh 2vw 4vh 0vw'
    },
    Link: {
        textDecoration: 'none',
        fontFamily: 'Poppins'
    },
    card: {
        width: '10vw',
        maxWidth: '20vw',
        borderRadius: '10px',
        textDecoration: 'none'
    },
    Title: {
        fontWeight: 500
    },
    Author: {
        fontSize: '0.85rem'
    }
}))

interface AllArticlesProps {
    articles: string[]
    selectedTag: string
}

export const AllArticles: React.FC<AllArticlesProps> = ({
    articles,
    selectedTag,
}) => {
    const classes = useStyles()

    const currentUser = JSON.parse(localStorage.getItem('user')!)


    return currentUser ? (
        <div className="page-section">
            <div>
                <Grid className="" container>
                    {articles ? (
                        articles.map((article: any) =>
                            article.tagList.includes(selectedTag) && (
                                <Grid
                                    className={classes.GridItem}
                                    item
                                    key={article.id}
                                >
                                    <Link
                                        className={classes.Link}
                                        to={`/articles/${article.slug}`}
                                        onClick={() =>
                                            localStorage.setItem(
                                                'articleAuthor',
                                                article.author.username
                                            )
                                        }
                                    >
                                        <Card
                                            elevation={5}
                                            className={classes.card}
                                            onClick={() =>
                                                console.log(article.slug)
                                            }
                                        >
                                            <CardActionArea>
                                                <CardContent>
                                                    <Typography
                                                        className={
                                                            classes.Title
                                                        }
                                                        variant="h5"
                                                        component="h2"
                                                    >
                                                        {article.title}
                                                    </Typography>
                                                    <Typography
                                                        gutterBottom
                                                        variant="h6"
                                                        color="textSecondary"
                                                        component="p"
                                                    >
                                                        {article.description}
                                                    </Typography>
                                                    <Typography
                                                        className={
                                                            classes.Author
                                                        }
                                                        variant="caption"
                                                        color="textSecondary"
                                                        component="p"
                                                    >
                                                        {article.author
                                                            ? article.author.username
                                                            : 'No author exists'}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Link>
                                </Grid>
                            )
                        )
                    ) : (
                        <div className="page-section">
                            <h1 className="animation-pulse">Loading...</h1>
                        </div>
                    )}
                </Grid>
            </div>
        </div>
    ) : (
        <div className="page-section">
            <h1>Only for authorized users</h1>
        </div>
    )
}
