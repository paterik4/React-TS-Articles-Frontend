import { makeStyles } from '@material-ui/core'
import React from 'react'
import exportApiFetchs from '../../Api/API'
import { API_URL } from '../../enviroment'
import exportAuthService from '../../services/auth.service'
import { ProfileCard } from './components/ProfileCard'

const useStyles = makeStyles((theme: any) => ({
    profileContainer:  {
        padding: '0vh 8vw',
        textAlign: 'center',
        justifyContent: 'center'
    }
}))

interface ProfileProps {

}

export const Profile: React.FC<ProfileProps> = ({}) => {

    const classes = useStyles()
    const currentUser = exportAuthService.getCurrentUser()

        return (
        <div className={classes.profileContainer}>
            <ProfileCard user={currentUser.user}/>
        </div>
        );
}