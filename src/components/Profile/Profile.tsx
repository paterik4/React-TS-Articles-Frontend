import { makeStyles } from '@material-ui/core'
import React from 'react'
import exportApiFetchs from '../../Api/API'
import { API_URL } from '../../enviroment'
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

    const {
        data2: users,
        isPending2,
        error2
    } = exportApiFetchs.FetchUsers(API_URL+"users")

        return (
        <div className={classes.profileContainer}>
            {error2 && <div>{error2}</div>}
            {isPending2 && <div>Loading...</div>}
            {users? <ProfileCard users={users} /> : <p className="text-2xl">This user is not exists or something went wrong.</p>}
        </div>
        );
}