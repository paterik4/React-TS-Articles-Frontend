import React from 'react'
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import exportAuthService from '../../services/auth.service';
import { Login } from './Components/Login';

interface LoginPageProps {

}

export const LoginPage: React.FC<LoginPageProps> = ({}) => {

    const history = useHistory();

    const submitFN = (data: any) => {
        exportAuthService
        .login(data.email, data.password)
        .then((response) => {
            history.push('/articles')
            toast.success('Login successful')
            setTimeout(() => window.location.reload(false), 500)
        })
        .catch((err) => {
            toast.error('Something went wrong')
        })
    }
        return (
            <div>
                <Login submitFN={submitFN} />
            </div>
        );
}