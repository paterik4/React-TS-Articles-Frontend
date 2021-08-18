import React from 'react'
import exportApiFetchs from '../../../../Api/API';
import { API_URL } from '../../../../enviroment';
import { EditProfile } from './components/EditProfile';

interface EditProfilePageProps {

}

export const EditProfilePage: React.FC<EditProfilePageProps> = ({}) => {
    
    const {
        data2: users,
        isPending2,
        error2
    } = exportApiFetchs.FetchUsers(API_URL+"users")
    
    return (
            <div>
                <EditProfile users={users} />
            </div>
    );
}