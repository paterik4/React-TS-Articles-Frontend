import { makeStyles } from '@material-ui/core';
import React from 'react'
import exportApiFetchs from '../../../../Api/API';
import { API_URL } from '../../../../enviroment';
import { TagCards } from './components/TagCards';

const useStyles = makeStyles((theme: any) => ({
    tagsContainer:  {
        padding: '4vh 0vw'
    }
}))

interface TagsProps {

}

export const Tags: React.FC<TagsProps> = () => {

    const classes = useStyles()

    const {
        data2: tags,
        error2,
        isPending2
    } = exportApiFetchs.FetchTagsData(API_URL + 'tags')

    /* console.log(tags) */
        return (
        <div className={classes.tagsContainer}>
            {error2 && <div>{error2}</div>}
            {isPending2 && <div>Loading...</div>}
            {tags && <TagCards tags={tags}/>}
        </div>);
}