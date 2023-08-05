import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./ErrorPage.scss"

interface ErrorPageProps  {
    message:string;
}




const ErrorPage: React.FC<ErrorPageProps> = ({message}) => {

    const navigate = useNavigate()

    const handleErrorReturn = () => {
        navigate('/')
    }


    return (
        <div className='error-page'>
            <h1>{message}</h1>
        </div>


    )
}

export default ErrorPage;