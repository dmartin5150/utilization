import React, {Fragment} from "react";
import Spinner from "../../components/spinner/spinner";
import ErrorPage from "../Error/Error";


interface MessagingPage {
    isLoading:boolean;
    errorMessage:string
}




const MessagingPage: React.FC<MessagingPage> = ({isLoading, errorMessage}) => {
    if(errorMessage) {
        console.log(errorMessage)
    }
    return (
        <Fragment>
        {isLoading ? 
            <Spinner /> : 
            <ErrorPage message={errorMessage} />}
        </Fragment>

    )
}
export default MessagingPage