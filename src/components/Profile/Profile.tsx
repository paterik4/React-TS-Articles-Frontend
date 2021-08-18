import { makeStyles } from '@material-ui/core'
import React from 'react'
import { useParams } from 'react-router-dom'
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

    const {
        data2: users,
        isPending2,
        error2
    } = exportApiFetchs.FetchUsers(API_URL+"users")

        return (
        <div className={classes.profileContainer}>
            <ProfileCard users={users} />
        </div>
        );
}