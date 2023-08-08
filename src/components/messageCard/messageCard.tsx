import React, { Fragment } from "react";
import "./messageCard.scss";
import classnames from 'classnames';
import Popup from "../popup/popup-component";



interface MessageCardProps {
    message:string;
    classIsOpen:string;
    onClosePopup: ()=> void;
}


const MessageCard: React.FC<MessageCardProps> = ({classIsOpen,message, onClosePopup}) => {


const closePopupHandler = () => {
    onClosePopup();
}



return (
    <Fragment>
    <div className='message-card-container'>
      <Popup className={classnames("popup",{open:classIsOpen === 'open'})}> 
      <div className={classnames("messagecard",{open:classIsOpen === 'open'})}>
          <a href="#" className="messagecard__close" onClick={closePopupHandler}>
            &times;
          </a>
        <h2 className="teamcard__heading">
          <span className="teamcard__heading--main">{message}</span>
        </h2>
      </div>
    </Popup> 
    </div>
    </Fragment>
 )

}

export default MessageCard