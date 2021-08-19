import {
    Divider,
    IconButton,
    InputBase,
    makeStyles,
    Paper
} from '@material-ui/core'
import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import exportApiFetchs from '../../../../Api/API'

const useStyles = makeStyles((theme: any) => ({
    root: {
        padding: '0.5vh 0.25vw',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
        color: '#b42318'
    },
    divider: {
        height: 28,
        margin: 4
    }
}))

interface SearchBarProps {
    handleChange: (event: any) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({handleChange}) => {
    const classes = useStyles()

    
    const onLoad = () => {
        const searchBar = document.getElementById('searchInput')!
        const searchText = exportApiFetchs.getSearchedText()
    }

    return (
        <Paper component="form" className={classes.root}>
            {onLoad()}
            <InputBase
                id="searchInput"
                className={classes.input}
                placeholder="Search for articles"
                inputProps={{ 'aria-label': 'Search for articles' }}
                onChange={handleChange}
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton
                className={classes.iconButton}
                aria-label="directions"
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}
