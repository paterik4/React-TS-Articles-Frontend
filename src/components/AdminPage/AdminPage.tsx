import { Grid, Typography } from '@material-ui/core';
import React from 'react'
import { adminUsers } from '../../enviroment';
import exportAuthService from '../../services/auth.service';

interface AdminPageProps {

}

export const AdminPage: React.FC<AdminPageProps> = ({}) => {

    const user = exportAuthService.getCurrentUser()

        return (
            <div className="py-10 flex align-middle justify-center">
                {user && adminUsers.includes(user.user.username) ? (
                <div>
                    <p className="text-3xl">AdminPage</p>
                    <Grid container>
                        <Grid item sm={6}></Grid>
                        <Grid item sm={6}></Grid>
                    </Grid>
                </div>
                ) : (<p className="text-3xl">Authorized access only</p>)}
                
            </div>
        );
}