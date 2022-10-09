import React from "react";
import "./popup-component.scss";
import classnames from "classnames";

const Popup = (props) => {
    const {className} = props;
    return (
        <div className ={classnames('popup',{[className]: className})} >
            {props.children}
        </div>
    )
}
export default Popup;