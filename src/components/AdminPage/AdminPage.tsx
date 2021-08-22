import React from 'react'
import exportApiFetchs from '../../Api/API';
import { adminUsers, API_URL } from '../../enviroment';
import exportAuthService from '../../services/auth.service';
import { Admin } from './components/Admin';

interface AdminPageProps {

}

export const AdminPage: React.FC<AdminPageProps> = ({}) => {

    const {
        data: articles,
        isPending,
        error
    } = exportApiFetchs.FetchData(API_URL+"articles")

    const {
        data2: users,
        isPending2,
        error2
    } = exportApiFetchs.FetchUsers(API_URL+"users")

    /* console.log(articles) */
    /* console.log(users) */

    const user = exportAuthService.getCurrentUser()

        return (
            <div className="flex align-middle px-40">
                {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>}
                {error2 && <div>{error2}</div>}
                {isPending2 && <div>Loading...</div>}
                { articles ? (
                user && adminUsers.includes(user.user.username) ? (
                <div className="flex flex-col w-full align-middle">
                    <p className="text-3xl pt-10 text-center">AdminPage</p>
                    <p className="text-md pt-1 pb-10">You can edit or delete profiles and articles since you are an admin user</p>
                    <Admin users={users} articles={articles} />
                </div>
                ) : (<p className="text-3xl">Authorized access only</p>)
                ):(
                    <p className="text-3xl">There are no articles found or something went wrong.</p>
                )}
            </div>
        );
}