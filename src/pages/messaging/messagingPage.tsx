import React, {Fragment} from "react";
import Spinner from "../../components/spinner/spinner";
import ErrorPage from "../Error/Error";


interface MessagingPage {
    isLoading:boolean;
    errorMessage:Error
}




const MessagingPage: React.FC<MessagingPage> = ({isLoading, errorMessage}) => {
    if(errorMessage) {
        console.log(errorMessage.message)
    }
    return (
        <Fragment>
        {isLoading ? 
            <Spinner /> : 
            <ErrorPage message={errorMessage.message} />}
        </Fragment>

    )
}
export default MessagingPage