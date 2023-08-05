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
            <h1>Unable to get data</h1>
            {/* <button onClick={handleErrorReturn}>Return to HomePage</button> */}
        </div>


    )
}

export default ErrorPage;