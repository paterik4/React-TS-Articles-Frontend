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
                {error2 && <div>{error2}</div>}
                {isPending2 && <div>Loading...</div>}
                {users ? <EditProfile users={users} /> : <p className="text-2xl">User not found or something went wrong.</p>}
            </div>
    );
}